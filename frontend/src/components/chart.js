import React, { useCallback, useMemo, useState } from "react"
import UserNode from "./nodes/userNode";
import TxEdge from "./edges/txEdge";
import Tree from 'react-d3-dag';
import { getData } from '../App';
import CytoscapeComponent from 'react-cytoscapejs';
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState, MiniMap, Controls } from 'react-flow-renderer';
import dagre from 'dagre';

// import Web3 from 'web3';
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const defaultData = { nodes: 
  [ { id: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
      type: 'user',
      data: 
       { label: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
         ContractName: '' },
      position: { x: 0, y: 206 },
      targetPosition: 'top',
      sourcePosition: 'bottom' },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      type: 'user',
      data: 
       { label: '0xce733003800b18833e95338b113c6e00c2ec5af6',
         ContractName: '' },
      position: { x: 300, y: 0 },
      targetPosition: 'top',
      sourcePosition: 'bottom' },
    { id: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      type: 'user',
      data: 
       { label: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
         ContractName: '' },
      position: { x: 300, y: 206 },
      targetPosition: 'top',
      sourcePosition: 'bottom' },
    { id: '0x8e00f887714922d35a90416864fbf238579c3eac',
      type: 'user',
      data: 
       { label: '0x8e00f887714922d35a90416864fbf238579c3eac',
         ContractName: '' },
      position: { x: 600, y: 206 },
      targetPosition: 'top',
      sourcePosition: 'bottom' } ],
 edges: 
  [ { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.6961,
         timestamp: '2018-10-16 15:03:27',
         txHash: '0x5267d8aa7b9c9ef74f111a5ee02085c78a30b9f798e00cac5d57ec21ab1dd258',
         blockNumber: '6526419' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.6961,
         timestamp: '2018-10-16 15:03:27',
         txHash: '0x5267d8aa7b9c9ef74f111a5ee02085c78a30b9f798e00cac5d57ec21ab1dd258',
         blockNumber: '6526419' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.2318,
         timestamp: '2018-10-16 15:31:23',
         txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
         blockNumber: '6526540' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x8e00f887714922d35a90416864fbf238579c3eac',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x8e00f887714922d35a90416864fbf238579c3eac',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 1.4041,
         timestamp: '2018-11-01 12:39:36',
         txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
         blockNumber: '6623650' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.2318,
         timestamp: '2018-10-16 15:31:23',
         txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
         blockNumber: '6526540' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.2318,
         timestamp: '2018-10-16 15:31:23',
         txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
         blockNumber: '6526540' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x8e00f887714922d35a90416864fbf238579c3eac',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x8e00f887714922d35a90416864fbf238579c3eac',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 1.4041,
         timestamp: '2018-11-01 12:39:36',
         txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
         blockNumber: '6623650' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.4675,
         timestamp: '2018-11-01 13:08:40',
         txHash: '0xc86038e8048c93a89df2a54fbc1dbb591e00cebe540a684f83f41fee1f43f684',
         blockNumber: '6623774' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x8e00f887714922d35a90416864fbf238579c3eac',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x8e00f887714922d35a90416864fbf238579c3eac',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 1.4041,
         timestamp: '2018-11-01 12:39:36',
         txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
         blockNumber: '6623650' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x8e00f887714922d35a90416864fbf238579c3eac',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x8e00f887714922d35a90416864fbf238579c3eac',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 1.4041,
         timestamp: '2018-11-01 12:39:36',
         txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
         blockNumber: '6623650' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 0.4675,
         timestamp: '2018-11-01 13:08:40',
         txHash: '0xc86038e8048c93a89df2a54fbc1dbb591e00cebe540a684f83f41fee1f43f684',
         blockNumber: '6623774' } },
    { id: '0xce733003800b18833e95338b113c6e00c2ec5af6-0x8e00f887714922d35a90416864fbf238579c3eac',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x8e00f887714922d35a90416864fbf238579c3eac',
      animated: 'true',
      type: 'tx',
      data: 
       { value: 1.4484,
         timestamp: '2018-11-16 12:05:10',
         txHash: '0xda5019a6f9659094d49d46c391a4a5b4af1d865a698b109962d3bd22dab2f626',
         blockNumber: '6715093' } } ] }

const util = require('util')


export const OrgChartTree = ({chartData}) => {
  if(Object.keys(chartData).length === 0) {
    chartData = defaultData;
  }
  console.log(util.inspect(chartData, {showHidden: false, depth: null, colors: true}))
  var nodes = chartData.nodes;
  var edges = chartData.edges;
  const nodeTypes = useMemo(() => ({ user: UserNode }), []);
  const edgeTypes = useMemo(() => ({ tx: TxEdge }), []);
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 250;
  const nodeHeight = 250;

  const getLayoutedElements = (nodes, edges, direction = 'TB') => {
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
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
  
      return node;
    });
  
    return { nodes, edges };
  };
  
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges
  );
  
  const [cnodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [cedges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const onConnect = (params) => setEdges((eds)=> addEdge(params,eds));
  const [updatedNodes, setUpdatedNodes] = useState(cnodes);
  const [updatedEdges, setUpdatedEdges] = useState(cedges);
  
//   const onConnect = 
// useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'tx', animated: true }, eds)),[]);
    // console.log(chartData)
  return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '80%', height: '90vh' }}>
        <ReactFlow
        nodes={cnodes}
        // nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={cedges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        attributionPosition="top-right"
        >
        <MiniMap />
        <Controls />  
        </ReactFlow>
        {/* <div className="controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </div> */}
    
        
      </div>
  );
}
// 0x3F08f17973aB4124C73200135e2B675aB2D263D9