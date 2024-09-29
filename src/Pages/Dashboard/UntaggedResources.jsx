
import React from 'react'
import { Table, Typography } from "antd";

function UntaggedResources(props) {

   
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
            title: "Id",
            dataIndex: "resourceId"
        },
        {
            title: "Name",
            dataIndex: "resourceName"
        },
        {
            title: "Status",
            dataIndex: "statusString"
        },

        {
            title: "Type",
            dataIndex: "resourceType"
        },
        
        {
            title: "Tagged",
            dataIndex: "isTagged"
        },
        {
            title: "Orphaned",
            dataIndex: "isOrphaned"
        },
        {
            title: "Use",
            dataIndex: "isUnderutilized"
        }
        
    ]
    const dataSource = [
        { 
            id: "AWS000123", 
            name: "EC2X12", 
            group: "EC2", 
            region: "South", 
            provider: "AWS", 
            status: "Status"
        },
        {
            id: "AWS000001", 
            name: "SeX00", 
            group: "S3", 
            region: "East", 
            provider: "AWS", 
            status: "Status"
        },
        {
            id:  "AWS000002", 
            name: "EC2X10", 
            group: "EC2", 
            region: "North", 
            provider: "AWS", 
            status: "Status"
        },
        {
            id: "AWS000112", 
            name: "R52X12", 
            group: "Route 53", 
            region: "South", 
            provider: "AWS", 
            status: "Status"
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
        <Typography.Text>Untagged Resources</Typography.Text>
        <Table
        columns={columns}
        
        dataSource={props.data}
        pagination={true}
        ></Table>
    </>
    );
}

export default UntaggedResources