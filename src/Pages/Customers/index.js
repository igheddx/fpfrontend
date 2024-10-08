import { Card, Space, Statistic, Table, Typography, Avatar, Rate } from "antd";
import {useEffect, useState} from "react";
import {getCustomers} from "../../apis";

function Customers() {

    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setLoading(true)
        getCustomers().then(res=>{
            setDataSource(res.users)
            setLoading(false);
        })
    }, []);
    
    return (

        <Space size={20} direction="vertical">
            <Typography.Title level={4} >Customers</Typography.Title>
            <Table 
            loading = {loading}
            columns={[
                {
                    title: "Photo",
                    dataIndex: "image",
                    render:(link)=>{
                        return <Avatar src={link} />
                    },
                },
                {
                    title: "First Name",
                    dataIndex: "firstName",
                },
                {
                    title: "Last Name",
                    dataIndex: "lastName",
                    render:(value)=><span>${value}</span>,
                },
                {
                    title: "Email",
                    dataIndex: "email",
             
                },
                {
                    title: "Phone",
                    dataIndex: "phone",
                },
               
                {
                    title: "Address",
                    dataIndex: "address",
                    render:(address)=>{
                        return <span>{address.address}, {address.city}</span>
                    }
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

export default Customers