import React from 'react';
import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';

const foreignObjectHeight = 90;
const foreignObjectWidth = 100;
const scaleNode = (ethValue) => {
    return 50 / (1 + Math.exp(3-.05*ethValue))-2;
}
export default function TxEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  console.log(data)
  const width = scaleNode(data.value);
  return (
    <>
      <path
        id={id}
        style={{'stroke-width': width}}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectWidth}
        height={foreignObjectHeight}
        x={edgeCenterX - foreignObjectWidth / 2}
        y={edgeCenterY - foreignObjectHeight / 2}
        className="edge-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
         <div className='toolTipE' htmlFor="text">
            <a target="_blank" onMouseOver={()=>{console.log()}} href={"https://etherscan.io/tx/"+data.txHash}>
                <b>TX: {data.txHash.slice(0,10)}</b>
            </a>
            <div className='tooltiptextE'>
                <p>{data.txHash}</p>
                <button onClick={()=>{
                    navigator.clipboard.writeText(data.txHash)
                    }}>Copy</button>
            </div>
        </div>
        {/* <p>TX: {data.txHash.slice(0,10)}</p> */}
        <p>Value: {`${data.value} ETH`}</p>
        <p>Time: {data.timestamp}</p>
      </foreignObject>
    </>
  );
}
