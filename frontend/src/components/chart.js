import React from 'react';
import Tree from 'react-d3-dag';
import { getData } from '../App';
import CytoscapeComponent from 'react-cytoscapejs';
// var nodeHtmlLabel = require('cytoscape-node-html-label');

// import Web3 from 'web3';
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// const ADDRESS =  0x3f08f17973ab4124c73200135e2b675ab2d263d9
// // console.log(web3.eth.getCode(ADDRESS))
// const FIRST_TX = 
// '0x18d4cadea516f17729621b0db395293775646126aea5f7e8678fa575738b86a0'

const defaultData = { name: '0xce73',
  attributes: { fullname: '0xce733003800b18833e95338b113c6e00c2ec5af6' },
  children: 
   [ { name: '0x4c1c',
       attributes: 
        { value: '0.6961 ETH',
          timestamp: '2018-10-16 11:03:27',
          txHash: '0x5267d8aa7b9c9ef74f111a5ee02085c78a30b9f798e00cac5d57ec21ab1dd258',
          destination: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
          ContractName: '',
          fullname: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b' },
       children: 
        [ { name: '0x8850',
            attributes: 
             { value: '6.0 ETH',
               timestamp: '2018-02-19 00:18:48',
               txHash: '0x71899b45b47fc79e20b705f9f9595384d73b4e66c4d6e6116ffd1b31107fe5b3',
               destination: '0x88506aa298cab54cc995feeab17970525310c6d5',
               ContractName: '',
               fullname: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b' },
            children: 
             [ { name: '0x8850',
                 attributes: 
                  { value: '6.0 ETH',
                    timestamp: '2018-02-19 00:18:48',
                    txHash: '0x71899b45b47fc79e20b705f9f9595384d73b4e66c4d6e6116ffd1b31107fe5b3',
                    destination: '0x88506aa298cab54cc995feeab17970525310c6d5',
                    ContractName: '',
                    fullname: '0x88506aa298cab54cc995feeab17970525310c6d5' },
                 children: 
                  [ { name: '0x3f5c',
                      attributes: 
                       { value: '35.0567 ETH',
                         timestamp: '2018-01-26 11:42:19',
                         txHash: '0x3dbead4f54374c6d10377a8a11746368ddd297964a3085fa345a21840d817bc1',
                         destination: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
                         ContractName: '',
                         fullname: '0x88506aa298cab54cc995feeab17970525310c6d5' } } ] },
               { name: '0x8850',
                 attributes: 
                  { value: '2.0 ETH',
                    timestamp: '2018-02-22 01:32:32',
                    txHash: '0x2d500cfbff1124f5f9ad5e9720a9bde873371431935ea2e691c67a86d64bfa6e',
                    destination: '0x88506aa298cab54cc995feeab17970525310c6d5',
                    ContractName: '',
                    fullname: '0x88506aa298cab54cc995feeab17970525310c6d5' },
                 children: 
                  [ { name: '0x3f5c',
                      attributes: 
                       { value: '35.0567 ETH',
                         timestamp: '2018-01-26 11:42:19',
                         txHash: '0x3dbead4f54374c6d10377a8a11746368ddd297964a3085fa345a21840d817bc1',
                         destination: '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
                         ContractName: '',
                         fullname: '0x88506aa298cab54cc995feeab17970525310c6d5' } } ] } ] } ] },
     { name: '0xe1a0',
       attributes: 
        { value: '0.2318 ETH',
          timestamp: '2018-10-16 11:31:23',
          txHash: '0xc816a1ef1cd48f784b4f27164b804b603f55c65b63cf9a46bd6e19a6fcdc52b9',
          destination: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1',
          ContractName: '',
          fullname: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1' },
       children: 
        [ { name: '0x3236',
            attributes: 
             { value: '1.0023 ETH',
               timestamp: '2018-09-19 21:28:39',
               txHash: '0xcee3a8f7b1d2cd9a3d0a3aca7759b67d0affdcbd16728e3e06ce9d9124852c3c',
               destination: '0x323632d993fe227753ab7cc9c14834f60e043abf',
               ContractName: '',
               fullname: '0xe1a03a55ba8b75b8eee43a4a28ae4a05406abed1' },
            children: 
             [ { name: '0x3236',
                 attributes: 
                  { value: '1.0023 ETH',
                    timestamp: '2018-09-19 21:28:39',
                    txHash: '0xcee3a8f7b1d2cd9a3d0a3aca7759b67d0affdcbd16728e3e06ce9d9124852c3c',
                    destination: '0x323632d993fe227753ab7cc9c14834f60e043abf',
                    ContractName: '',
                    fullname: '0x323632d993fe227753ab7cc9c14834f60e043abf' },
                 children: 
                  [ { name: '0x5c4f',
                      attributes: 
                       { value: '0.01 ETH',
                         timestamp: '2016-03-20 02:07:28',
                         txHash: '0xb53cc94e11693a7d581f3c398d35b693848771ca67c7f61c5d32cf906a8d0792',
                         destination: '0x5c4f6a098eb39782ab1fefb8b85d136c932e5c16',
                         ContractName: '',
                         fullname: '0x323632d993fe227753ab7cc9c14834f60e043abf' } } ] },
               { name: '0x3236',
                 attributes: 
                  { value: '1.0097 ETH',
                    timestamp: '2018-09-20 05:29:09',
                    txHash: '0xebc86b0cb09b906f96b7a7cf1f47606359f7e886aec5002868acccec1268d4af',
                    destination: '0x323632d993fe227753ab7cc9c14834f60e043abf',
                    ContractName: '',
                    fullname: '0x323632d993fe227753ab7cc9c14834f60e043abf' },
                 children: 
                  [ { name: '0x5c4f',
                      attributes: 
                       { value: '0.01 ETH',
                         timestamp: '2016-03-20 02:07:28',
                         txHash: '0xb53cc94e11693a7d581f3c398d35b693848771ca67c7f61c5d32cf906a8d0792',
                         destination: '0x5c4f6a098eb39782ab1fefb8b85d136c932e5c16',
                         ContractName: '',
                         fullname: '0x323632d993fe227753ab7cc9c14834f60e043abf' } } ] } ] } ] },
     { name: '0x8e00',
       attributes: 
        { value: '1.4041 ETH',
          timestamp: '2018-11-01 08:39:36',
          txHash: '0xb2676f7b0e31e3a809c5b6265bbf0d1790dbab79073da5f1698c1881db4aa00a',
          destination: '0x8e00f887714922d35a90416864fbf238579c3eac',
          ContractName: '',
          fullname: '0x8e00f887714922d35a90416864fbf238579c3eac' },
       children: 
        [ { name: '0x4c1c',
            attributes: 
             { value: '5.78 ETH',
               timestamp: '2019-01-10 07:42:44',
               txHash: '0x593801c9029511e8f699d5706666d1031f703e7adec7ed7eda6e6119af510649',
               destination: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
               ContractName: '',
               fullname: '0x8e00f887714922d35a90416864fbf238579c3eac' },
            children: 
             [ { name: '0x4c1c',
                 attributes: 
                  { value: '5.78 ETH',
                    timestamp: '2019-01-10 07:42:44',
                    txHash: '0x593801c9029511e8f699d5706666d1031f703e7adec7ed7eda6e6119af510649',
                    destination: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b',
                    ContractName: '',
                    fullname: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b' },
                 children: 
                  [ { name: '0x8850',
                      attributes: 
                       { value: '6.0 ETH',
                         timestamp: '2018-02-19 00:18:48',
                         txHash: '0x71899b45b47fc79e20b705f9f9595384d73b4e66c4d6e6116ffd1b31107fe5b3',
                         destination: '0x88506aa298cab54cc995feeab17970525310c6d5',
                         ContractName: '',
                         fullname: '0x4c1c81f1441bc6ec1a0bc1007aa5e8f3d7fd7e6b' } } ] },
               { name: '0x5f2f',
                 attributes: 
                  { value: '30.539 ETH',
                    timestamp: '2019-07-12 04:23:02',
                    txHash: '0x0aa11d261a62ae2e7999c9c6a9d6277722223b31449870198d41ea766c4983a8',
                    destination: '0x5f2fccab3c1e6721f620bdd831e2caee72ec22fe',
                    ContractName: '',
                    fullname: '0x5f2fccab3c1e6721f620bdd831e2caee72ec22fe' },
                 children: 
                  [ { name: '0x5b79',
                      attributes: 
                       { value: '30.539 ETH',
                         timestamp: '2019-07-13 11:39:21',
                         txHash: '0x644383781a04d22123c35a3b2d861db5a470cb4e4c641f5b332a824c7fd8207b',
                         destination: '0x5b7934cdbb5cd076bd486e0f017aeb777bf0d04c',
                         ContractName: '',
                         fullname: '0x5f2fccab3c1e6721f620bdd831e2caee72ec22fe' } } ] } ] } ] } ] }
const scaleNode = (ethValue) => {
  return 5.5 / (1 + Math.exp(-ethValue))+3.5;
}

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,f
}) => {
  return (
  <g>
    {nodeDatum.attributes.ContractName ? 
    <circle r={35}></circle>
    : <circle r={45} className="contract-ele"></circle>
    }

    {/* <circle r={35}>
    </circle> */}
    {/* <text x="-20" y="5" className='toolTip' on>{nodeDatum.name}
    </text> */}
    {/* <text className={'tooltiptext '+ nodeDatum.name}>{nodeDatum.attributes?.fullname}</text> */}
    
    {/* <circle r={35}></circle> */}
    
    {/* `foreignObject` requires width & height to be explicitly set. */}
    {nodeDatum.attributes?.value &&
    <foreignObject {...foreignObjectProps}>
      <a target="_blank" onMouseOver={()=>{console.log(nodeDatum)}} href={"https://etherscan.io/tx/"+nodeDatum.attributes.txHash}>
      <div className="node" style={{ border: "1px solid black" }}>
        <b>Transaction:</b>
        <p>Value: <b>{nodeDatum.attributes?.value}</b></p>
        <p>Date: <b>{nodeDatum.attributes?.timestamp}</b></p>
        <p className="txHash">TX: <b>{nodeDatum.attributes?.txHash}</b></p>
  
      </div>
      </a>
      {/* {nodeDatum.children && nodeDatum.__rd3dag && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3dag.collapsed ? "Expand" : "Collapse"}
          </button>
        )} */}
    </foreignObject>
    }
    {nodeDatum.attributes &&
    <foreignObject {...f}>
      <div className='toolTip'>
        <a target="_blank" href={"https://etherscan.io/address/"+nodeDatum.attributes.fullname}>{nodeDatum.name}</a>
        <p className='tooltiptext'>{nodeDatum.attributes?.fullname}</p>
      </div>
    </foreignObject>
    }
  </g>
)};
const util = require('util')

export const OrgChartTree = ({chartData}) => {
  if(Object.keys(chartData).length === 0) {
    chartData = defaultData;
  }
  // console.log(util.inspect(chartData, {showHidden: false, depth: null, colors: true}))
  const nodeSize = { x: 470, y: 340 };
  const foreignObjectProps = { width: nodeSize.x-70, height: nodeSize.y, x: -410,y:-100 };
  const f = { width: 400, height: 75, x: -128,y:-20 };
//   var cyInstance = cytoscape({
//     container: document.getElementById('cy'),
//     layout: {
//         name: 'random'
//     },
//     elements: [ // your cy elements
//         { group: "nodes", data: { id: 'a1', name: 'a10' }, classes: 'l1' },
//         { group: "nodes", data: { id: 'a1', name: 'a10' }, classes: 'l1' },
//         { group: "nodes", data: { id: 'a1', name: 'a10' }, classes: 'l1' },
//         { group: "nodes", data: { id: 'a5', name: 'a5' }, classes: 'l2' }
//     ]
// });
// cyInstance.nodeHtmlLabel([{
//   query: '.l1',
//   valign: "top",
//   halign: "left",
//   valignBox: "top",
//   halignBox: "left",
//   tpl: function(data) {
//       return '<p class="cy-title__p1">' + data.id + '</p>' + '<p  class="cy-title__p2">' + data.name + '</p>';
//   }
// },
// {
//   query: '.l2',
//   tpl: function(data) {
//       return '<p class="cy-title__p1">' + data.id + '</p>' + '<p  class="cy-title__p2">' + data.name + '</p>';
//   }
// }
// ]);

  return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '80%', height: '90vh' }}>
          <Tree 
          data={chartData} 
          nodeSize={nodeSize}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps,f })
          }
          pathFunc="elbow"
          />
          {/* <CytoscapeComponent elements={elements} style={ { width: '600px', height: '600px' } } />; */}
      </div>
  );
}