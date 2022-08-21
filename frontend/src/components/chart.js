import React, { useEffect, useState } from "react"
import TxEdge from "./edges/txEdge";
import ReactFlow, { ConnectionLineType, useNodesState, useEdgesState, MiniMap, Controls } from 'react-flow-renderer';
import dagre from 'dagre';
import * as d3 from 'd3';
import defaultData from "../defaultData.json"

var { nodes, edges } = defaultData
// Use dagre graph for automatic layout of tree
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
// get nodes and edges from dagre for react flow
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
    // shift dagre node position to the top left to match the React Flow node position.
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

const edgeTypes = { tx: TxEdge }

export const OrgChartTree = ({ chartData }) => {
  const updateZIndex = () => {
    var txs = d3.selectAll('.edge-foreignobject, .txGroup, g path')
    var temp_max = 0;
    // reposition graph by 10000 px on each graph update to account for shifting graph glitch
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
    txs.data(zOrder);
    txs.sort(d3.descending);
    setMax(temp_max)
  }
  if (Object.keys(chartData).length === 0) {
    chartData = defaultData;
  }
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [max_x, setMax] = useState(0);

  useEffect(() => {
    console.log('Updating chart...')
    dagreGraph = blankDagreGraph
    const { nodes, edges } = chartData;
    nodes.forEach((node) => {
      if (node.data.ContractName) {
        node.style = {
          border: '1px solid yellow',
          boxShadow: '2px 2px yellow'
        }
        node.data.label = node.data.ContractName;
      }
    })
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      dagreGraph,
      max_x
    );
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