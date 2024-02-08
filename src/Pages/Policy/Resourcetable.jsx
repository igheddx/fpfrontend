import React, { useState } from 'react';
import { Table } from 'antd';


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
        dataIndex: "isUderutilized"
    },
];
// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
function Resourcetable(props) {
    const [alreadySelectedRows, setAlreadySelectedRows] = useState([])


    const [select, setSelect] = useState({
        selectedRowKeys: [],
        loading: false
      });
    
      console.log("selectedRowKeys", select);
    
      const { selectedRowKeys, loading } = select;
    
      const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
          setSelect({
            ...select,
            selectedRowKeys: selectedRowKeys
          });
        }, selections: [
            Table.SELECTION_NONE,
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'even',
                text: 'Select Event Rows',
                onSelect: (allKeys) => {
                    const selectedKeys = allKeys.filter(key=> {
                        return key %2 == 0
                    })
                    setAlreadySelectedRows(selectedKeys)
                }

            }
        ]
      };

 

  return (
    <>
   
  <Table 
    rowSelection={rowSelection}
    columns={columns} 
    dataSource={props.data} 
    rowKey = {(record) => record.resourceId}


    
    > </Table></>);
};
export default Resourcetable;