import React from 'react'
import { Alert, Space } from "antd";

function Info() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
   
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
   
  </Space>
  )
}

export default Info

