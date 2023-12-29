


import './index.css';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space } from "antd";
import {useState} from "react";

function Login2()  {
  
  const handleFormSubmit = (values) => {
    const title = values.title;
    const content = values.content;
    console.log(title, content);
  };

  return (
   
    <div className="App">
    <header className="App-header">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => this.handleFormSubmit(values)}
          onFinishFailed={(values) => this.handleFormSubmit(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
      
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
      
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        </header>
        </div>
      );


}

export default Login2;