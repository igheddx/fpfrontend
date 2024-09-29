
import React from 'react'
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, Typography, Table } from "antd";
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../../Store';
import useEncryptDecrypt from '../../../apis/useEncryptDescrypt';
import axios from "axios";
import useBearStore from "../../../state/state";
import useStore from "../../../state/state";

function CreateProfileStatus() {
    const [profileData, setProfileDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()


    
      
    const API = axios.create({
    });
    useEffect( () => {
        //makeGetApiCall()
    });


    // function createData(id, name, grouop, region, provider, status) {
    //     return { id, name, grouop, region, provider, status };
    //   }
    const makeGetApiCall = async (e) => {
       // e.preventDefault();
        setLoading(true)
        let response = await API.get("http://localhost:3000/profile?status=pending").catch((err) => {
            setError(err);
            console.log("Here " + err.response.data)
        }).finally(() => {
            setLoading(false);
        });

        //const profile = response.data.find((prof) => prof.status  === "pending");
        setProfileDataSource(response.data)
        //console.log(JSON.stringify(response.data))
        //authenticate(response.data)
    }

    const columns = [
    
        {
            title: "First Name",
            dataIndex: "firstName"
        },
        {
            title: "Last Name",
            dataIndex: "lastName"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Status",
            dataIndex: "status"
        },
   


        
    ]
    const dataSource = [
        { 
            fullname: "Dominic Ighedosa", 
            email: "dominic@finpromptu.com", 
            provider: "AWS",
            status: "Pending Acceptance"
        },
        { 
            fullname: "Richard Stephens", 
            email: "richard@finpromptu.com", 
            provider: "AWS",
            status: "Pending Acceptance"
        },
        { 
            fullname: "Steve Shickles", 
            email: "pending@finpromptu.com", 
            provider: "AWS",
            status: "Pending Acceptance"
        },
        { 
            fullname: "Matthias D'Autremont", 
            email: "matthias@finpromptu.com", 
            provider: "AWS",
            status: "Expired"
        },
        { 
            fullname: "Karl Jablonski", 
            email: "karl@finpromptu.com", 
            provider: "AWS",
            status: "Expired"
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
    
        <Typography.Title level={5}>New Profile Status</Typography.Title>
        <Table
        columns={columns}
        
        dataSource={profileData}
        pagination={true}
        ></Table>
    </>
    );
}

export default CreateProfileStatus