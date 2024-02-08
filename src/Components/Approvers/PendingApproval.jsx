
import { CaretRightOutlined, LikeFilled, LoadingOutlined} from '@ant-design/icons';
import { Collapse, theme, Typography, Button, Table, Modal, Input, Space, Descriptions, Spin, Tag, Dropdown, Badge } from 'antd'; 
import React from 'react';
import axios from "axios";

import useBearStore from '../../state/state';

import useStore from "../../state/state";
import { useState, useEffect, useContext, useRef } from 'react'
import { Context } from '../../Store';
import useEncryptDecrypt from '../../API/useEncryptDescrypt';
import { EditOutlined, DeleteOutlined, DislikeOutlined, DownOutlined, LikeOutlined, TwoToneColor, getTwoToneColor, setTwoToneColor} from "@ant-design/icons";
import Approvers from './Approvers';
import { setGlobalState, useGlobalState} from '../../state2';

const columns3X = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];
const data3X = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];
function PendingApproval () {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [displayData, setDisplayData] = useState(null)
  const [displayData2, setDisplayData2] = useState(null)
  const [open, setOpen] = useState(false);  


  const [approvalId, setApprovalId] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [policyDesc, setPolicyDesc] = useState('');
  const [submittedByName, setSubmittedByName] = useState('');
  const [submittedDateTime, setSubmittedDateTime] = useState('');
  const [policyStatus, setPolicyStatus] = useState('');
  const [approvalHeaderData, setApprovalHeaderData] = useState([]);
  const [apaprovalHeaderData2, setApprovalHeaderData2] = useState([]);
  const [myApprovalData, setMyApprovalData] = useState([])
  const [myPendingFinalApprovalData, setMyPendingFinalApprovalData] = useState([])
  const [mySubmissionsWorkflowData,  setMySubmissionsWorkflowData] = useState([])
  
 
  const [approvalHeaderDataMySubmissions, setApprovalHeaderDataMySubmissions] = useState([]);
  const [affectedResourcesData, setAffectedResourcesData] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [currentApprover, setCurrentApprover] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [policyData, setPolicyData] = useState([])
  const [policyDataApprove, setPolicyDataApprove] = useState([])
  const [policyDataReject, setPolicyDataReject] = useState([])


  const [resourceDetails, setResourceDetails] = useState([])
  const [resourceDetailsApprove, setResourceDetailsApprove] = useState([])
  const [resourceDetailsReject, setResourceDetailsReject] = useState([])

  const [state, setState] = useContext(Context);
  const [state1, setState1] = useState({
    data: null,
    loading: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
      {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        address: "John Address",
      },
      {
        id: 2,
        name: "David",
        email: "david@gmail.com",
        address: "David Address",
      },
      {
        id: 3,
        name: "James",
        email: "james@gmail.com",
        address: "James Address",
      },
      {
        id: 4,
        name: "Sam",
        email: "sam@gmail.com",
        address: "Sam Address",
      },
    ]);
    const columns2 = [
      {
        key: "1",
        title: "ID",
        dataIndex: "id",
      },
      {
        key: "2",
        title: "Name",
        dataIndex: "name",
      },
      {
        key: "3",
        title: "Email",
        dataIndex: "email",
      },
      {
        key: "4",
        title: "Address",
        dataIndex: "address",
      },
      {
        key: "5",
        title: "Actions",
        render: (record) => {
          return (
            <>
              <LikeOutlined
                onClick={() => {
                  processApproval(record, "");
                }}
                style={{ color: "#BB2525", marginLeft: 12, fontSize: "50px", }}
                twoToneColor="red"
              />
              <DislikeOutlined
                onClick={() => {
                  onDeleteStudent(record);
                }}
                style={{ color: "#BB2525", marginLeft: 12, fontSize: "50px", }}
                twoToneColor="red"
              />
            </>
          );
        },
      },
    ];

  const firstRenderRef = useRef(false);
  const [availableCloudAccounts, setAvailableCloudAccounts] = useState([]);
  const [activeCloudAccountId, setActiveCloudAccountId] = useState(0);
  const [profileId, setProfileId] = useState();
  const [spinning, setSpinning] = useState(false);
  const currentAccountId = useGlobalState("accountId");
  const currentAccountName = useGlobalState("accountName");
  const defaultAccountId = useGlobalState("defaultAccountId");



  let accountId2 = getAccountId(currentAccountId, defaultAccountId)
  let accessToken = sessionStorage.getItem('accessTokenData')
  let xapiKeyWithUserName = sessionStorage.getItem('xapikey')
  let customerRole = sessionStorage.getItem('roleData')

  const API = axios.create({
  });
  useEffect( () => {
      //getApprovals();
      

      let accountsData = sessionStorage.getItem('cloundAccountData')
      accountsData = JSON.parse(accountsData)
      setAvailableCloudAccounts(accountsData)

      let myProfileId = sessionStorage.getItem('profileId')
      console.log("MY PROFILE =", myProfileId)
      //myProfileId = JSON.parse(myProfileId)
      setProfileId(myProfileId)

      if (accountsData.length == 1) {
        setActiveCloudAccountId(accountsData.id)
      }

      console.log("CloudAccoun =", accountsData)

      setTwoToneColor('#eb2f96'); //not sure what this is doing
      getTwoToneColor(); // #eb2f96
     
      if (firstRenderRef.current) {
        getApproverApprovalsDetails()
        console.log("Block only runs AFTER initial render");
        //getApproverApprovalsDetails(); //call this method to get the list of approval requests that I am an approver for
        //getMyPolicyApprovalSubmissions(); //call this method to get the list of submissions that i have - may need to filter by role in the future
      } else {
        firstRenderRef.current = true;
        
      }

     

  },[]);


  useEffect (() =>{
    //refreshMetrics()
    let accountId = getAccountId(currentAccountId, defaultAccountId)

    setActiveCloudAccountId(accountId)
    console.log("default account Me ==", defaultAccountId)
   
    console.log("customer role =", customerRole)
    if (customerRole =="Customer") {
      console.log("getworkflow data")
      getWorkflowData()
    }
  }, [accountId2])



  
  
  /*use this function to determine when to use the default AccountId or the selected accountId*/
  function getAccountId(currentAccountId, defaultAccountId) {
    //const result = Math.floor(Math.random() * number);
     //setLoading(true)
     let accountId = null;
     let myDefaultAccountId = null;
     let myCurrentAccountId = null;
     /*if the defaultAccountId is not 0 then use that to pull the metrics else
     use the value from the dropdown selection*/
     console.log("BIGcurrent AccountId=", currentAccountId)
     console.log("BIG default AccountId==", defaultAccountId )
     

     /*extract defaultAccountId from object*/
     defaultAccountId.map((d1, key) =>{
         console.log("BIG my key==", key)
         if (key == 0){
             myDefaultAccountId  = d1
         }
     })

      /*extract AccountId from object*/
     currentAccountId.map((d1, key) =>{
         console.log("BIGmy key==", key)
         if (key == 0){
             myCurrentAccountId = d1
         }
     })


     if (myDefaultAccountId != 0) {
 
         accountId = myDefaultAccountId;
         console.log("BIG DEFAULT ACCOUNT==", accountId )
     } else {
        

         accountId = myCurrentAccountId 
         console.log("BIG currentAccount==", accountId )
     }
    return accountId ;
  }

  let approvalData = []

  const getApprovals = async (e) => {
    // e.preventDefault();
     setLoading(true)
     let response = await API.get("http://localhost:3000/policyApprovalHeader").catch((err) => {
         setError(err);
         console.log("Here " + err.response.data)
     }).finally(() => {
         setLoading(false);
     });

    // console.log("approval", JSON.stringify(response.data))
     response.data.map((data1) => {
        let displayStatus = ""
        if (data1.isApproved == false) {
          displayStatus = "Pending"
        }

        approvalData.push (

          {
            approvalId: data1.approvalId,
            policyName: data1.policyName,
            submittedByName: data1.submittedByName,
            submittedDate: data1.submittedDateTime,
            status: displayStatus,
            selection: "",
          }
        )
     })

     console.log("pending approval", JSON.stringify(approvalData))
     setDisplayData(approvalData)
 }


  
 //this column is for pending review and approval
  const columns = [
    {
      key: "7",
      title: "Id",
      dataIndex: "approvalId",
    },  
    {
          key: "1",
          title: "Policy",
          dataIndex: "policyName",
          render: (text, record) => <a  onClick={() => {
            getApprovalDetails(record);
          }}>{text}</a>,
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "workflowStatusString",
    },
    {
        key: "2",
        title: "Submitted By",
        dataIndex: "submittedByName",
        
    },
    {
        key: "3",
        title: "Submitted Date",
        dataIndex: "submittedDateTime",
    
    },
  

    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <LikeFilled
              onClick={() => {
                processApproval(record, "approve");
              }}
              style={{ color: '#29BB89', marginLeft: 12, fontSize: "30px", }}
              twoToneColor="green"
            />
            <DislikeOutlined
              onClick={() => {
                processApproval(record, "reject");
              }}
              style={{ color: "#D83A56", marginLeft: 12, fontSize: "30px", }}
              twoToneColor="yellow"
            />
          </>
        );
      },
    },
    ];
  //this column is for my approval submissions 
  const columnsSubmissions = [
    {
      key: "7",
      title: "Id",
      dataIndex: "approvalId",
    },  
    {
          key: "1",
          title: "Policy",
          dataIndex: "policyName",
          render: (text, record) => <a  onClick={() => {
            getApprovalDetails(record);
          }}>{text}</a>,
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "approverStatusString",
    },
    {
        key: "2",
        title: "Submitted By",
        dataIndex: "submittedByName",
        
    },
    {
        key: "3",
        title: "Submitted Date",
        dataIndex: "submittedDateTime",
    
    },

    ];

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };


  const hideModal = () => {
    setOpen(false);
  };

  const OkModal = () => {
      //submitApproval()
      setOpen(false);
  }




  
  const columnsAppHeader = [
    {
      title: 'Id',
      dataIndex: 'approvalId',
      key: "1",
    },
    {
      title: 'Policy Name',
      dataIndex: 'policyName',
      key: "2",
    },
    {
      title: 'Status',
      dataIndex: 'workflowStatusString',
      key: "3",
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedByName',
      key: "4",
    },
    {
      title: 'Submitted Date',
      dataIndex: 'submittedDateTime',
      key: "5",
    },
  ]

  // profileId: d1.profileId,
  // approverStatus: d1.status,
  // approverStatusString: d1.statusString,
  // approvalWorkflowId: d1.workflow.approvalWorkflowId,
  // policyId: d1.workflow.policyId,
  // resourceId: d1.workflow.resourceId,
  // accountId: d1.workflow.accountId,
  // workfowStatus: d1.workflow.status,
  // workflowStatusString: d1.workflow.statusString,
  // policyName: d1.workflow.policyName,
  // resourceName: d1.workflow.resourceName,
  // createdDateTime: d1.workflow.createdDate,

  const columnsMyApproval = [
    {
      key: "1",
      title: "Id",
      dataIndex: "approvalWorkflowId",
    },  
    {
      key: "2",
      title: "Policy",
      dataIndex: "policyName",
      render: (text, record) => <a  onClick={() => {
        getApprovalDetails(record);
      }}>{text}</a>,
    },
    {
      key: "3",
      title: "My Approval",
      dataIndex: "workflowStatusString",
      render: (tag) => {
        const color = tag.includes('Pending')?'gold':tag.includes('Rejected')?"red":tag.includes('Approve')?'green':''
        return <Tag color={color} key={tag}>{tag}</Tag>
      }
    },
    {
      key: "7",
      title: "Final Approval",
      dataIndex: "approverStatusString",
      render: (tag) => {
        const color = tag.includes('Pending')?'gold':tag.includes('Rejected')?"red":tag.includes('Approve')?'green':''
        return <Tag color={color} key={tag}>{tag}</Tag>
      }
    },
    {
      key: "4",
      title: "Resource Name",
      dataIndex: "resourceName",
      render: (text, record) => <a  onClick={() => {
        getApprovalDetails(record);
      }}>{text}</a>,
        
    },
    {
      key: "5",
      title: "Submitted Date",
      dataIndex: "createdDateTime",
    
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => {
                processApproval(record, "approve");
              }}
              style={{ color: '#29BB89', marginLeft: 12, fontSize: "15px", borderColor: "green" }}
             
            >
              Approve
              </Button>
            <Button
              onClick={() => {
                processApproval(record, "reject");
              }}
              style={{ color: "#D83A56", marginLeft: 12, fontSize: "15px", }}
              
              danger 
            >
              Reject
            </Button>
          </>
        );
      },
    },
  ];

  const columnsMyPendingApproval = [
    {
      key: "1",
      title: "Id",
      dataIndex: "approvalWorkflowId",
    },  
    {
          key: "2",
          title: "Policy",
          dataIndex: "policyName",
          render: (text, record) => <a  onClick={() => {
            getApprovalDetails(record);
          }}>{text}</a>,
    },
    // {
    //   key: "3",
    //   title: "My Approval",
    //   dataIndex: "approverStatusString",
    //   render: (tag) => {
    //     const color = tag.includes('Pending')?'gold':tag.includes('Rejected')?"red":tag.includes('Approve')?'green':''
    //     return <Tag color={color} key={tag}>{tag}</Tag>
    //   }
    // },
    {
      key: "7",
      title: "Final Approval",
      dataIndex: "workflowStatusString",
      render: (tag) => {
        const color = tag.includes('Pending')?'gold':tag.includes('Rejected')?"red":tag.includes('Approve')?'green':''
        return <Tag color={color} key={tag}>{tag}</Tag>
      }
    },
    {
        key: "4",
        title: "Resource Name",
        dataIndex: "resourceName",
        render: (text, record) => <a  onClick={() => {
          getApprovalDetails(record);
        }}>{text}</a>,
        
    },
    {
        key: "5",
        title: "Submitted Date",
        dataIndex: "createdDateTime",
    
    },
    
  ];


  const columnsMySubmissions = [
    {
      key: "1",
      title: "Id",
      dataIndex: "approvalWorkflowId",
    },  
    {
          key: "2",
          title: "Policy",
          dataIndex: "policyName",
          render: (text, record) => <a  onClick={() => {
            getApprovalDetails(record);
          }}>{text}</a>,
    },

    {
      key: "7",
      title: "Status",
      dataIndex: "approverStatusString",
      render: (tag) => {
        const color = tag.includes('Pending')?'gold':tag.includes('Rejected')?"red":tag.includes('Approve')?'green':''
        return <Tag color={color} key={tag}>{tag}</Tag>
      }
    },
    {
        key: "4",
        title: "Resource Name",
        dataIndex: "resourceName",
        render: (text, record) => <a  onClick={() => {
          getApprovalDetails(record);
        }}>{text}</a>,
        
    },
    {
        key: "5",
        title: "Submitted Date",
        dataIndex: "createdDateTime",
    
    },
    
  ];

  const columsApprovers = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: 1,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: 2,
    },
    {
      title: "Status",
      dataIndex: "isApproved",
      key: 3,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: 4,
    }
  ]
  const columsAffectedResources = [
    {
      title: "Id",
      dataIndex: "resourceId",
      key: "1",
    },
    {
      title: "Name",
      dataIndex: "resourceName",
      key: "2",
    },
    {
      title: "Type",
      dataIndex: "instantType",
      key: "3",
    }
  ]


 
 

  const processApproval  = async (data, type) => {
    showLoader();
    let approver = null;
    let isApproved = false;
    let status =  null;
    let profileUuid = null;
    let id = null;
    let approvalHeaderId =0;
    let headerData = [];
    let affectedResouce2 = [];

    let approvalType = null 
    console.log("my data =", data)
    console.log("my type =", type)
    console.log(" xapiKeyWithUserName =",  xapiKeyWithUserName)
    console.log(" accessToken =",  accessToken)
    

    console.log("workflowid = ", data.approvalWorkflowId)
  
    if (type == 'approve') {
      approvalType = 3
    } else if (type =='reject') {
      approvalType = 4 
    } else  {
      approvalType = 2
    }
    console.log("approvalType = ", approvalType)
    console.log("profileId = ", data.profileId)
    
    setLoading(true)
    let response = await API.post("/api/approval/update", 
    {
      workflowId: data.approvalWorkflowId,
      profileId: data.profileId,
      status: approvalType,
    },
    {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + accessToken,
            'X-Api-Key': xapiKeyWithUserName,
        }
    },
    
    ).catch((err) => {
        //setRegisterProfile(err);
        console.log("failed status == " + JSON.stringify(err.response.data));
    }).finally(() => {
        setLoading(false)
    });
    
    console.log("approval is done", JSON.stringify(response.data));

    //do this to refresh the data
    if (response.status == 200) {
      getApproverApprovalsDetails();
    }

  }


  const finalizeApproval = async (approvalId, approvalHeaderId, headerData) => {
    setLoading(true)
    let customerId = state.customerId;
    let profileUuid = state.profileUuid;
    //let theApprovalId = data.approvalId;
    let currentApprover  = [];
    let displayStatus = "";
    //let params = new URLSearchParams('?profileUuid='+profileUuid+'&customerId='+customerId+'&isApproved=false');
    let params = new URLSearchParams('?approvalId='+approvalId);
    
    let response = await API.get("http://localhost:3000/policyApprovalApprovers", {params}).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });

    let count = response.data.length;
    let approvedCounter = 0
    let hasApprover = 0
    let hasReject = 0
    console.log("APPROVED LENGTH", count)
    console.log("Final approval response.status", response.status)
    console.log("MY HEADERDATA 2", headerData)
    if (response.status >199 && response.status <300){
      response.data.map((d1, key) => {
        if (d1.status != "") {
          console.log("approver name - confirm approval", d1.firstName)
          hasApprover = hasApprover+1;
        }

        if (d1.status == "reject") {
          hasReject = +1;
        }
      })


    

      console.log("value of count =", count)
      console.log("value of hasApprove =", hasApprover)
      
      let affectedResouce = [] //will be passed to getResource detail
      let policyId = headerData.policyId //for get resource
      
      console.log("DOM_headerData.affectedResources=", JSON.stringify(headerData.affectedResources))
      console.log("DOM_POLICY_ID=",policyId)

      if (count == hasApprover) {

        console.log("value of count 2 =", count)
        console.log("value of hasApprove 2 =", hasApprover)

        console.log("counter == hasAprover is good")
        let data = [];
        if(hasReject > 0) {
          console.log("has reject > 0 - we reject")
       
          data = {
            approvalId: headerData.approvalId,
            customerId: headerData.customerId,
            policyId: headerData.policyId,
            policyName: headerData.policyName,
            isApproved: true,
            state: "rejected",
            submittedByName: headerData.submittedByName,
            submittedDateTime: headerData.submittedDateTime,
            submittedByProfileUuid: headerData.submittedByProfileUuid,
            affectedResources: headerData.affectedResources,
            id: headerData.id,
          }
          headerData.affectedResources.map((d1,key)=> {
            getAffectedResourcesDetails(d1.resourceId)
          })

          getPolicy(policyId, false)
          finalizeApproval2(approvalId, approvalHeaderId, data)
        } else {
          console.log("official approval - individual approval")
          data = {
              approvalId: headerData.approvalId,
              customerId: headerData.customerId,
              policyId: headerData.policyId,
              policyName: headerData.policyName,
              isApproved: true,
              state: "approved",
              submittedByName: headerData.submittedByName,
              submittedDateTime: headerData.submittedDateTime,
              submittedByProfileUuid: headerData.submittedByProfileUuid,
              affectedResources: headerData.affectedResources,
              id: headerData.id,
          }
          headerData.affectedResources.map((d1,key)=> {
            console.log("CALLEDV getAffectedResourcesDetails ",  d1.resourceId)
            getAffectedResourcesDetails(d1.resourceId)
          })
          getPolicy(policyId, true)
          finalizeApproval2(approvalId, approvalHeaderId, data)
        }
      }
    } else  {
      console.log("Datat could not be retrieved. Try again", response.status)
    }

  }

  const finalizeApproval2 = async (approvalId, approvalHeaderId, data) => {
    console.log("finalize approval 2 was called")
    let response = []
    response = await API.put("http://localhost:3000/policyApprovalHeader/"+approvalHeaderId, data).catch((err) => {
      //setError(err.response.status);
        console.log("Here ERROR " + JSON.stringify(err))
    }).finally(() => {
        setLoading(false);
    });


    if (response.status >199 && response.status <300){
      
      //this is where I call api to execute lambda
    }
    console.log("final approval", JSON.stringify(response.data));
  }

  const finalizeApprovalPolicy = async (approvalId, approvalHeaderId, data) =>{

  }
  const finalizeApprovalResources = async (approvalId, approvalHeaderId, data) => {

  }

  let resourceList1 = [];
  const getAffectedResourcesDetails = async (id) => {
      
    let customerId = state.customerId;
    
   // data.map((d1, key) => {
      
        console.log("DOM_AFFECTED_RESOURCE = resourceId", id)
        let params = new URLSearchParams('?customerId='+customerId+'&resourceId='+id);
       setLoading(true)
         /*option 3 how to make api cal */
      let response =   await  API.get("http://localhost:3000/resources", {params}
      ).catch((err) => {
          setError(err);
      }).finally(() => {
          setLoading(false)
      });


      console.log("DOM_AFFECTED_STATUS",response.status)
      console.log("DOM_AFFECTED_REPONSE.DATA", JSON.stringify(response.data))
      //change true/false to string for display
      response.data.map((data2, index) => {
        resourceList1.push (
          {
            id: data2.id,  
            resourceId: data2.resourceId,
            customerId: data2.customerId,
            cloudAccountId: data2.cloudAccountId,
            resourceName: data2.resourceName,
            isTagged: data2.isTagged, 
            isOrphaned: data2.isOrphaned, 
            isUnderutilize: data2.isUnderutilize, 
            utilization:data2.utilization,
            state: data2.state ,
            instantType: data2.instantType,
            costSavings: data2.costSavings
          }
        )
      });
      //})
      
    

    console.log("DETAILS RESOURCE", JSON.stringify(resourceList1))
  }
  const getPolicy  = async (policyId, policyStatus) => {
    let customerId = state.customerId
    let response = []
    let params = new URLSearchParams('?customerId='+customerId+'&policyId='+policyId);
    console.log("DOM POLICY ID", params)
    response = await API.get("http://localhost:3000/policy", {params}).catch((err) => {
        setError(err.response.status);
        console.log("Here " + JSON.stringify(err.response.status))
    }).finally(() => {
        setLoading(false);
    });

    setPolicyData(response.data)
    let resourseState  ="";
    let isTagged = null;
    let isOrphaned =  null;
    let isUnderutilize = null;
    let  utilization =  0;
    let isActive = null;
    let resourceListFinal = null;
    let policyDataFinnal = {};
    let policyRecordId = 0;
    let resourceRecordId = 0;
    let finalPolicyStatus = "";
    let isValidated = null;
    let policyCategory = "";

    console.log("CINCIN POLICY STATUS =", policyStatus)
   

    response.data.map((d1, kye) =>{


      policyCategory = d1.category;

      if (policyStatus == true) {
        finalPolicyStatus ="approved";
        isValidated = true
      } else if (policyStatus == false) {
        finalPolicyStatus="rejected";
        isValidated = true
      }

      // if (finalPolicyStatus=="approved") {
      //   finalPolicyStatus = "approved";
      //   isValidated = true
      // } else if (finalPolicyStatus=="rejected")  {
      //   finalPolicyStatus = "rejected";
      //   isValidated = true
      // }
      
      

      
      policyRecordId = d1.id;
      policyDataFinnal = {
        id: d1.id,
        policyId: d1.policyId,
        customerId: d1.customerId,
        name: d1.name,
        category: d1.category,
        description: d1.description,
        rating: d1.rating,
        isValidated: isValidated,
        status: finalPolicyStatus,
        isRequiredApprover: d1.isRequiredApprover,
        isActive: d1.isActive,
        isDeletable: d1.isDeletable,
        tranCompleted: d1.tranCompleted+1

      }
    })

    /*call approvePolicy to pprove or reject the policy*/
    approvePolicy(policyDataFinnal,policyRecordId);

    /*only update resources if the overall approval is approved*/
    if (finalPolicyStatus == "approved")  {
      resourceList1.map((d2, key) =>{
        resourceRecordId = d2.id;

        console.log("VEGAS istagged", isTagged)
        console.log("VEGAS isorphaned", isOrphaned)
        console.log("VEGAS isunder", isUnderutilize)
        
        if (policyCategory =="stopOrphan") {
          isOrphaned = false;
          isTagged = d2.isTagged;
          isUnderutilize = d2.isUnderutilize;
          utilization = d2.utilization;
          isActive = true
        } else if (policyCategory =="resizeUnderutilized") {
          isOrphaned = d2.isOrphaned;
          isTagged = d2.isTagged;
          isUnderutilize = false
          utilization = 100;
          isActive = true;
        } else if (policyCategory =="deleteStopped") {
          isOrphaned = d2.isOrphaned;
          isTagged = d2.isTagged;
          isUnderutilize = d2.isUnderutilize;
          utilization = d2.utilization;
          isActive = false
  
        }


        resourceListFinal = 
          {
            id: d2.id,    
            resourceId: d2.resourceId,
            customerId: d2.customerId,
            cloudAccountId: d2.cloudAccountId,
            resourceName: d2.resourceName,
            isTagged: isTagged,
            isOrphaned: isOrphaned,
            isUnderutilize: isUnderutilize,
            utilization: utilization,
            state: finalPolicyStatus,
            isActive: isActive,
            instantType: d2.instantType,
            costSavings: d2.costSavings
          }
          console.log(" resourceListFinal Before = ",  resourceListFinal )
          approveResource(resourceListFinal,resourceRecordId )
      })
    }
   
    
   
    console.log("DOM POLICY =" + JSON.stringify(response.data));
    console.log("DOM RESOURCE FINAL LIST", JSON.stringify(resourceListFinal));
  }


/*call method to officially approve policy*/
const approvePolicy = async (data,id) => {
  console.log("APPROVE POLICY", JSON.stringify(data))
  let params = new URLSearchParams('?policyId='+id)
  let response = []
  response = await API.put('http://localhost:3000/policy/'+id, data).then((res) => {
        //setRegisterProfile(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
        //setLoginAPIResponse());
        
        console.log("APPROVE POLICY STATUS == " + res.status);
        console.log("payload", JSON.stringify(res.data))
        console.log("data = " + res.data)
        console.log("approval Id =", res.data.approvalId)
      
    }).catch((err) => {
        //setRegisterProfile(err);
        console.log("failed status == " + JSON.stringify(err.response.data));
    }).finally(() => {
        setLoading(false)
    });
  }

  /*call method to officially approve resource*/
  const approveResource = async (data, id) => {

    console.log("APPROVE RESOURCE = ID ="+id, JSON.stringify(data))
    let response = []
    response = await API.put('http://localhost:3000/resources/'+id, data).then((res) => {
          //setRegisterProfile(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
          //setLoginAPIResponse());
          
          console.log("APPROVE RESOURCE STATUS  == " + res.status);
          console.log("payload", JSON.stringify(res.data))
          console.log("data = " + res.data)
          console.log("approval Id =", res.data.approvalId)
        
      }).catch((err) => {
          //setRegisterProfile(err);
          console.log("failed status == " + JSON.stringify(err.response.data));
      }).finally(() => {
          setLoading(false)
      });
  }


  /*getWorkflow Datae*/
  const getWorkflowData = async () => {
    
    let accountId = getAccountId(currentAccountId, defaultAccountId)

    setLoading(true)
    console.log("my state  =", state)
    //let theApprovalId = data.approvalId;
    let mySubmissionsWorkflowData = [];
   
    let displayStatus = "";

    let response = await API.get("/api/Approval/workflows/"+accountId ,
    {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken,
        'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
  
      }
    },
    ).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });

    
    if (response.data.length > 0) {
      console.log('daGa-', JSON.stringify(response.data))
      let counter = response.data.length 
      response.data.map((d1, index) =>{
        
        //store approver info in this object 
        console.log("2original status d1.statusString ", d1.statusString)
        console.log("2workflow status  d1.workflow.statusString",  d1.statusString)
        console.log("2resource Id =", d1.resourceId)
        console.log("2BLA status =", d1.status)
        console.log("2BLA workflow status =", d1.status)
        mySubmissionsWorkflowData.push(
          {
            key: index,
            profileId: d1.profileId,
            approverStatus: d1.status,
            approverStatusString: d1.statusString,
            approvalWorkflowId: d1.approvalWorkflowId,
            policyId: d1.policyId,
            resourceId: d1.resourceId,
            accountId: d1.accountId,
            workfowStatus: d1.status,
            workflowStatusString: d1.statusString,
            policyName: d1.policyName,
            resourceName: d1.resourceId + " - " + d1.resourceName,
            createdDateTime: d1.createdDate,
          }
        )
      })

      setMySubmissionsWorkflowData(mySubmissionsWorkflowData);
    } 
    
  }

  let resource = []
  let approvalDataList = [] //used on the main screen table list
  let approvalDataList2 = [] //used in the  modal when displaying 
  let approvalHeaderSubmitted = [] //used to capture the approval header of the person tha submitted the approval request

  /*call this method to get all the approval requests where the profileUuid = my profileUuid and isApproved is false*/
  const getApproverApprovalsDetails = async () => {
    
    setRefresh(false)
    setLoading(true)
    let customerId = state.customerId;
    let profileUuid = state.profileUuid;
    let myProfileId = sessionStorage.getItem('profileId')
    console.log("my state  =", state)
    //let theApprovalId = data.approvalId;
    let pendingReviewApprovalData = [];
    let pendingFinalApprovalData = []
    let displayStatus = "";
    //let params = new URLSearchParams('?profileUuid='+profileUuid+'&customerId='+customerId+'&isApproved=false');
    //let params = new URLSearchParams('?customerId='+customerId+'&profileUuid='+profileUuid+'&isApproved=false');
    let params = new URLSearchParams('?customerId='+customerId+'&profileUuid='+profileUuid+'&isApproved=false');
    
    console.log("customerid=" + customerId + "profileUuid=" + profileUuid )
    let response = await API.get("/api/Approval/mylist/"+myProfileId,
    {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken,
        'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
   
      }
    },
    ).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });

    
    console.log('daGa-', JSON.stringify(response.data))
    console.log("LENGH",response.data.length )
    if (response.data.length > 0) {
    
      let counter = response.data.length 
      response.data.map((d1, index) =>{
        

        console.log("MY INDEX ==", index)
        if (d1.status== 2 && d1.workflow.status ==2) {
         

          //store approver info in this object 
          console.log("2original status d1.statusString ", d1.statusString)
          console.log("2workflow status  d1.workflow.statusString",  d1.workflow.statusString)
          console.log("2resource Id =", d1.workflow.resourceId)
          console.log("2BLA status =", d1.status)
          console.log("2BLA workflow status =", d1.workflow.status)
          pendingReviewApprovalData.push(
            {
              key: index,
              profileId: d1.profileId,
              approverStatus: d1.status,
              approverStatusString: d1.statusString,
              approvalWorkflowId: d1.workflow.approvalWorkflowId,
              policyId: d1.workflow.policyId,
              resourceId: d1.workflow.resourceId,
              accountId: d1.workflow.accountId,
              workfowStatus: d1.workflow.status,
              workflowStatusString: d1.workflow.statusString,
              policyName: d1.workflow.policyName,
              resourceName: d1.workflow.resourceId + " - " + d1.workflow.resourceName,
              createdDateTime: d1.workflow.createdDate,
            }
          )
        }

        /*pending and approved */
        if (d1.status== 2 && d1.workflow.status != 2) {
          console.log("BLA original status d1.statusString ", d1.statusString)
          console.log("BLA workflow status  d1.workflow.statusString",  d1.workflow.statusString)
          console.log("BLA resource Id =", d1.workflow.resourceId)
          console.log("BLA status =", d1.status)
          console.log("BLA workflow status =", d1.workflow.status)
          console.log("MY INDEX ==", index)
          pendingFinalApprovalData.push(
            {
              key: index,
              profileId: d1.profileId,
              approverStatus: d1.status,
              approverStatusString: d1.statusString,
              approvalWorkflowId:  d1.workflow.approvalWorkflowId, //index, //d1.workflow.approvalWorkflowId,
              policyId: d1.workflow.policyId,
              resourceId: d1.workflow.resourceId,
              accountId: d1.workflow.accountId,
              workfowStatus: d1.workflow.status,
              workflowStatusString: d1.workflow.statusString,
              policyName: d1.workflow.policyName,
              resourceName: d1.workflow.resourceId + " - " + d1.workflow.resourceName,
              createdDateTime: d1.workflow.createdDate,
            }
          )
        }

        /*all approved */
        if (d1.status== 3 && d1.workflow.status == 3) {
          pendingFinalApprovalData.push(
            {
              key: index,
              profileId: d1.profileId,
              approverStatus: d1.status,
              approverStatusString: d1.statusString,
              approvalWorkflowId:  d1.workflow.approvalWorkflowId, //index, //d1.workflow.approvalWorkflowId,
              policyId: d1.workflow.policyId,
              resourceId: d1.workflow.resourceId,
              accountId: d1.workflow.accountId,
              workfowStatus: d1.workflow.status,
              workflowStatusString: d1.workflow.statusString,
              policyName: d1.workflow.policyName,
              resourceName: d1.workflow.resourceId + " - " + d1.workflow.resourceName,
              createdDateTime: d1.workflow.createdDate,
            }
          )
        }


      })
       

      response.data.map((d1, index) =>{
        /*approval data thas have been reviewed by the approver */
        if (d1.status == 2 && d1.workflow.status != 2) {
          if (d1.workflow.workflowStatusString == "Pending") {
            console.log("IGHEDOSA")
          }
          
         
        }
  
        //use counter to determine when all approval header data is complete
        //counter = counter - 1
        //getApprovalHeader(d1.approvalId, counter); //use this to get approver header information 
        // getApprovers(d1.approvalId);
      })
      //setCurrentApprover(currentApprover);
      setMyApprovalData(pendingReviewApprovalData)
      setMyPendingFinalApprovalData(pendingFinalApprovalData)

      console.log(" pendingReviewApprovalData ==",  pendingReviewApprovalData)
      console.log(" pendingFinalApprovalData ==",  pendingFinalApprovalData)
      
    } 
  }

  const getApproverFromWorkflow =() => {
   

  }

  /*call this method to get all the approval requests that i submitted.*/
  const getMyPolicyApprovalSubmissions = async () => {
    
    setRefresh(false)
    setLoading(true)
    let customerId = state.customerId;
    let profileUuid = state.profileUuid;
    console.log("my state  =", state)
    //let theApprovalId = data.approvalId;
    let currentApprover  = [];
    let displayStatus = "";
    //let params = new URLSearchParams('?profileUuid='+profileUuid+'&customerId='+customerId+'&isApproved=false');
    let params = new URLSearchParams('?customerId='+customerId+'&submittedByProfileUuid='+profileUuid+'&isApproved=false');
    
    console.log("customerid=" + customerId + "profileUuid=" + profileUuid )
    let response = await API.get("http://localhost:3000/policyApprovalHeader", {params}).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });


    displayStatus = "";
    response.data.map((d1, index) => {
      if (d1.isApproved == false) {
        displayStatus = "Pending";
      }

      /* store the approval header data in this object then display */
      approvalHeaderSubmitted.push (
        {
          customerId: d1.customerId,
          policyId: d1.policyId,
          state: d1.state,
          isApproved: d1.isApproved,
          submittedByProfileUuid: d1.submittedByProfileUuid,
          approvalId: d1.approvalId,
          policyName: d1.policyName,
          status: displayStatus,
          submittedByName: d1.submittedByName,
          submittedDateTime: d1.submittedDateTime,
          id: d1.id,
        }
      )
    
    })

    setApprovalHeaderDataMySubmissions(approvalHeaderSubmitted)
    console.log('daGa-', JSON.stringify(response.data))
    console.log("LENGH",response.data.length )
    
  }


  const getApprovalHeader = async (propsApprovalId, counter) => {
    console.log("APPR HEADER ==", propsApprovalId)
    console.log("COUNTER ==", counter )
    setLoading(true)
    let params = new URLSearchParams('?approvalId='+ propsApprovalId);
    let response = await API.get("http://localhost:3000/policyApprovalHeader", {params}).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });


    let affectedResouce3=[];
    let displayStatus = "";
    response.data.map((d1, index) => {
      if (d1.isApproved == false) {
        displayStatus = "Pending";
      }

      /* store the approval header data in this object then display */
      approvalDataList.push (
        {
          customerId: d1.customerId,
          policyId: d1.policyId,
          state: d1.state,
          isApproved: d1.isApproved,
          submittedByProfileUuid: d1.submittedByProfileUuid,
          approvalId: d1.approvalId,
          policyName: d1.policyName,
          status: displayStatus,
          submittedByName: d1.submittedByName,
          submittedDateTime: d1.submittedDateTime,
          affectedResources: d1.affectedResources,
            // d1.affectedResources.map((d1, key) =>{
            //   affectedResouce3.push(
            //     {
            //       resourceId: d1.resourceId,
            //       resourceName: d1.resourceName,
            //       instantType: d1.instantType
            //     }
            //   )})
            // ],
          id: d1.id,
        }
      )
    
    })
    
    console.log("DOM_got my resources",JSON.stringify(approvalDataList))
    //only update state variable after all data is inserted into the approvalDataList
    if (counter==0){
      setApprovalHeaderData(approvalDataList);
    }
    
  }



  /*get Approval header data when the link from the approval header request is select
  this the inforjatin that displays in the modal... this will sh */
  const getApprovalDetails = async (data) => {
    setLoading(true)
    getApprovers(data.approvalId)
    let approvalId = data.approvalId
    let params = new URLSearchParams('?approvalId='+ approvalId);
    let response = await API.get("http://localhost:3000/policyApprovalHeader", {params}).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });

    
    console.log("approval details ====", JSON.stringify(response.data))
   
    let displayStatus = "";
  
    console.log("LENGTH OF POLICY APPROVAL HEADER =", response.data.length)
    
    response.data.map((d1, index) => {
     
   
      // console.log("policy name =", d1.policyName)
      
      if (d1.isApproved == false) {
        displayStatus = "Pending";
      }
      approvalDataList2.push (
        {
          customerId: d1.customerId,
          policyId: d1.policyId,
          state: d1.state,
          isApproved: d1.isApproved,
          submittedByProfileUuid: d1.submittedByProfileUuid,
          approvalId: d1.approvalId,
          policyName: d1.policyName,
          status: displayStatus,
          submittedByName: d1.submittedByName,
          submittedDateTime: d1.submittedDateTime,
          id: d1.id,
        }
      )
     
      console.log("approvaDatallist", approvalDataList)

      /*this is the resource that is tied to the approval request - this is displayed in the modal*/
      d1.affectedResources.map((d2, index) => {
        console.log(d2.resourceName)
        resource.push ( {
            resourceId: d2.resourceId,
              resourceName: d2.resourceName,
              instantType: d2.instantType,
        })
      })
      // console.log("approvalId==", d1.approvalId)
      // setApprovalId(d1.approvalId);
      // setPolicyName(d1.policyName);
      // setSubmittedByName(d1.submittedByName)
      // setSubmittedDateTime(d1.submittedDateTime)
      // d1.affectedResources.map((d2) => {

      // })
    })
    // console.log("policy record", approvalDataList)
    // console.log("resources", resource)
    //setDisplayData2(approvalDataList2);
    setApprovalHeaderData2(approvalDataList2)
    setAffectedResourcesData(resource);
    //getApprovers(props_approvalId);
    
    console.log("NOAH IGHEDOSA", JSON.stringify(approvalHeaderData))
    //test(approvalDataList);
  }




  const getApprovers = async (props_approvalId) => {
    setLoading(true)
    let approverList = []
    let displayStatus = ""
    let params = new URLSearchParams('?approvalId='+ props_approvalId);
    let response = await API.get("http://localhost:3000/policyApprovalApprovers", {params}).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });

    response.data.map((d1) => {
      if (d1.isApproved == false) {
        displayStatus = "Pending"
      } else  {
        displayStatus = "Approved"
      }

      approverList.push( 
        {
          firstName: d1.firstName,
          lastName: d1.lastName,
          isApproved: displayStatus,
          title: d1.title
        }
      )
    });

    setApprovers(approverList);
    setOpen(true) // open Modal
  }



  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };




 const fetch = async (expanded, record) => {
    console.log("fetch record ==", JSON.stringify(record))
  console.log("expand value==", expanded)
    let workflowId = record.approvalWorkflowId
    await axios.get("/api/approval/group/"+workflowId, 
    {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken,
        'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
   
      }
    },
    ).then(res => {
      const data = res.data;

      setState1({
        ...state1.data,
          data,
          loading: true
      })

      console.log("my nested data ==", JSON.stringify(res.data))
  }).catch(error => {
      console.log(error, "error")
  })
  }
  
  // state1 = {
  //   data: null,
  //   loading: false,
  // }
  const expandedRowRender1=() => {
    
    let myNestedData = []
    if(state1.loading){
      
      console.log(" state1.date===", JSON.stringify( state1.data))
      const nestedTableData = state1.data.map((row, index) => ({
        
        key: index,
        //satus: row.statusString,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        status: row.statusString,
        //data2.isTagged ? "true" : "false",
       
      })
      )
      const nestedColumns = [
       
        {
          key: "status",
          title: "Approval",
          dataIndex: "status",
          render: (tag) => {
            const color = tag.includes('Pending')?'gold':tag.includes('Rejected')?"red":tag.includes('Approve')?'green':''
            return <Tag color={color} key={tag}>{tag}</Tag>
          }
        },
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
       
        
      ];
      return <Table columns={nestedColumns} dataSource={nestedTableData } pagination={false} />          
  }
};
  return (
    <>
        <br></br>
       {loading == true ?
        <>
          <Spin tip="Processing...please wait" size="large">
          <div className="content" />
          </Spin>
        
          </> : ""
        }
         
        {customerRole == "Customer" && mySubmissionsWorkflowData.length >0 ?
        <><Typography.Title level={4} >My Submissions </Typography.Title>
        
            <Table
              columns={columnsMySubmissions}
              dataSource={mySubmissionsWorkflowData}
              expandable={{
                expandedRowRender: expandedRowRender1,
                rowExpandable: record => true,
                onExpand: fetch,
              }}  
            
            />
        </> : ""}


        {/* <Button onClick={onAddStudent}>Add a new Student</Button> */}
         <Typography.Title level={4} >Policy Pending your Review</Typography.Title>
         {myApprovalData.length >0 ?
         
          <Table dataSource={myApprovalData} columns={columnsMyApproval}  />
          : "You have no policy to review " }
        
        {myPendingFinalApprovalData.length >0 ?
        <><Typography.Title level={4} >My Reviewed Policy Approvals</Typography.Title>
        
            <Table
              columns={columnsMyPendingApproval}
              dataSource={myPendingFinalApprovalData}
              expandable={{
                expandedRowRender: expandedRowRender1,
                rowExpandable: record => true,
                onExpand: fetch,
              }}  
            
            />
        </>
          : ""}
        
        {approvalHeaderDataMySubmissions.length >0 ?
        <><Typography.Title level={4} >My Policy Approval Submissions</Typography.Title>
        <Table columns={columnsSubmissions} dataSource={approvalHeaderDataMySubmissions}></Table> </>
        : ""}

        <Modal
                title="View policy details"
                open={open}
                onOk={OkModal}
                onCancel={hideModal}
                okText="Continue"
                cancelText="Cancel"
            >

            <Typography.Title level={5} >Approval Info</Typography.Title>
            <Table dataSource={myApprovalData} columns={columnsMyApproval} pagination={false} />

            <Typography.Title level={5} >Approvers</Typography.Title>
            <Table dataSource={approvers} columns={columsApprovers} />
            

            <Typography.Title level={5} >Resources</Typography.Title>
            <Table dataSource={affectedResourcesData} columns={columsAffectedResources} />
            
            
            
            </Modal>
        {/* <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal> */}
    
   




      

      

    </>
  );
}
export default PendingApproval;

// function PendingApproval () {
  

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState()
//   const [displayData, setDisplayData] = useState(null)

      
//   const API = axios.create({
//   });
//   useEffect( () => {
//       getApprovals();
//   },[]);


//   let approvalData = []

//   const getApprovals = async (e) => {
//     // e.preventDefault();
//      setLoading(true)
//      let response = await API.get("http://localhost:3000/policyApprovalHeader").catch((err) => {
//          setError(err);
//          console.log("Here " + err.response.data)
//      }).finally(() => {
//          setLoading(false);
//      });

//      console.log("approval", JSON.stringify(response.data))
//      response.data.map((data1) => {
//         approvalData.push (
//           {
//             policyName: data1.policyName,
//             submittedByName: data1.submittedByName,
//             submittedDate: "8/18/2023 10:30AM CST",
//             status: data1.status,
//             details: "",
//             selection: ""


//           }
//         )
//      })
//      setDisplayData(approvalData)
//  }


  
//   const columns = [
//       {
//           title: "Policy",
//           dataIndex: "policyName",
//           key: "policyName",
//       },
//       {
//           title: "Submitted By",
//           dataIndex: "submittedByName",
//           key: "submittedByName",
//       },
//       {
//           title: "Submitted Date",
//           dataIndex: "submittedDate",
//           key: "submittedDate",
//       },
//       {
//           title: "Status",
//           dataIndex: "status",
//           key: "status",
//       },

//       {
//         title: "View Details",
//         dataIndex: "details",
//         key: "details",
//       },
//       {
//         title: "Action",
//         dataIndex: "selection",
//         key: "x",
//         render: () => <><a>Approve</a> <a>Reject</a></>,
       
        
//       }
//     ]

//     const data = [
//       {
//         policyName: "Orphan Resources",
//         submitterName: "Dominic Ighedosa",
//         submittedDate: "8/12/2023",
//         status: "Pending",
//         details: "Link",
//         selection: "Button"

//       }
//     ]
//   return (
//     <>
//     <Typography.Title level={4} >Pending Policy Approval</Typography.Title>
   
   
//         <Table
//         columns={columns}
        
//         dataSource={displayData}
//         pagination={true}
//         ></Table>
//     </>
//   );
// };
// export default PendingApproval;





