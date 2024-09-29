//import React from 'react'
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

function ResourceTable (props) {

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



    const columns = [
        {
            title: "Id",
            dataIndex: "resourceId",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.resourceId - b.resourceId,
        },
        {
            title: "Name",
            dataIndex: "resourceName",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.resourceName - b.resourceName,
        },
        {
            title: "Status",
            dataIndex: "statusString",
            filters: [
                {
                  text: 'Running',
                  value: 'Running',
                },
                {
                  text: 'Stopped',
                  value: 'Stopped',
                },
        
              ],
            onFilter: (value, record) => record.statusString.indexOf(value) === 0,
        },

        {
            title: "Type",
            dataIndex: "resourceType",
            defaultSortOrder: 'descend',
            filters: [
                {
                  text: 'ec2:volume',
                  value: 'ec2:volume',
                },
                {
                  text: 's3:bucket',
                  value: 's3:bucket',
                },
                {
                  text: 'lambda:function',
                  value: 'lambda:function',
                },
              ],
            onFilter: (value, record) => record.resourceType.indexOf(value) === 0,
            sorter: (a, b) => a.resourceType - b.resourceType,
        },
        
        // {
        //     title: "Tagged",
        //     dataIndex: "isTagged"
        // },
        // {
        //     title: "Orphaned",
        //     dataIndex: "isOrphaned"
        // },
        // {
        //     title: "Use",
        //     dataIndex: "isUnderutilized"
        // }
        
    ]
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

    return (
        <>
        <Typography.Text>Untagged Resources</Typography.Text>
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={true}
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
        ></Table>
    </>
    );

}

export default ResourceTable;