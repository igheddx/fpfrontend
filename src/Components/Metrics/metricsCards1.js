//import React from 'react'
import { useEffect, useState,  useContext } from "react";
import useAxios from '../../hooks/useAxios'
//import { Header } from 'antd/es/layout/layout';
import axios from '../../apis/getResources';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  TagOutlined,
  ArrowDownOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { Card, Space, Statistic, Table, Typography } from "antd";
import ResourceTable from '../General/ResourceTable';

const MetricsCards1 = () => {


    const [resourceData, setResourceData] = useState([]);
    const [metricType, setMetricType] = useState('');

    const resourceList1 =[];

    const token = sessionStorage.getItem('accessTokenData');
    let xApiKeyWithUserName = sessionStorage.getItem('xapikey')  //with user
    let xApiKeyDefault = sessionStorage.getItem('xapikeyNoAccessToken') //no username

    console.log("@@TOKEN IGHEDOSA ==", token)

    let xApiKey = ''
    if (xApiKeyWithUserName != "" ) {
        xApiKey = xApiKeyWithUserName
        console.log("NO USER NAME xAPIKEY =", xApiKey)
    } else {
        xApiKey =  xApiKeyDefault
        console.log("OGIE MAIN WITH USER NAME xAPIKEY =", xApiKey)
    }


    const getMetricsDetails = async (type, response) => {

      console.log("MY RESOURCE TYPE =", type)
      console.log("MY DATA  =",  JSON.stringify(response))
      //if (type =! "") {
        response.forEach((data2, index) => {
          data2.isTagged ? (console.log("isTagged ==True== ResourceId", data2.resourceId,)) : (console.log("isTagged ==False== ResourceId", data2.resourceId,)) 
  
          resourceList1.push (
            {
                resourceId: data2.resourceId,
                customerId: data2.customerId,
                cloudAccountId: data2.accountId,
                resourceName: data2.resourceName,
                isTagged: data2.isTagged ? "true" : "false",
                isOrphaned: data2.isOrphaned ? "true" : "false",
                isUnderutilized:data2.isUnderutilized ? "true" : "false",
                statusString: data2.statusString,
                resourceType: data2.resourceType,
                //costSavings: data2.costSavings
            }
        )
        setMetricType(type)
        setResourceData(resourceList1)
        });

        
      //}
      
        
        /*console.log("TIM HIERE ==", data2.isTagge )
        switch(type) {
            case 'untagged':
            if (data2.isTagged == false ) {
                
                resourceList1.push (
                    {
                        resourceId: data2.resourceId,
                        customerId: data2.customerId,
                        cloudAccountId: data2.accountId,
                        resourceName: data2.resourceName,
                        isTagged: data2.isTagged ? "true" : "false",
                        isOrphaned: data2.isOrphaned ? "true" : "false",
                        isUnderutilized:data2.isUnderutilized ? "true" : "false",
                        statusString: data2.statusString,
                        resourceType: data2.resourceType,
                        //costSavings: data2.costSavings
                    }
                )

                console.log("DOMINIC IGHEDOSA - TAGGED",data2.isTagged ? "true" : "false")
            }
            case 'orphan':
                if (data2.isOrphaned == true) {
                    resourceList1.push (
                        {
                            resourceId: data2.resourceId,
                            customerId: data2.customerId,
                            cloudAccountId: data2.accountId,
                            resourceName: data2.resourceName,
                            isTagged: data2.isTagged ? "true" : "false",
                            isOrphaned: data2.isOrphaned ? "true" : "false",
                            isUnderutilized:data2.isUnderutilized ? "true" : "false",
                            statusString: data2.statusString,
                            resourceType: data2.resourceType,
                            //costSavings: data2.costSavings

                            
                        }



                    )
                    console.log("DOMINIC IGHEDOSA - ORPHAN ",data2.isOrphaned ? "true" : "false")
                }

            
            case 'lowuse':
                if (data2.isUnderutilized == true) {
                    resourceList1.push (
                        {
                            resourceId: data2.resourceId,
                            customerId: data2.customerId,
                            cloudAccountId: data2.accountId,
                            resourceName: data2.resourceName,
                            isTagged: data2.isTagged ? "true" : "false",
                            isOrphaned: data2.isOrphaned ? "true" : "false",
                            isUnderutilized:data2.isUnderutilized ? "true" : "false",
                            statusString: data2.statusString,
                            resourceType: data2.resourceType,
                            //costSavings: data2.costSavings

                            
                        }
                    )
                    console.log("DOMINIC IGHEDOSA - LOW USE",data2.isUnderutilized ? "true" : "false")
                }

            default:

          }*/
       
    
    }
    


    function DashboardCard({ title, value, icon, link }) {
      return (
        <Card>
          <Space direction="horizontal">
            {icon}
            <Statistic title={title} value={value} extra={link}/>
            
          </Space>
          
        </Card>
      );
    }


    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/api/Resource/all/5/0', 
        //timeout:  5000,
        requestConfig: {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                'X-Api-Key': xApiKey,  //"CpUhVo+PeX1fhfxzSFLPdM637r2a5jDoAFnx5UyOORvePno1qvpcoeDmo56p04X9" //xApiKey //xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
         
             }
        }
    })

    console.log("This is me ==", response.length)
  return (
    <div>
     
      

        <Space size={2} direction="vertical">
  
            <Space direction="horizontal">

            <Link onClick={e => {getMetricsDetails("untagged",response.filter(data => data.isTagged === false))}} > 
                    <DashboardCard 
                        icon={
                            <TagOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,255,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            } }
                            />
                        }
                        title={"Untagged Resources"} 
                        value={response.filter(data => data.isTagged === false).length }
                    />
                 </Link>
                <Link onClick={e => {getMetricsDetails("allResources",response);}} >
                    <DashboardCard 
                        icon={
                            <MinusCircleFilled
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            } }
                            />
                        }
                        title={"Total Resource Count"} 
                        //link={<a href="#">Detail</a>}
                        value={response.length}
                        
                    />
                </Link>
                
                <Link onClick={e => getMetricsDetails("",[])} >
                    <DashboardCard 
                        icon={
                            <ArrowDownOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(0,255,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            } }
                            />
                        }
                        title={"% Untagged"} 
                        value={((response.filter(data => data.isTagged === false).length/response.length)*100).toLocaleString(undefined, { maximumFractionDigits: 0 }) + "%" }
                    />
                </Link>
    
            </Space>
          </Space>
          
          <Space size={8} direction="vertical">
          
          <br></br>
          {loading && <p>Loading...</p>}
          { metricType == "untagged" ? <ResourceTable data={resourceData}  />  : null}
          { metricType == "allResources" ? <ResourceTable data={resourceData}  />  : null}
          </Space>
          <article>

            {/* <h2>data</h2>
           
            <p>Value ResourceId = {response.region}</p>
            {!loading && error && <p className="errMsg">  {error}</p>}
            {!loading && !error && response && <p>{response}</p>}
            {!loading && !error && !response && <p>no data</p>} */}


            {/* <ul>
            {response.map((item, index) => (
              <li key={index}>{item.resourceName}</li>
            ))}
            </ul> */}

            {/* {<p>Record = {response.length}</p>}
            {<p>Data is not tagged = {response.filter(data => data.isTagged === false).length} </p>} */}

          </article>
        
          
           
    </div>
  )
}

export default MetricsCards1