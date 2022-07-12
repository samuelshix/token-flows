import { Position, Handle, useStore } from 'react-flow-renderer';
import React, { memo } from 'react';
// const handleStyle = { left: 10 };
// const edges = useStore((state) => state.edges);

export default memo(({data, isConnectable}) => {
    return(
        <>
        <Handle
        type="target"
        position="top"
        style={{ display: 'none' }}
        isConnectable={isConnectable}/>
        <div className='UserNode'>
          <div className='toolTip' htmlFor="text">
            <a target="_blank" href={"https://etherscan.io/address/"+data.label}>{data.label.slice(0,6)}</a>
            <p className='tooltiptext'>{data.label}</p>
          </div>
          
        </div>
        <Handle type="source" position='bottom' id="b"
        style={{ display: 'none' }}
        isConnectable={isConnectable}
        />
      </>
    )
});
