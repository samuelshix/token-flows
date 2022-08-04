import React, { useCallback, useEffect, useMemo, useState } from "react"
// import UserNode from "./nodes/userNode";
import TxEdge from "./edges/txEdge";
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState, MiniMap, Controls, useReactFlow } from 'react-flow-renderer';
import dagre from 'dagre';
import * as d3 from 'd3';
const util = require('util')
const defaultData = {
  nodes:
    [{
      id: '0xbb0424ed909293701e95cca03cbf1274918d7c09',

      data:
      {
        label: 'Wallet: 0xbb0424ed909293701e95cca03cbf1274918d7c09',
        ContractName: ''
      },
      position: { x: 225, y: 300 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: '0x3f08f17973ab4124c73200135e2b675ab2d263d9',

      data:
      {
        label: 'Wallet: 0x3f08f17973ab4124c73200135e2b675ab2d263d9',
        ContractName: ''
      },
      position: { x: 900, y: 0 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: '0xac9cd0d8e13cd63f2296ce34f6f75b2a2d90f8bc',

      data:
      {
        label: 'Wallet: 0xac9cd0d8e13cd63f2296ce34f6f75b2a2d90f8bc',
        ContractName: ''
      },
      position: { x: 0, y: 600 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: '0xdc1487e092caba080c6badafaa75a58ce7a2ec34',

      data:
      {
        label: 'Wallet: 0xdc1487e092caba080c6badafaa75a58ce7a2ec34',
        ContractName: ''
      },
      position: { x: 450, y: 600 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: '0x6b5a7e87a2e207e022ab820c618b89d8374aa5d5',

      data:
      {
        label: 'Wallet: 0x6b5a7e87a2e207e022ab820c618b89d8374aa5d5',
        ContractName: ''
      },
      position: { x: 900, y: 300 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: '0x9cb92e6537c61d970f89a8fa560823e6459a7025',

      data:
      {
        label: 'Wallet: 0x9cb92e6537c61d970f89a8fa560823e6459a7025',
        ContractName: ''
      },
      position: { x: 1350, y: 300 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: '0x28c6c06298d514db089934071355e5743bf21d60',

      data:
      {
        label: 'Wallet: 0x28c6c06298d514db089934071355e5743bf21d60',
        ContractName: ''
      },
      position: { x: 900, y: 600 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    }],
  edges:
    [{
      id: '0x3f08f17973ab4124c73200135e2b675ab2d263d9-0xbb0424ed909293701e95cca03cbf1274918d7c09',
      source: '0x3f08f17973ab4124c73200135e2b675ab2d263d9',
      target: '0xbb0424ed909293701e95cca03cbf1274918d7c09',
      animated: 'true',
      type: 'tx',
      data:
        [{
          value: 0.01,
          timestamp: '2021-11-30 08:32:21',
          txHash: '0x8497e777886b5341f0e212717984a2e02d12eddd173290220bb3c498de9c54a6',
          blockNumber: '13713775',
          token: 'ETH'
        },
        {
          value: 0.1,
          timestamp: '2021-12-08 13:28:53',
          txHash: '0xf17dac8ed5ab0f52bf580a901cd096aeda94b397c3c32164598e4f898e62e6a1',
          blockNumber: '13765069',
          token: 'ETH'
        },
        {
          value: 300,
          timestamp: '2021-12-08 13:32:42',
          txHash: '0xeb66ac1b07e39e1f92aebe93ba54f7e66f1eacf0f6488c51941f93d8d9735d13',
          blockNumber: '13765086',
          token: 'ETH'
        }]
    },
    {
      id: '0xbb0424ed909293701e95cca03cbf1274918d7c09-0xac9cd0d8e13cd63f2296ce34f6f75b2a2d90f8bc',
      source: '0xbb0424ed909293701e95cca03cbf1274918d7c09',
      target: '0xac9cd0d8e13cd63f2296ce34f6f75b2a2d90f8bc',
      animated: 'true',
      type: 'tx',
      data:
        [{
          value: 0.1,
          timestamp: '2021-12-13 19:21:38',
          txHash: '0xafc24a62f692e75da9f7be1d2b8360612a21efeb3fd34c4f42b1a2344250c230',
          blockNumber: '13798736',
          token: 'ETH'
        }]
    },
    {
      id: '0xbb0424ed909293701e95cca03cbf1274918d7c09-0xdc1487e092caba080c6badafaa75a58ce7a2ec34',
      source: '0xbb0424ed909293701e95cca03cbf1274918d7c09',
      target: '0xdc1487e092caba080c6badafaa75a58ce7a2ec34',
      animated: 'true',
      type: 'tx',
      data:
        [{
          value: 0.1,
          timestamp: '2021-12-16 09:21:40',
          txHash: '0x125d6abf04d4ec18fb5802815b2ac36195b5829acddee7c02cce5672571e2a1d',
          blockNumber: '13815388',
          token: 'ETH'
        },
        {
          value: 330.23,
          timestamp: '2021-12-16 09:23:54',
          txHash: '0xeeb259d705c91d87fffaeb7c34ba8ef47b5c0e31c07c9a739bd368a9a6615633',
          blockNumber: '13815401',
          token: 'ETH'
        }]
    },
    {
      id: '0x3f08f17973ab4124c73200135e2b675ab2d263d9-0x6b5a7e87a2e207e022ab820c618b89d8374aa5d5',
      source: '0x3f08f17973ab4124c73200135e2b675ab2d263d9',
      target: '0x6b5a7e87a2e207e022ab820c618b89d8374aa5d5',
      animated: 'true',
      type: 'tx',
      data:
        [{
          value: 10,
          token: 'MANA',
          timestamp: '2021-12-01 14:37:41',
          txHash: '0x4577f1064a6a9337db2feb8080d34afcc8f9d5ce51368839346dcaa412e5d3bf',
          blockNumber: '13721633'
        },
        {
          value: 50,
          token: 'MATIC',
          timestamp: '2021-12-02 12:29:45',
          txHash: '0xb9dccfbde71b51fc303c7ab37e60124780e26b5073d2aea4863ca94f1e3fe3b8',
          blockNumber: '13727357'
        }]
    },
    {
      id: '0x3f08f17973ab4124c73200135e2b675ab2d263d9-0x9cb92e6537c61d970f89a8fa560823e6459a7025',
      source: '0x3f08f17973ab4124c73200135e2b675ab2d263d9',
      target: '0x9cb92e6537c61d970f89a8fa560823e6459a7025',
      animated: 'true',
      type: 'tx',
      data:
        [{
          value: 50,
          token: 'MATIC',
          timestamp: '2021-12-02 12:29:30',
          txHash: '0xdf79d12d83fc57fc6ad0210ac80edd68d696671d22a7fd29311377595dc1e335',
          blockNumber: '13727355'
        }]
    },
    {
      id: '0x6b5a7e87a2e207e022ab820c618b89d8374aa5d5-0x28c6c06298d514db089934071355e5743bf21d60',
      source: '0x6b5a7e87a2e207e022ab820c618b89d8374aa5d5',
      target: '0x28c6c06298d514db089934071355e5743bf21d60',
      animated: 'true',
      type: 'tx',
      data:
        [{
          value: 1000050,
          token: 'MATIC',
          timestamp: '2021-12-02 15:31:55',
          txHash: '0x449283b559975cc068a02b0c88af97669602f7ef4ed45643328c1a7f2bf995bd',
          blockNumber: '13728124'
        },
        {
          value: 100003000000,
          token: 'SHIB',
          timestamp: '2021-12-03 12:33:19',
          txHash: '0xa968b8eb4edf8edf374ad8e757cb5b73bff740e95cc3bc44391e57b57a47ad31',
          blockNumber: '13733622'
        },
        {
          value: 4500000,
          token: 'USDT',
          timestamp: '2021-12-05 15:34:07',
          txHash: '0x0930a9b433d9547357a551b34bb808ce51aaf196399cea6312ad264858f23c71',
          blockNumber: '13746864'
        }]
    }]
}
var { nodes, edges } = defaultData

const blankDagreGraph = new dagre.graphlib.Graph();
blankDagreGraph.setDefaultEdgeLabel(() => ({}));
var dagreGraph = blankDagreGraph;

const nodeWidth = 400;
const nodeHeight = 300;
const copyAddress = (event, node) => {
  node.onClick = () => {
    navigator.clipboard.writeText(node.id)
    console.log(node.id)
  }
}
const getLayoutedElements = (nodes, edges, dagreGraph, max, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - max - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  nodes, edges, dagreGraph, 0
);

// const nodeTypes = {user: UserNode}
const edgeTypes = { tx: TxEdge }

export const OrgChartTree = ({ chartData }) => {
  const updateZIndex = () => {
    // var nodes = d3.selectAll('svg .react-flow__node')
    var txs = d3.selectAll('.edge-foreignobject, .txGroup, g path')
    // if (txs.length > 1) {
    // console.log(nodes)
    var temp_max = 0;
    var zOrder = txs[0].map(cv => {
      if (cv.localName === 'path') {
        return 10000
      } else {
        var pos = cv[Object.keys(cv)[1]].x
        if (pos > temp_max) {
          temp_max = pos
        }
        return pos
      }
    })
    // console.log(zOrder)
    txs.data(zOrder);
    txs.sort(d3.descending);
    setMax(temp_max)
    // }
  }
  if (Object.keys(chartData).length === 0) {
    chartData = defaultData;
  }
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [max_x, setMax] = useState(0);

  useEffect(() => {
    console.log('Updating chart...')
    // console.log(util.inspect(chartData, {showHidden: false, depth: null, colors: true}))
    dagreGraph = blankDagreGraph
    const { nodes, edges } = chartData;
    nodes.forEach((node) => {
      if (node.data.ContractName) {
        // React.createElement("div",{className:"contract-label"},node)
        node.style = {
          border: '1px solid yellow',
          boxShadow: '2px 2px yellow'
        }
        node.data.label = node.data.ContractName;
        // console.log('contract name', node.data.ContractName)
      }
    })
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      dagreGraph,
      max_x
    );
    // console.log(max_x)
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    updateZIndex();
  }, [chartData])
  window.addEventListener('load', () => {
    updateZIndex();
  })
  return (
    <div id="treeWrapper" style={{ width: '100%', height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        onNodeClick={copyAddress}
      >
        {nodes.length === 0 && <p className="alert">Error: No token transfer transactions found within this period for the address specified. Please check your timeframe and address and try again!</p>}
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}