import React from 'react'
import { Card, Space, Statistic, Table, Typography, Avatar, Rate, Button, Select } from "antd";
import {useEffect, useState} from "react";



const approvers = [
    {name:'Richard Stephens', profileId: 1, title: 'Engineer'},
    {name:'Karl Jablonski', profileId: 2, title: 'Engineer'},
    {name:'Todd Nelson', profileId: 3, title: 'Engineer'},
    {name:'Steve Shickles', profileId: 4, title: 'Engineer'},
    {name:'Matthias DAutremont', profileId: 5, title: 'Engineer'},
    {name:'Adam Nagle', profileId: 6, title: 'Engineer'},
    {name:'Mahathi Krishna', profileId: 7, title: 'Engineer'},
    {name:'Dominic Ighedosa', profileId: 8, title: 'Engineer'},
    {name:'Donald Trump', profileId: 9, title: 'President'},
    {name:'Joe Biden', profileId: 10, title: 'President'},
    {name:'Barack Obama', profileId: 11, title: 'President'},
   
]



function Approvers() {
    let [approverName, setApproverName] = useState("");
    const [approversSelected, setApproversSelected] = useState([])

    const getApprover =(e) => {
      setApproverName(e)
    }
  return (
    <Select 
        placeholder='Select Approvers' 
        value={approverName}
        maxTagCount={3}
        mode="multiple"
        onChange={getApprover}
        allowClear
        style={{width:'100%'}}
            >
                {approvers.map((approver, key) => {
                return  <Select.Option value={approver.name} key={key} onChange={(e) => setApproversSelected(e.target.value)} >{approver.name} </Select.Option>
        
                })}
            
    </Select> 
  )
}

export default Approvers