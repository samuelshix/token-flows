/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  isNode,
  Connection,
  Edge,
  NodeExtent,
  Position,
  getMarkerEnd
} from "react-flow-renderer";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph({ multigraph: true });
dagreGraph.setDefaultEdgeLabel(() => ({}));
const initialElements = 
[
    { id: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
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
        sourcePosition: 'bottom' },
    { id: '1',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 0.6961,
           timestamp: '2018-10-16 15:03:27',
           txHash: '0x5267d8aa7b9c9ef74f111a5ee02085c78a30b9f798e00cac5d57ec21ab1dd258',
           blockNumber: '6526419' } },
      { id: '2',
      source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
      target: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
      animated: 'true',
      type: 'tx',
      data: 
      { value: 0.6961,
        timestamp: '2018-10-16 15:03:27',
        txHash: '0x5267d8aa7b9c9ef74f111a5ee02085c78a30b9f798e00cac5d57ec21ab1dd258',
        blockNumber: '6526419' } },
      { id: '3',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 0.6961,
           timestamp: '2018-10-16 15:03:27',
           txHash: '0x5267d8aa7b9c9ef74f111a5ee02085c78a30b9f798e00cac5d57ec21ab1dd258',
           blockNumber: '6526419' } },
      { id: '4',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 0.2318,
           timestamp: '2018-10-16 15:31:23',
           txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
           blockNumber: '6526540' } },
      { id: '5',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0x8e00f887714922d35a90416864fbf238579c3eac',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 1.4041,
           timestamp: '2018-11-01 12:39:36',
           txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
           blockNumber: '6623650' } },
      { id: '6',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 0.2318,
           timestamp: '2018-10-16 15:31:23',
           txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
           blockNumber: '6526540' } },
      { id: '7',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 0.2318,
           timestamp: '2018-10-16 15:31:23',
           txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
           blockNumber: '6526540' } },
      { id: '8',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0x8e00f887714922d35a90416864fbf238579c3eac',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 1.4041,
           timestamp: '2018-11-01 12:39:36',
           txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
           blockNumber: '6623650' } },
      { id: '9',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 0.4675,
           timestamp: '2018-11-01 13:08:40',
           txHash: '0xc86038e8048c93a89df2a54fbc1dbb591e00cebe540a684f83f41fee1f43f684',
           blockNumber: '6623774' } },
      { id: '10',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0x8e00f887714922d35a90416864fbf238579c3eac',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 1.4041,
           timestamp: '2018-11-01 12:39:36',
           txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
           blockNumber: '6623650' } },
      { id: '11',
        source: '0xce733003800b18833e95338b113c6e00c2ec5af6',
        target: '0x8e00f887714922d35a90416864fbf238579c3eac',
        animated: 'true',
        type: 'tx',
        data: 
         { value: 1.4041,
           timestamp: '2018-11-01 12:39:36',
           txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
           blockNumber: '6623650' } },
      { id: '12',
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
           blockNumber: '6715093' } } ]
const nodeExtent = [
  [0, 0],
  [1000, 1000]
];

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId
}) {
  const edgePath = data.points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
}

const LayoutFlow = () => {
  const [elements, setElements] = (initialElements);
  const onConnect = (params) =>
    setElements((els) => addEdge(params, els));
  const onLayout = (direction) => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: 172, height: 36 });
      } else {
        dagreGraph.setEdge(el.source, el.target, {}, el.id);
      }
    });

    dagre.layout(dagreGraph);

    const layoutedElements = elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? Position.Left : Position.Top;
        el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
        // we need to pass a slighltiy different position in order to notify react flow about the change
        // @TODO how can we change the position handling so that we dont need this hack?
        el.position = {
          x:
            nodeWithPosition.x -
            nodeWithPosition.width / 2 +
            Math.random() / 1000,
          y: nodeWithPosition.y - nodeWithPosition.height / 2
        };
      } else {
        const edgeWithPosition = dagreGraph.edge(el.source, el.target, el.id);
        el.data = { points: edgeWithPosition.points };
        el.type = "custom";
      }

      return el;
    });

    setElements(layoutedElements);
  };

  return (
    <div className="layoutflow">
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          nodeExtent={nodeExtent}
          edgeTypes={{ custom: CustomEdge }}
          onLoad={() => onLayout("TB")}
        >
          <Controls />
        </ReactFlow>
        <div className="controls">
          <button onClick={() => onLayout("TB")} style={{ marginRight: 10 }}>
            vertical layout
          </button>
          <button onClick={() => onLayout("LR")}>horizontal layout</button>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
