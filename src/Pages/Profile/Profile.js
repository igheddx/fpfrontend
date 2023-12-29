


import React from 'react';
import { Button, Form, Input, InputNumber,Typography } from 'antd';


function Profile () {

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = (values) => {
    console.log(values);
  };

  
  return (

  <><Typography.Title level={4} >My Profile</Typography.Title>
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 700 }}
    validateMessages={validateMessages}
  >
    <Form.Item name={['user', 'name']} label="Full Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'password']} label="New Password" rules={[{ type: 'password' }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'password']} label="Confirm Password" rules={[{ type: 'password' }]}>
      <Input />
    </Form.Item>
   
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
    )
};

export default Profile;