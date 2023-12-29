import React, { useState, useEffect } from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, Search, Upload} from "antd";
import {
    UploadOutlined

  } from "@ant-design/icons";


function SuperAdmin() {
    const { Search } = Input;
    const onSearch = (value) => console.log(value);

    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
          if (file.status !== 'uploading') {
            console.log(file, fileList);
          }
        },
        defaultFileList: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'uploading',
            url: 'http://www.baidu.com/xxx.png',
            percent: 33,
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500',
            // custom error message to show
            url: 'http://www.baidu.com/zzz.png',
          },
        ],
      };
    const [defautValue, setDefaultValue] = useState({fullName: "Dominic Ighedosa", email: "dominic@finpromptu.com"})
    // useEffect(() => {
    // //    console.log("test")
    // //    setDefaultValue({
    // //     fullName: "Dominic Ighedosa", 
    // //     email: "dominic@finpromptu.com"
    //    } )
    //   });

  return (

    <>
        <Search placeholder="Search Policy" onSearch={onSearch} enterButton />
        <br></br>
        <br></br>
       
       <Form
          autoComplete="off"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 13 }}
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="policyName"
            label="Policy Name"
            
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Orphan Resources" value="Dominic Ighedosa"/>
          </Form.Item>
          <Form.Item
            name="policyName"
            label="Description"
            
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Orphan Resources" value="Dominic Ighedosa"/>
          </Form.Item>

          
         
          <Form.Item name="cloudAccount" label="Cloud Account" requiredMark="optional">
          <Input placeholder="AWS 123456789" value="AWS 123456789" defaultValue={"AWS"} disabled/>
            
          </Form.Item>

          <Form.Item name="yamel" label="Upload YAML" requiredMark="optional">
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        

          {/* <Form.Item
            name="agreement"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "I have verified that  this is a valid user."
                      ),
              },
            ]}
          >
            <Checkbox>
              {" "}
              Agree to our <a href="#">Terms and Conditions</a>
            </Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 19 }}>
            <Button block type="primary" htmlType="submit">
              Create Policy
            </Button>
          </Form.Item>
        </Form>
        
        </>
  );
}

export default SuperAdmin;