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

pos = {'x':0,'y':0}


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

def findFirstChildren(address,limit, afterBlock):
    processed = {'nodes':[],'edges':[]}
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock=99999999&page=1&offset=10000&sort=asc&apikey={API_TOKEN}"
    data = requests.get(url).json()
    data['result'] = list(filter(lambda e: int(e['value'])>0 and e['from']==address, data['result']))
    for i in data['result'][0:limit]:
        contract = confirmContractName(address)
        address = i['from']
        # if address in [i['id'] for i in processed['nodes']]:
        #     continue
        currentNode = {
            'id': address,
            'data': {
                'label': address[0:6],
                'value': f"{round(int(i['value']) / 1e18,4)} ETH",
                'timestamp': datetime.fromtimestamp(int(i['timeStamp'])).strftime('%Y-%m-%d %H:%M:%S'),
                'txHash': i['hash'],
                'destination': i['to'],
                'ContractName': contract,
                'fullname': address,
                'blockNumber': i['blockNumber']
                # 'balance': balanceByAddress(address,i['blockNumber'])
            },
            'position': pos
        }
        if i['to'] not in [i['id'] for i in processed['nodes']]:
            processed['nodes'].append(currentNode)
        currentEdge = {
            'id': f"{i['from']}-{i['to']}",
            'source': i['from'],
            'target': i['to'],
            'type': 'default',
        }
        processed['edges'].append(currentEdge)
        # print(processed)
    return processed

def apiFunction(address = ADDRESS, tx=TX, afterBlock=0, beforeBlock=99999999,processed=None, depth=1):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock={beforeBlock}&page=1&offset=1000&sort=asc&apikey={API_TOKEN}"
    print(url)
    if depth > 2: return processed
    print('PROCESSED:')
    print(processed)
    data = requests.get(url).json()
    data['result'] = list(filter(lambda e: int(e['value'])>0, data['result']))
    if not processed:
        processed={
            'nodes':[{
                'id': address,
                'type': 'input',
                'data': {
                    'label': address[0:6]
                },
                'position': pos
            }],
            'edges':[{}]
        }
        if not tx=='none':
            correct_element = list(filter(lambda e: e['hash']==tx, data['result']))[0]
            next =apiFunction(correct_element['attributes']['to]'],None,correct_element['attributes']['blockNumber'],beforeBlock,processed,1)
        else:
            # processed['children'] = findFirstChildren(address, 10)
            # correct_elements = list(filter(lambda e: int(e['timeStamp'])>=last_week and e['from']==address, data['result']))[0:10]
            # print(correct_elements)
            children = findFirstChildren(address, 3, afterBlock)
            for i in zip(children['nodes'],children['edges']):
                processed['nodes'].append(i[0])
                processed['edges'].append(i[1])
                    # if 'children' in correct_element.keys():
                    #     correct_element['children'].append(next)
                    # else:
                    #     correct_element['children'] = next
                    # processed['children'].append(correct_element)
                # print(i[0])
                processed = apiFunction(i[0]['data']['destination'],None,afterBlock,beforeBlock,processed,depth)
        # processed['children'] = apiFunction(correct_element['to'],None,None,processed,depth)
        return processed
    else:
        depth+=1
        element1 = list(filter(lambda e: e['from']==address, data['result']))
        if not element1:
            return processed
        element = element1[0]
        nextAddress = element['to']
        contract = confirmContractName(address)
        currentNode = {
            'id': address,
            'data': {
                'label': address[0:6],
                'value': f"{round(int(element['value']) / 1e18,4)} ETH",
                'timestamp': datetime.fromtimestamp(int(element['timeStamp'])).strftime('%Y-%m-%d %H:%M:%S'),
                'txHash': element['hash'],
                'destination': element['to'],
                'ContractName': contract,
                'fullname': address,
                'blockNumber': element['blockNumber']
                # 'balance': balanceByAddress(address,i['blockNumber'])
            },
            'position': pos
        }
        
        if element['to'] not in [i['id'] for i in processed['nodes']]:
            processed['nodes'].append(currentNode)
        currentEdge = {
            'id': f"{element['from']}-{element['to']}",
            'source': element['from'],
            'target': element['to'],
            'type': 'default',
        }
        processed['nodes'].append(currentNode)
        processed['edges'].append(currentEdge)
        children = findFirstChildren(address, 2, afterBlock)
        for element in zip(children['nodes'],children['edges']):
            processed['nodes'].append(element[0])
            processed['edges'].append(element[1])
            if not contract:
                processed = apiFunction(element[0]['data']['destination'],None,element[0]['data']['blockNumber'],beforeBlock, processed,depth)
                # element.setdefault('children',[]).append(next)
                # .setdefault('children',[]).append(element)
        return processed

def apiFn2(address = ADDRESS, afterBlock=0, beforeBlock=99999999,processed=None, depth=1):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock=99999999&page=1&offset=10000&sort=asc&apikey={API_TOKEN}"
    data = requests.get(url).json()
    data['result'] = list(filter(lambda e: int(e['value'])>0 and e['from']==address, data['result']))
    if depth == 2:
        return processed
    if processed == None:
        processed = {'nodes':[],'edges':[]}
    for element in data['result'][0:3]:
        if element['to'] not in [i['id'] for i in processed['nodes']]:
            processed['nodes'].append({
                'id': element['to'],
                'data': {
                    'label': element['to'],
                    'ContractName': confirmContractName(element['to']),
                },
                'position': pos
            })
        if element['from'] not in [i['id'] for i in processed['nodes']]:
            processed['nodes'].append({
                'id': element['from'],
                'data': {
                    'label': element['from'],
                    'ContractName': confirmContractName(element['from']),
                },
                'position': pos
            })
        currentEdge = {
            'id': f"{element['from']}-{element['to']}",
            'source': element['from'],
            'target': element['to'],
            'type': 'default',
            'data': {
                'value': f"{round(int(element['value']) / 1e18,4)} ETH",
                'timestamp': datetime.fromtimestamp(int(element['timeStamp'])).strftime('%Y-%m-%d %H:%M:%S'),
                'txHash': element['hash'],
                'blockNumber': element['blockNumber']
            }
        }
        processed['edges'].append(currentEdge)
        processed = apiFn2(element['from'], element['blockNumber'], beforeBlock, processed, depth+1)
    return processed
res = apiFn2('0x3F08f17973aB4124C73200135e2B675aB2D263D9'.lower(),'none')
print('----RETURNING DATA----')
print(res)
