
import { Avatar, List, Checkbox, Form,  Button } from 'antd';
import React from 'react';
import  { CheckboxChangeEvent } from 'antd/es/checkbox';


function DefaultSettings() {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

    const data = [
        {
          title: 'Orphan Resources',
        },
        {
          title: 'Low Utilization',
        },
        {
          title: 'Untagged Resources',
        },
        {
          title: 'Cost Savings',
        },
        {
            title: 'Approvals',
        },
        {
            title: 'Policy Ratings',
        },
        {
            title: 'Top-10 Policy',
        },
      ];

    const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    };

    return (
        <>
        <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
        <List.Item>
            <List.Item.Meta
            children={<Checkbox onChange={onChange}></Checkbox>}
            avatar={<Checkbox onChange={onChange}></Checkbox>}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
        </List.Item>
        
        )}
        />

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
      </>
    )

};
export default DefaultSettings;