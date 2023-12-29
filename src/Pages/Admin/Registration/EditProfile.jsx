
import React, { useState, useEffect } from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, Search} from "antd";

function EditProfile() {
    const { Search } = Input;
    const onSearch = (value) => console.log(value);


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
        <Search placeholder="search profile" onSearch={onSearch} enterButton />
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
            name="fullName"
            label="Full Name"
            value= {"Dominic Ighedoa"}
            
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
            <Input placeholder="Dominic Ighedosa" defautValue = {"Dominic Ighedosa"} value="Dominic Ighedosa"/>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
    
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="dominic@finpromptu.com" />
          </Form.Item>

         
          <Form.Item name="cloudAccount" label="Cloud Account" requiredMark="optional">
          <Input placeholder="AWS 123456789" value="AWS 123456789" defaultValue={"AWS"} disabled/>
            
          </Form.Item>

          <Form.Item name="accessLevel" label="Roles" requiredMark="optional">
            <Select placeholder="Select access  level" mode='multiple'>
              <Select.Option value="viewer">Viewer</Select.Option>
              <Select.Option value="approver">Approver</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="superAdmin">Super Admin</Select.Option>
              <Select.Option Select value="finpromptAdmin">Finprompt Admin</Select.Option>
              
            </Select>
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
              Update Profile
            </Button>
          </Form.Item>
        </Form>
        
        </>
  );
}

export default EditProfile;