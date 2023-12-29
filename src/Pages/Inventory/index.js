import { Card, Space, Statistic, Table, Typography, Avatar, Rate, Button } from "antd";
import {useEffect, useState} from "react";
import {getInventory} from "../../API";

import { Select } from "antd";

function Inventory() {

    const policies = ['Orphan Resources', 
    'Untagged Resources', 
    'Low Utilization',
    'Delete Unencrypte',
    'Terminate Unpatchable Instances',
    'Notify on Lambda Errors',
    'Block Public S3 Object ACLs'

    ]

    const approvers = [
        'Richard Stephens',
        'Karl Jablonski',
        'Todd Nelson',
        'Steve Shickles',
        'Matthias DAutremont',
        'Adam Nagle',
        'Mahathi Krishna',
        'Dominic Ighedosa'
    ]
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)
        getInventory().then(res=>{
            setDataSource(res.products)
            setLoading(false);
        })
    }, []);
    
    return (

        <Space size={20} direction="vertical">
           
            <div>
                <h4>Run Policy</h4>
                <Select placeholder='Select Policy to Run' style={{width:'50%'}}>
                    {policies.map((policy, index)=>{
                        return <Select.Option key={index} value={policy}>{policy}</Select.Option>
                    })}
                </Select>

                <h4>Approvers</h4>
                <Select 
                    placeholder='Select Approvers' 
                    mode='multiple' 
                    maxTagCount={3}
                    allowClear
                    style={{width:'50%'}}>
                    {approvers.map((approver, index)=>{
                        return <Select.Option key={index} value={approver}>{approver}</Select.Option>
                    })}
                </Select>
                
                <div>
                <Button 
                    type='Primary'
                    block
                >Continue
                
                </Button>
                </div>
            </div>

            <Typography.Title level={4} >Inventory</Typography.Title>
            <Table 
            loading = {loading}
            columns={[
                {
                    title: "Thumbnail",
                    dataIndex: "thumbnail",
                    render:(link)=>{
                        return <Avatar src={link} />
                    },
                },
                {
                    title: "Title",
                    dataIndex: "title",
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    render:(value)=><span>${value}</span>,
                },
                {
                    title: "Rating",
                    dataIndex: "rating",
                    render:(rating)=><Rate value={rating} allowHalf disabled/>,
                },
                {
                    title: "Stock",
                    dataIndex: "stock",
                },
               
                {
                    title: "Brand",
                    dataIndex: "brand",
                },
                {
                    title: "Category",
                    dataIndex: "category",
                },
            ]}
            dataSource={dataSource}
            pagination={{
                pageSize: 5,
            }}
            
            ></Table>

        </Space>
    );
}

export default Inventory