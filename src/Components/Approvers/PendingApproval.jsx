
import { CaretRightOutlined, LikeFilled } from '@ant-design/icons';
import { Collapse, theme, Typography, Button, Table, Modal, Input, Descriptions } from 'antd'; 
import React from 'react';
import axios from "axios";

import useBearStore from '../../state/state';

import useStore from "../../state/state";
import { useState, useEffect, useContext, useRef } from 'react'
import { Context } from '../../Store';
import useEncryptDecrypt from '../../API/useEncryptDescrypt';
import { EditOutlined, DeleteOutlined, DislikeOutlined, LikeOutlined, TwoToneColor, getTwoToneColor, setTwoToneColor} from "@ant-design/icons";
import Approvers from './Approvers';



function PendingApproval () {

  const firstRenderRef = useRef(false);
  const API = axios.create({
  });
  useEffect( () => {
      //getApprovals();
      setTwoToneColor('#eb2f96'); //not sure what this is doing
      getTwoToneColor(); // #eb2f96

      if (firstRenderRef.current) {
        console.log("Block only runs AFTER initial render");
        getApproverApprovalsDetails(); //call this method to get the list of approval requests that I am an approver for
        getMyPolicyApprovalSubmissions(); //call this method to get the list of submissions that i have - may need to filter by role in the future
      } else {
        firstRenderRef.current = true;
        
      }
  },[]);


  const [approvalId, setApprovalId] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [policyDesc, setPolicyDesc] = useState('');
  const [submittedByName, setSubmittedByName] = useState('');
  const [submittedDateTime, setSubmittedDateTime] = useState('');
  const [policyStatus, setPolicyStatus] = useState('');
  const [approvalHeaderData, setApprovalHeaderData] = useState([]);
  const [approvalHeaderData2, setApprovalHeaderData2] = useState([]);
  const [approvalHeaderDataMySubmissions, setApprovalHeaderDataMySubmissions] = useState([]);
  const [affectedResourcesData, 
    
    
  setAffectedResourcesData] = useState([]);
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

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [displayData, setDisplayData] = useState(null)
  const [displayData2, setDisplayData2] = useState(null)
  const [open, setOpen] = useState(false);  
 

  
 

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
      dataIndex: "status",
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
      dataIndex: "status",
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
      dataIndex: 'status',
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
    let approver = null;
    let isApproved = false;
    let status =  null;
    let profileUuid = null;
    let id = null;
    let approvalHeaderId =0;
    let headerData = [];
    let affectedResouce2 = [];
    //get approval header data id value
    console.log("approvalHeaderData==",approvalHeaderData)
    //filter the header data I need
    const tempApprovalHeader = approvalHeaderData.filter(header => header.approvalId == data.approvalId);

    tempApprovalHeader.map((d1, key) => {
      approvalHeaderId = d1.id;
       headerData = {

          customerId: d1.customerId,
          policyId: d1.policyId,
          state: d1.state,
          isApproved: d1.isApproved,
          submittedByProfileUuid: d1.submittedByProfileUuid,
          approvalId: d1.approvalId,
          policyName: d1.policyName,
          status: d1.status,
          submittedByName: d1.submittedByName,
          submittedDateTime: d1.submittedDateTime,
          affectedResources: d1.affectedResources,
          id: d1.id,
        
      }
    })

    console.log("approvalHeaderId==", approvalHeaderId)

    if (type=='approve') {
      status = type;
      isApproved = true;
    } else if (type == 'reject') {
      status = type;
      isApproved = true;
    } else  {
      status = "";
      isApproved = false;
    }
    console.log("type ==", type)
  

   
    console.log("the value of type =", type + "and =" + data.approvalId)
    console.log("current approver =", JSON.stringify(currentApprover))
    currentApprover.map((d1, key) => {
      if (data.approvalId == d1.approvalId) {
        profileUuid = d1.profileUuid
        id = d1.id;
        approver = {
          approvalId: d1.approvalId,
          customerId: d1.customerId,
          policyId: d1.policyId,
          profileUuid: d1.profileUuid,
          firstName: d1.firstName,
          lastName: d1.lastName,
          title: d1.title,
          status: status,
          isApproved: isApproved,
          id: d1.id,
        }
      }
      
    });

      
    console.log("approver UPDATE", approver)
    let params = null;
    let approvalId = data.approvalId
    let customerId = state.customerId

    let response = []
    params = new URLSearchParams('?approvaId='+ approvalId +'&profileUuid='+profileUuid + '&customerId='+customerId);
    response = await API.put("http://localhost:3000/policyApprovalApprovers/"+id, approver).catch((err) => {
        //setError(err.response.status);
        console.log("Here ERROR " + JSON.stringify(err))
    }).finally(() => {
        setLoading(false);
    });

    console.log("UPDATE My approval =", JSON.stringify(response.data))
    console.log("MY HEADERDATA 1", headerData)
    //refresh
    getApproverApprovalsDetails();
    finalizeApproval(approvalId, approvalHeaderId,  headerData)
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
    console.log("my state  =", state)
    //let theApprovalId = data.approvalId;
    let currentApprover  = [];
    let displayStatus = "";
    //let params = new URLSearchParams('?profileUuid='+profileUuid+'&customerId='+customerId+'&isApproved=false');
    let params = new URLSearchParams('?customerId='+customerId+'&profileUuid='+profileUuid+'&isApproved=false');
    
    console.log("customerid=" + customerId + "profileUuid=" + profileUuid )
    let response = await API.get("http://localhost:3000/policyApprovalApprovers", {params}).catch((err) => {
        setError(err);
        console.log("Here " + err.response.data)
    }).finally(() => {
        setLoading(false);
    });

  
    console.log('daGa-', JSON.stringify(response.data))
    console.log("LENGH",response.data.length )
    if (response.data.length ==0) {
      setApprovalHeaderData([]);
    } else {
      let counter = response.data.length 
      response.data.map((d1, index) =>{
        
        //store approver info in this object 
        currentApprover.push(
          {
            approvalId: d1.approvalId,
            customerId: d1.customerId,
            policyId: d1.policyId,
            profileUuid: d1.profileUuid,
            firstName: d1.firstName,
            lastName: d1.lastName,
            title: d1.title,
            status: d1.status,
            isApproved: d1.isApproved,
            id: d1.id,
          }
        )
  
        //use counter to determine when all approval header data is complete
        counter = counter - 1
        getApprovalHeader(d1.approvalId, counter); //use this to get approver header information 
        // getApprovers(d1.approvalId);
      })
      setCurrentApprover(currentApprover);
    }
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





  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <>
    
        {/* <Button onClick={onAddStudent}>Add a new Student</Button> */}
         <Typography.Title level={4} >Pending Policy Approval</Typography.Title>
         {approvalHeaderData.length >0 ?
          <Table columns={columns} dataSource={approvalHeaderData}></Table> 
          : "You have no policy to review " }

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
            <Table dataSource={approvalHeaderData2} columns={columnsAppHeader} pagination={false} />

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





