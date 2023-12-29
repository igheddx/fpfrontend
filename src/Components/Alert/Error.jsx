import React from 'react'
import { Alert, Space } from "antd";

function Error() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
  
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </Space>
  )
}

export default Error


