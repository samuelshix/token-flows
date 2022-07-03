from tracemalloc import start
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json
from django.http import JsonResponse
from datetime import datetime
import datetime as dt 
import asyncio

today = dt.datetime.now()
d = dt.timedelta(days = 7)
last_week = int((today - d).timestamp())

API_TOKEN = 'V9MH4DCQ3BSHNAAQ6PDW5KNTGSXVIVZUQ3'
INFURA_TOKEN = '1baacf3e1ab9473ebecc4de3f91a93bb'
TX = '0xabba82a41c866f181eba449fb47247077b1ff0bc9f47215944264dd02688aa09'
ADDRESS = '0xDc1487E092CaBA080C6BADafAa75a58Ce7a2EC34' 
balance_url = f"https://mainnet.infura.io/v3/{INFURA_TOKEN}"

# def balanceByAddress(address,block):
#     payload = json.dumps({
#     "jsonrpc": "2.0",
#     "method": "eth_getBalance",
#     "params": [address,hex(int(block))],
#     "id": 1
#     })
#     response = requests.request("POST", balance_url, data=payload)
#     hex_value = json.loads(response.text)['result']
#     return int(hex_value,16)/1e18
def getBlockByTimestamp(start_timestamp,end_timestamp):
    start_url = f"https://api.etherscan.io/api?module=block&action=getblocknumber&timestamp={start_timestamp}&apikey={API_TOKEN}"
    end_url = f"https://api.etherscan.io/api?module=block&action=getblocknumber&timestamp={end_timestamp}&apikey={API_TOKEN}"
    data = (requests.get(start_url).json()['result'],requests.get(end_url).json()['result'])
    return data

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
        nextAddress = i['from']
        tmpProcessed = {
            'name': nextAddress[0:6],
            'attributes': {
            'value': f"{round(int(i['value']) / 1e18,4)} ETH",
            'timestamp': datetime.fromtimestamp(int(i['timeStamp'])).strftime('%Y-%m-%d %H:%M:%S'),
            'txHash': i['hash'],
            'destination': i['to'],
            'ContractName': contract,
            'fullname': nextAddress,
            'blockNumber': i['blockNumber']
            # 'balance': balanceByAddress(address,i['blockNumber'])
            }
        }
        if not contract:
            x.append(tmpProcessed)
    return x

def apiFunction(address = ADDRESS, tx=TX, afterBlock=0, beforeBlock=99999999,processed=None, depth=1):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock={beforeBlock}&page=1&offset=1000&sort=asc&apikey={API_TOKEN}"
    # print(depth,processed)
#     print(url)
    if depth > 2: return []
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
            correct_element = list(filter(lambda e: e['hash']==tx, data['result']))[0]
            next =apiFunction(correct_element['attributes']['to]'],None,correct_element['attributes']['blockNumber'],beforeBlock,1,1)
            correct_element.setdefault('children',[]).append(next)
        else:
            # processed['children'] = findFirstChildren(address, 10)
            # correct_elements = list(filter(lambda e: int(e['timeStamp'])>=last_week and e['from']==address, data['result']))[0:10]
            # print(correct_elements)
            for correct_element in findFirstChildren(address, 3):
                next = apiFunction(correct_element['attributes']['destination'],None,correct_element['attributes']['blockNumber'],beforeBlock,1,1)
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
            'name': address[0:6],
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
            next = apiFunction(element['attributes']['destination'],None,element['attributes']['blockNumber'],beforeBlock, 1,depth)
            if not contract and next:
                element.setdefault('children',[]).append(next)
                tmpProcessed.setdefault('children',[]).append(element)
        return tmpProcessed

# def apiFunction(address = ADDRESS, tx=TX, afterBlock=0,processed=None, depth=1):
#     url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock=99999999&page=1&offset=10000&sort=asc&apikey={API_TOKEN}"
#     print(depth,processed)
#     if depth > 4: return
#     data = requests.get(url).json()
#     data['result'] = list(filter(lambda e: int(e['value'])>0, data['result']))
#     if not processed:
#         processed={
#             'name': address[0:6],
#             'attributes': {
#                 'fullname': address
#             },  
#             'children': []        
#             }
#         if not tx=='none':
#             correct_element = list(filter(lambda e: e['hash']==tx, data['result']))[0]
#             x = apiFunction(correct_element['to'],None,None,1,depth)
#             if x:
#                 processed['children'].append(x)
#         else:
#             correct_elements = list(filter(lambda e: int(e['timeStamp'])>=last_week and e['from']==address, data['result']))[0:15]
#             for correct_element in correct_elements:
#                 x =apiFunction(correct_element['to'],None,None,1,depth)
#                 if x:
#                     # if processed['children']:
#                     processed['children'].append(x)
#                     # else:
#                     #     processed['children'] = x
#         return processed
#     else:
#         depth+=1
#         element1 = list(filter(lambda e: e['from']==address, data['result']))
#         if not element1:
#             return
#         element = element1[0]
# #         print(list(filter(lambda e: e['from']==address, data['result']))[0])
#         nextAddress = element['to']
#         tmpProcessed = {
#             'name': nextAddress[0:6],
#             'attributes': {
#             'value': f"{int(element['value']) / 1e18} ETH",
#             'timestamp': datetime.fromtimestamp(int(element['timeStamp'])),
#             'txHash': element['hash'],
#             },
#             'children': []
#         }
#         x = apiFunction(nextAddress,None,element['blockNumber'], 1,depth)
#         if x:
#             tmpProcessed['children'].append(x)
#             # tmpProcessed['children'] = x
#         return tmpProcessed
# Create your views here.
class TokenFlows(APIView):
    def get(self, request):
        tx = request.GET.get('tx')
        address = request.GET.get('address').lower()
        start = request.GET.get('startDate')
        end = request.GET.get('endDate')
        (start_block, end_block) = getBlockByTimestamp(start,end)
        data = apiFunction(address,tx,start_block,end_block)
        # print(json.dumps(data, indent =2))
        return Response(data)

# class TokenFlows(APIView):
#     def get(self, request):
#         data = apiFunction()
#         return Response(data)