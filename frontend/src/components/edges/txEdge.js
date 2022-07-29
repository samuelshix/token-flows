import React, { useState } from 'react';
import Collapse from 'react-bootstrap/esm/Collapse';
import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';

// Scale edge width based on transaction value
const scaleNode = (ethValue) => {
  return 50 / (1 + Math.exp(3 - .05 * ethValue)) - 1;
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
  const edgePath =
    getBezierPath({
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

  const [open, setOpen] = useState(false);
  const length = data.length
  var transactions = [];
  var translateX = 0;
  var timeStr = length > 1 ? `${data[0].timestamp.slice(0, 10)} — ${data[length - 1].timestamp.slice(0, 10)}`
    : data[0].timestamp
  var width = 1;
  var assets = {};
  var style = {
    boxShadow: '0px 0px var(--accent-clr2)'
  }

  // if there are multiple transactions between addresses, display them in a collapsible list
  for (let i = 0; i < length; i++) {
    const transaction = data[i];
    var token = transaction.token;
    if (data[i].token in assets) {
      assets[token] += data[i].value;
    } else {
      assets[token] = data[i].value;
    }
    transactions.push(
      <div
        className="innerTX"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className='toolTipE' htmlFor="text">
          <a target="_blank" href={"https://etherscan.io/tx/" + data.txHash}>
            <b>TX:</b> {transaction.txHash.slice(0, 10)}
          </a>
          <div className='tooltiptextE'>
            <p>{transaction.txHash}</p>
            <button onClick={() => {
              navigator.clipboard.writeText(transaction.txHash)
            }}>Copy</button>
          </div>
        </div>
        <p><b>Value:</b> {`${transaction.value.toLocaleString("en-US")} ${token}`}</p>
        <p><b>Time:</b> {transaction.timestamp}</p>
      </div>
    );
    translateX += 110;
    // if there are multiple transactions between addresses, display them in a collapsible stack by adding boxshadows
    if (i > 0) {
      var offset = 4 * i
      style.boxShadow += `, ${offset}px ${offset}px white, ${offset}px ${offset}px 0px 1px black`
    }
  }

  // scale trasaction information window based on number of assets
  const foreignObjectHeight = 100 + Object.keys(assets).length * 21;
  const foreignObjectWidth = 190;
  var d = []
  for (var asset in assets) {
    if (asset === 'ETH') {
      width = scaleNode(assets[asset]);
    }
    d.push(<p><b>{asset}</b> {assets[asset].toLocaleString("en-US")}</p>)
  }
  return (
    <>
      <path
        id={id}
        style={{ strokeWidth: width }}
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
        onClick={() => setOpen(!open)}
        id={id}
        style={!open ? style : {}}
      >
        <div style={{ cursor: length > 1 ? "pointer" : "" }}>
          <div className='toolTipE' htmlFor="text">
            <a target="_blank" onMouseOver={() => { console.log() }} href={"https://etherscan.io/tx/" + data[0].txHash}>
              <b>TX:</b> {data[0].txHash.slice(0, 10)}
            </a>
            {length > 1 && <><br></br><b>{` ... ${data.length - 1} more`}</b></>}

            <div className='tooltiptextE'>
              <p>{data[0].txHash}</p>
              <button onClick={() => {
                navigator.clipboard.writeText(data[0].txHash)
              }}>Copy</button>
            </div>
          </div>
          {/* <p>TX: {data.txHash.slice(0,10)}</p> */}
          {d}
          <p><b>Time: </b>
            {length > 1 && <>{`${data[0].timestamp.slice(0, 10)}—`}<br></br> {`${data[length - 1].timestamp.slice(0, 10)}`}</>}
            {length === 1 && data[0].timestamp}
          </p>
        </div>
      </foreignObject>
      {length > 1 &&
        <foreignObject
          className='txGroup'
          width={foreignObjectWidth * length}
          height={foreignObjectHeight}
          x={edgeCenterX + 15 + foreignObjectWidth / 2}
          y={edgeCenterY - foreignObjectHeight / 2}
          style={{ display: open ? 'block' : 'none' }}>
          {transactions}
        </foreignObject>}
    </>
  );
}
