from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from datetime import datetime
import datetime as dt
import random

today = dt.datetime.now()
d = dt.timedelta(days=7)
last_week = int((today - d).timestamp())

API_TOKENS = [
    "V9MH4DCQ3BSHNAAQ6PDW5KNTGSXVIVZUQ3",
    "5WUNMC9GI3HNWSC5NTSH5FQQCPVRVM4RN2",
    "AKSEKH56BYQ5KNZ92PZJ3SR7YB1AZ1WPDS",
    "K35XCVJA83WWYXVRV4Z2ZDCCJW2Y1YWDAJ",
    "A9PVA23UFVUJY6DWTXUS1VVCBEZ5TG1G9D",
    "JV2RB3EE71A3DVBTUMYM4NZQFX4AKQ1UT1",
]

pos = {"x": 0, "y": 0}

# Returns a tuple of start and end block numbers.
def getBlockByTimestamp(start_timestamp, end_timestamp):
    if not start_timestamp:
        return ("", "")
    start_url = f"https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp={start_timestamp}&closest=after&apikey={random.choice(API_TOKENS)}"
    end_url = f"https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp={end_timestamp}&closest=before&apikey={random.choice(API_TOKENS)}"
    data = (
        requests.get(start_url).json()["result"],
        requests.get(end_url).json()["result"],
    )
    return data


# Returns the contract name if it exists.
def confirmContractName(address):
    url = f"https://api.etherscan.io/api?module=contract&action=getsourcecode&address={address}&apikey={random.choice(API_TOKENS)}"
    data = requests.get(url).json()
    return data["result"][0]["ContractName"]


# Recursively travels down a tree of transactions starting from a single address, while adding information to
# persistent dictionary 'processed', containing the node and edges information. Recursion is limited by the
# depth parameter as well as number of transactions processed per address.
def apiFn(address=ADDRESS, afterBlock=0, beforeBlock=99999999, processed=None, depth=1):
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={afterBlock}&endblock={beforeBlock}&page=1&offset=5000&sort=asc&apikey={random.choice(API_TOKENS)}"
    print(url)
    data = requests.get(url).json()
    data["result"] = list(
        filter(lambda e: int(e["value"]) > 0 and e["from"] == address, data["result"])
    )
    if depth == 3:
        return processed
    if processed == None:
        processed = {"nodes": [], "edges": []}
    for element in data["result"][0:2]:
        if element["to"] not in [i["id"] for i in processed["nodes"]]:
            processed["nodes"].append(
                {
                    "id": element["to"],
                    # 'type': 'user',
                    "data": {
                        "label": "Wallet: " + element["to"],
                        "ContractName": confirmContractName(element["to"]),
                    },
                    "position": pos,
                }
            )
        if element["from"] not in [i["id"] for i in processed["nodes"]]:
            processed["nodes"].append(
                {
                    "id": element["from"],
                    # 'type': 'user',
                    "data": {
                        "label": "Wallet: " + element["from"],
                        "ContractName": confirmContractName(element["from"]),
                    },
                    "position": pos,
                }
            )
        id = f"{element['from']}-{element['to']}"
        current_edge = list(filter(lambda e: e["id"] == id, processed["edges"]))
        if not current_edge:
            currentEdge = {
                "id": id,
                "source": element["from"],
                "target": element["to"],
                "animated": "true",
                "type": "tx",
                "data": [
                    {
                        "value": round(int(element["value"]) / 1e18, 2),
                        "timestamp": datetime.fromtimestamp(
                            int(element["timeStamp"])
                        ).strftime("%Y-%m-%d %H:%M:%S"),
                        "txHash": element["hash"],
                        "blockNumber": element["blockNumber"],
                        "token": "ETH",
                    }
                ],
            }
            processed["edges"].append(currentEdge)
        else:
            current_edge[0]["data"].append(
                {
                    "value": round(int(element["value"]) / 1e18, 2),
                    "timestamp": datetime.fromtimestamp(
                        int(element["timeStamp"])
                    ).strftime("%Y-%m-%d %H:%M:%S"),
                    "txHash": element["hash"],
                    "blockNumber": element["blockNumber"],
                    "token": "ETH",
                }
            )
        processed = apiFn(
            element["to"], element["blockNumber"], beforeBlock, processed, depth + 1
        )
    return processed


# Uses the previous processed dictionary and appends transactions for ERC-20 tokens in the same manner as above.
def apiFnERC20(
    address=ADDRESS, afterBlock=0, beforeBlock=99999999, processed=None, depth=1
):
    url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={address}&startblock={afterBlock}&endblock={beforeBlock}&page=1&offset=5000&sort=asc&apikey={random.choice(API_TOKENS)}"
    data = requests.get(url).json()
    data["result"] = list(
        filter(lambda e: int(e["value"]) > 0 and e["from"] == address, data["result"])
    )
    if depth == 3:
        return processed
    if processed == None:
        processed = {"nodes": [], "edges": []}
    for element in data["result"][0:3]:
        if element["to"] not in [i["id"] for i in processed["nodes"]]:
            processed["nodes"].append(
                {
                    "id": element["to"],
                    "type": "user",
                    "data": {
                        "label": "Wallet: " + element["to"],
                        "ContractName": confirmContractName(element["to"]),
                    },
                    "position": pos,
                }
            )
        if element["from"] not in [i["id"] for i in processed["nodes"]]:
            processed["nodes"].append(
                {
                    "id": element["from"],
                    "type": "user",
                    "data": {
                        "label": "Wallet: " + element["from"],
                        "ContractName": confirmContractName(element["from"]),
                    },
                    "position": pos,
                }
            )
        id = f"{element['from']}-{element['to']}"
        current_edge = list(filter(lambda e: e["id"] == id, processed["edges"]))
        token_decimals = int(element["tokenDecimal"])
        inner_data = {
            "value": round(int(element["value"]) / 10**token_decimals, 2),
            "token": element["tokenSymbol"],
            "timestamp": datetime.fromtimestamp(int(element["timeStamp"])).strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
            "txHash": element["hash"],
            "blockNumber": element["blockNumber"],
        }
        if not current_edge:
            currentEdge = {
                "id": id,
                "source": element["from"],
                "target": element["to"],
                "animated": "true",
                "type": "tx",
                "data": [inner_data],
            }
            processed["edges"].append(currentEdge)
        else:
            current_edge[0]["data"].append(inner_data)
        processed = apiFnERC20(
            element["to"], element["blockNumber"], beforeBlock, processed, depth + 1
        )
    return processed


# Recieves user search form input via url params and runs the apiFn function to get ethereum transactions
# and then the apiFnERC20 function to get ERC-20 token transactions to append to the graph.
class TokenFlows(APIView):
    def get(self, request):
        address = request.GET.get("address").lower()
        start = request.GET.get("startDate")
        end = request.GET.get("endDate")
        (start_block, end_block) = getBlockByTimestamp(start, end)
        eth_transfers = apiFn(address, start_block, end_block)
        all_transfers = apiFnERC20(address, start_block, end_block, eth_transfers)
        return Response(all_transfers)
