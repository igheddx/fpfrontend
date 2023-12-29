import React from 'react'
import { Table, Typography } from "antd";
import { useState, useEffect } from 'react'
function OrphanResources(props) {
    // const [dataSource, setDataSource] = useState([])
    // const [loading, setLoading] = useState(false)
    //const [resource, setResource] = useState([])
    // const resources = [
    // {
    //     resourceId: 0,
    //     customerId: 0,
    //     cloudAccountId: "",
    //     resourceName: "",
    //     isTagged: "",
    //     isOrphaned: "",
    //     utilization: 0,
    //     state: 1,
    //     instantType: "",
    //     costSavings: 0
    // }];

    // const list =[];
    // useEffect(  () => {
    //     console.log("props.data.length =" + props.data.length )
    //     console.log("resource =" + resource.length )
        
    //     if(resource.length == 0 && props.data.length > 0 && props2.type=="orphan"){
    //         console.log("Nayla")
    //         const resourceData  =  
    //             props.data.forEach((data2, index) => {
    //                 list.push (
    //                     {
    //                         resourceId: data2.resourceId,
    //                         customerId: data2.customerId,
    //                         cloudAccountId: data2.cloudAccountId,
    //                         resourceName: data2.resourceName,
    //                         isTagged: data2.isTagged ? "true" : "false",
    //                         isOrphaned: data2.isOrphaned ? "true" : "false",
    //                         utilization:data2.utilization,
    //                         state: data2.state ,
    //                         instantType: data2.instantType,
    //                         costSavings: data2.costSavings
    //                     }
                       
                
    //                 )
    //             })
                
                
                //return list;
            
               
            
            //{
                // resources.resourceId = data2.resourceId
                // resources.customerId = data2.customerId
                // resources.cloudAccountId = data2.cloudAccountId
                // resources.resourceName = data2.resourceName
                // resources.isTagged = data2.isTagged ? "true" : "false"
                // resources.isOrphaned = data2.isOrphaned ? "true" : "false"
                // resources.utilization = data2.utilization
                // resources.state = data2.state 
                // resources.instantType = data2.instantType
                // resources.costSavings = data2.costSavings
                
            //});

    //         setResource(list); 
    //     }
    // }, [resource]);



    // function createData(id, name, grouop, region, provider, status) {
    //     return { id, name, grouop, region, provider, status };
    //   }

   
   // console.log("resourdata =" + JSON.stringify(resource))

   

    

  

   //console.log("orphan component data " + JSON.stringify(props.data))
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
            title: "Type",
            dataIndex: "instantType"
        },
        {
            title: "CustomerId",
            dataIndex: "customerId"
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
            dataIndex: "utilization"
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
        
        <Typography.Text>Orphan Resources</Typography.Text>
        <Table
        columns={columns}
        
        dataSource={props.data}
        pagination={true}
        ></Table>
    </>
    );
}

export default OrphanResources