import React, { useEffect } from "react";
import { Alert, Flex, Spin } from "antd";
const contentStyle: React.CSSProperties = {
  padding: 50,
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
export function Loading() {
   
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: 'white',
        width: '100%',
        height: '100vh',

      }}>
      
          
      <div style={{ width: '120px', height: '120px' }}> {/* Увеличение размеров обертки */}
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>

        
      </div>
    </>
  );
}
