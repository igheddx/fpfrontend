
import React from 'react'
import { Table, Typography } from "antd";

function CostSavings(props) {
    // const [dataSource, setDataSource] = useState([])
    // const [loading, setLoading] = useState(false)
    // useEffect( () => {
    //     setLoading(true)
    //     getOrders().then(res=>{
    //         setDataSource(res.products.splice(0,3));
    //         setLoading(false);
    //     });
    // }, []);


    // function createData(id, name, grouop, region, provider, status) {
    //     return { id, name, grouop, region, provider, status };
    //   }

    const columns = [
    
        {
            title: "CustomerId",
            dataIndex: "customerId"
        },

        {
            title: "Resource Type",
            dataIndex: "resourceType"
        },
        {
            title: "Estimated Savings",
            dataIndex: "costSavings"
        },
     

        
    ]
    const dataSource = [
        { 
            resourceGroup: "EC2", 
            totalSavings: "$832,000", 
            region: "South", 
            provider: "AWS"
        },
        { 
            resourceGroup: "S3", 
            totalSavings: "$250,000", 
            region: "South", 
            provider: "AWS"
        },
        { 
            resourceGroup: "RDS", 
            totalSavings: "$150,000", 
            region: "South", 
            provider: "AWS"
        },
        { 
            resourceGroup: "VPC", 
            totalSavings: "$1,250,000", 
            region: "South", 
            provider: "AWS"
        },
        { 
            resourceGroup: "CloudFormation", 
            totalSavings: "$90,000", 
            region: "South", 
            provider: "AWS"
        },
       
        // {"AWS000101", "CLF2X12", "CloudFormation", "South", "AWS", "Status"},
        // {"AWS000999", "LMBX12", "Lambda", "South", "AWS", "Status"},
        // {"AWS000134", "CLFX12", "CloudFormation", "South", "AWS", "Status"},
        // {"AWS000004", "RD0X12", "RDS", "South", "AWS", "Status"},
        // {"AWS000005", "EC2B12", "EC2", "South", "AWS", "Status"},
        // {"AWS000006", "S30X00", "S3", "East", "AWS", "Status"},
        // {"AWS000007", "EC2000", "EC2", "North", "AWS", "Status"},
        // {"AWS000008", "CLF009", "CloudFormation", "South", "AWS", "Status"},
        // {"AWS000009", "VPC13", "VPC", "South", "AWS", "Status"},
        // {"AWS000100", "LMB992", "Lambda", "South", "AWS", "Status"},
        // {"AWS000223", "EC2X12", "EC2", "South", "AWS", "Status"},
        // {"AWS000323", "RD2X12", "RDS", "South", "AWS", "Status"},


      ];

    return (
        <>
        <Typography.Text>Cost Savings</Typography.Text>
        <Table
        columns={columns}
        
        dataSource={props.data}
        pagination={false}
        ></Table>
    </>
    );
}

export default CostSavings