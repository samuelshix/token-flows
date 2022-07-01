import requests
API_TOKEN = 'V9MH4DCQ3BSHNAAQ6PDW5KNTGSXVIVZUQ3'
TX = '0xabba82a41c866f181eba449fb47247077b1ff0bc9f47215944264dd02688aa09'
ADDRESS = '0xDc1487E092CaBA080C6BADafAa75a58Ce7a2EC34' 
import datetime as dt 
from datetime import datetime
import json
today = dt.datetime.now()
d = dt.timedelta(days = 7)
last_week = int((today - d).timestamp())

API_TOKEN = 'V9MH4DCQ3BSHNAAQ6PDW5KNTGSXVIVZUQ3'
INFURA_TOKEN = '1baacf3e1ab9473ebecc4de3f91a93bb'
TX = '0xabba82a41c866f181eba449fb47247077b1ff0bc9f47215944264dd02688aa09'
ADDRESS = '0xDc1487E092CaBA080C6BADafAa75a58Ce7a2EC34' 
balance_url = f"https://mainnet.infura.io/v3/{INFURA_TOKEN}"

def balanceByAddress(address,block):
    payload = json.dumps({
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [address,hex(int(block))],
    "id": 1
    })
    response = requests.request("POST", balance_url, data=payload)
    hex_value = json.loads(response.text)['result']
    return int(hex_value,16)/1e18

def confirmContractName(address):
    url = f"https://api.etherscan.io/api?module=contract&action=getsourcecode&address={address}&apikey={API_TOKEN}"
    data = requests.get(url).json()
    return data['result'][0]['ContractName']

def findFirstChildren(address,limit):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey={API_TOKEN}"
    data = requests.get(url).json()
    data['result'] = list(filter(lambda e: int(e['value'])>0 and e['from']==address, data['result']))
    x = []
    for i in data['result'][0:limit]:
        contract = confirmContractName(address)
        nextAddress = i['to']
        tmpProcessed = {
            'name': nextAddress[0:6],
            'attributes': {
            'value': f"{round(int(i['value']) / 1e18,4)} ETH",
            'timestamp': datetime.fromtimestamp(int(i['timeStamp'])).strftime('%Y-%m-%d %H:%M:%S'),
            'txHash': i['hash'],
            'destination': i['to'],
            'ContractName': contract,
            'fullname': nextAddress,
            # 'balance': balanceByAddress(address,i['blockNumber'])
            }
        }
        if not contract:
            x.append(tmpProcessed)
    return x

def apiFunction(address = ADDRESS, tx=TX, afterBlock=0,processed=None, depth=1):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock=99999999&page=1&offset=10000&sort=asc&apikey={API_TOKEN}"
    # print(depth,processed)
#     print(url)
    if depth > 3: return []
    data = requests.get(url).json()
    data['result'] = list(filter(lambda e: int(e['value'])>0, data['result']))
    if not processed:
        processed={
            'name': address[0:6],
            'attributes': {
                'fullname': address,
                # 'balance': balanceByAddress(address,data['result'][0]['blockNumber'])
            }
        }
        if not tx=='none':
            next =apiFunction(correct_element['to]'],None,correct_element['blockNumber'],1,1)
            correct_element.setdefault('children',[]).append(next)
        else:
            # processed['children'] = findFirstChildren(address, 10)
            # correct_elements = list(filter(lambda e: int(e['timeStamp'])>=last_week and e['from']==address, data['result']))[0:10]
            # print(correct_elements)
            for correct_element in findFirstChildren(address, 5):
                next = apiFunction(correct_element['attributes']['destination'],None,None,1,1)
                if next:
                    correct_element.setdefault('children',[]).append(next)
                    # if 'children' in correct_element.keys():
                    #     correct_element['children'].append(next)
                    # else:
                    #     correct_element['children'] = next
                    processed.setdefault('children',[]).append(correct_element)
                    # processed['children'].append(correct_element)
        # apiFunction(correct_element['to'],None,None,processed,depth)
#         processed['children'] = apiFunction(correct_element['to'],None,None,processed,depth)
        return processed
    else:
        depth+=1
        element1 = list(filter(lambda e: e['from']==address, data['result']))
        if not element1:
            return []
            # return {
            #     'name': address,
            #     # 'attributes': {'balance':balanceByAddress(address,afterBlock)}
            #     # 'children': []
            # }
        element = element1[0]
#         print(list(filter(lambda e: e['from']==address, data['result']))[0])
        nextAddress = element['to']
        contract = confirmContractName(address)
        tmpProcessed = {
            'name': nextAddress[0:6],
            'attributes': {
            'value': f"{round(int(element['value']) / 1e18,4)} ETH",
            'timestamp': datetime.fromtimestamp(int(element['timeStamp'])).strftime('%Y-%m-%d %H:%M:%S'),
            'txHash': element['hash'],
            'destination': nextAddress,
            'ContractName': contract,
            'fullname': address,
            # 'balance': balanceByAddress(address,element['blockNumber'])
            }
        }
        x=tmpProcessed
        for element in findFirstChildren(address, 2):
            next = apiFunction(element['attributes']['destination'],None,None, 1,depth)
            if not contract and next:
                element.setdefault('children',[]).append(next)
                tmpProcessed.setdefault('children',[]).append(element)
        return tmpProcessed

print(apiFunction('0x3F08f17973aB4124C73200135e2B675aB2D263D9'.lower(),'none'))