import { Card, Space, Statistic, Table, Typography, Avatar, Rate, Button, Spin, Form, Select, Modal, Alert} from "antd";
import {useEffect, useState, useContext} from "react";
import {getInventory} from "../../apis";
import '../../App.css';
import Approvers from "../../Components/Approvers/Approvers";
import Error from "../../Components/Alert/Error";
import Success from "../../Components/Alert/Success";
import Warning from "../../Components/Alert/Warning";
import Info from "../../Components/Alert/Info";
import AffectedResources from "../../Components/Approvers/AffectedResources";
import useBearStore from "../../state/state";
import useStore from "../../state/state";

import useEncryptDecrypt from '../../apis/useEncryptDescrypt';
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import { Context } from '../../Store';


import axios from "axios";
import OrphanResources from "../../Pages/Dashboard/OrphanResources";
import LowUtilization from "../../Pages/Dashboard/LowUtilization";
import UntaggedResources from "../../Pages/Dashboard/UntaggedResources";

import CostSavings from "../../Pages/Dashboard/CostSavings";
import CostSavingsDonutChart from "../../Pages/Dashboard/Charts/CostSavingsDonutChart";
import {
    ExclamationCircleOutlined,
  } from "@ant-design/icons";



function ETL() {

    const resourceTableColumns = [
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

    const policies = [
    {name: 'Orphan Resources', policyId: 1, isApproved: true, description: "1This policy is used tagg untagged resoures"},
    {name: 'Untagged Resources', policyId: 2, isApproved: true, description: "3This policy is used tagg untagged resoures"},
    {name: 'Delete Unencrypte', policyId: 3, isApproved: false, description: "3This policy is used tagg untagged resoures"},
    {name: 'Terminate Unpatchable Instances', id: 4, isApproved: true, description: "4T4his policy is used tagg untagged resoures"},
    {name: 'Notify on Lambda Errors', policyId: 5, isApproved: false, description: "5This policy is used tagg untagged resoures"},
    {name: 'Low Utilization', policyId: 6, isApproved: true, description: "5This policy is used tagg untagged resoures"},
    {name: 'Block Public S3 Object ACLs', policyId: 7, isApproved: false, description: "This policy is used tagg untagged resoures"}
    ]

    const approvers = [
        {name:'Richard Stephens', profileUuId: 1, title: 'Engineer'},
        {name:'Karl Jablonski', profileUuId: 2, title: 'Engineer'},
        {name:'Todd Nelson', profileUuId: 3, title: 'Engineer'},
        {name:'Steve Shickles', profileUuId: 4, title: 'Engineer'},
        {name:'Matthias DAutremont', profileUuId: 5, title: 'Engineer'},
        {name:'Adam Nagle', profileUuId: 6, title: 'Engineer'},
        {name:'Mahathi Krishna', profileUuId: 7, title: 'Engineer'},
        {name:'Dominic Ighedosa', profileUuId: 8, title: 'Engineer'},
        {name:'Donald Trump', profileUuId: 9, title: 'President'},
        {name:'Joe Biden', profileUuId: 10, title: 'President'},
        {name:'Barack Obama', profileUuId: 11, title: 'President'},
       
    ]


    const [dataSource, setDataSource] = useState([]);
    const [approversSelected, setApproversSelected] = useState([approvers]);
    const [apiResponse, setApiResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [policyData, setPolicyData]  = useState([]);
    const [approversData, setApproversData]  = useState([]);
    const [approversData2, setApproversData2]  = useState([]);
    const [approverDetails, setApproverDetails] = useState([]);
    const [approversId, setApproversId] = useState();
    
    const [policyDetails, setPolicyDetails] = useState([]);
    const [metricDetails, setMetricDetails] = useState("");
    const [apiRes, setApiRes] = useState([]);
    const [state, setState] = useContext(Context);
    const [customerId, setCustomerId] = useState(null);
    const [submitterName, setSubmitterName] = useState(null);
    const [submitterUuid, setSubmitterUuid] = useState(null);

    const [resourceList, setResourceList] = useState([]);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const [approverList2, setApproverList2] = useState([]);
    const [approverListFinal, setApproverListFinal] = useState([]);
    const [approverDetailsCount, setApproverDetailsCount] = useState(0);
    const [canDeactivatePolicy, setCanDeactivatePolicy] = useState(false);
    const [policyStatus, setPolicyStatus] = useState("");
    const [isHideAffectedResouceTable, setIsHideAffectedResouceTable] = useState(false);
    const [availableCloudAccounts, setAvailableCloudAccounts] = useState([]);
    const [activeCloudAccountId, setActiveCloudAccountId] = useState();
  
    /*this state variable is for the resource affect table selection */
    const [select, setSelect] = useState({
        selectedRowKeys: [],
        loading: false
      });
    
      console.log("selectedRowKeys", select);
    
      const { selectedRowKeys, loadingTbl } = select;

    /*general variable*/
    let myCustomerId = state.customerId

    const API = axios.create({
     });

    let accessToken = sessionStorage.getItem('accessTokenData')
    let xapiKeyWithUserName = sessionStorage.getItem('xapikey')
    let xapikeyNoAccessToken = sessionStorage.getItem('xapikeyNoAccessToken')
    

    useEffect(() => {
        getPolicies();

        setCustomerId(state.customerId)
        setSubmitterName(state.firstName + " " + state.lastName);
        setSubmitterUuid(state.profileUuid);
        setIsUpdateSuccess(false);

        let accountsData = sessionStorage.getItem('cloundAccountData')
        accountsData = JSON.parse(accountsData)
        setAvailableCloudAccounts(accountsData)

        console.log("CloudAccoun =", accountsData)
        // setLoading(true)
        // getInventory().then(res=>{
        //     setDataSource(res.products)
        //     setLoading(false);
        // })
    }, []);
    
    
    const [open, setOpen] = useState(false);
   


    const [allPolicyValues, setAllPolicyValues] = useState({
        name: '',
        policyId: 0,
        isApprove: false,
        description: ''
    });

    const getPolicies  = async () => {
        

      
    }


    /*remote late*/
    const getApprovers  = async () => {
        let response = []
        //let approvalId = data.approvalId
        let customerId = state.customerId
        let params = null;
        params = new URLSearchParams('?customerId='+ myCustomerId +'&role=approver');

        response = await API.get("/api/profile/user", {params}).catch((err) => {
            setError(err.response.status);
            console.log("Here " + JSON.stringify(err.response.status))
        }).finally(() => {
            setLoading(false);
        });
        setApproversData(null) //clear
        setApproversData2(null) //clear
        setApproversData(response.data)
        setApproversData2(response.data)
        
        console.log("my approver =" + JSON.stringify(response.data))
    }

   const resourceList1 =[];
    const getResourcesAffected = async (policyType) => {

        let qryString =""
        let params = null;

        console.log("MY POLICY TYPE =", policyType)
        console.log("props=", policyType)
        if (policyType =="stopOrphan") {
            params = new URLSearchParams([['isOrphaned', true]]);
        } else if (policyType =="resizeUnderutilized") {
            params = new URLSearchParams([['isTagged', false]]);
        } else if (policyType=="deleteStopped") {
            console.log("I called low use")
            params = new URLSearchParams([['isUnderutilize', true]]);
        }

        console.log("query string", qryString)
        setLoading(true)
         /*option 3 how to make api cal */
       let response =  await API.get("/api/Resources/all/"+policyType,
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
        }).finally(() => {
            setLoading(false)
        });



        //change true/false to string for display
        response.data.forEach((data2, index) => {
          
            resourceList1.push (
                {
                    resourceId: data2.resourceId,
                    customerId: data2.customerId,
                    cloudAccountId: data2.cloudAccountId,
                    resourceName: data2.resourceName,
                    isTagged: data2.isTagged ? "true" : "false",
                    isOrphaned: data2.isOrphaned ? "true" : "false",
                    utilization:data2.utilization,
                    state: data2.state ,
                    instantType: data2.instantType,
                    costSavings: data2.costSavings
                }
            )
        });
        //setApiRes(resourceList);
        setResourceList(resourceList1);

       // getMetrics(response.data)
        console.log("resource affected " + JSON.stringify(response.data))
    };
    /*get policyData from the policy object filtered by...*/
    const getPolicyDetail =(e) => {
        const policyDesc = policies.filter(policy => policy.name === e);

        console.log("e = " + e)
        return policyDesc.map((pd) => (
       
            setAllPolicyValues( {
                allPolicyValues, name: pd.name, policyId: pd.policyId, isApprove: pd.isApproved, description: pd.description 
            })
        ))
    };

    const getApproversSelected = (e) => {
      console.log("approver selected "  + e)  
      const appData = e;
      return appData.map((d) => {
        console.log(d)
      })
    };
    const getApprover =(e) => {
        //const policyDesc = policies.filter(policy => policy.name === e);

        console.log("approvers = " + e)
        // return policyDesc.map((pd) => (
       
        //     setAllPolicyValues( {
        //         allPolicyValues, name: pd.name, policyId: pd.policyId, isApprove: pd.isApproved, description: pd.description 
        //     })
        // ))
    };

    const options = [
        { label: 'Fruit', value: '1' },
        { label: 'Vegetable', value: 'vegetable' },
        { label: 'Meat', value: 'meat' },
      ];

      const [value, setValue] = useState('fruit');
      const [profileUuId, setProfileUuId] = useState('0');
     // const [approversSelected, setApproversSelected] = useState([])

    const handleChange2 = (uuId) => {
        //setValue(event.target.value);
        setProfileUuId(uuId)
        console.log(uuId)
    };

   
    const onFinish = (values) => {

        console.log("iApprover = " + iApprovers)
        console.log('Success:' +  values);
        console.log('policyName == ' + policyName)
        
        //makePostAPICalls();
        //processLogin();
        console.log("value ==" + JSON.stringify(values))
       
    };
    const handleSubmit =(e) => {
        
       
        console.log("username = " + e)
        e.preventDefault();
    }

    const [approverStruct, setApproverStruct ] = useState([])
    let myApprover = []
    
    let approverList = []
    let policyList =[]
    let resourceCategory = ""


    /*get policies using account Id */
    const getPoliciesUsingAccountId = async (accountId) => {
        //getUsersUsingAccountId(accountId)
        setActiveCloudAccountId(accountId)
    }


    /*get users using account Id */
    const getUsersUsingAccountId = async (accountId) => {
        console.log("getPoliciesUsingAccountId data =", JSON.stringify(accountId))
    
        let response = []
        //let params = new URLSearchParams('?accountId='+myCustomerId+'&isActive=true');
        let params = new URLSearchParams(accountId);
        
        console.log("ActiveCloudAccountId == ", activeCloudAccountId)
        console.log("access toke =", accessToken)
        console.log("xapiKeywithUserNam =", xapiKeyWithUserName)
        response = await API.get("/api/profile/users/"+accountId, 
        {
            headers: {
              'accept': 'text/plain',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + accessToken,
              'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
         
            }
          },
          
        
        ).catch((err) => {
            setError(err.response.status);
            console.log("Here " + JSON.stringify(err.response.status))
        }).finally(() => {
            setLoading(false);
        });

        if (response.status  == 200) {
            setApproversData(null) //clear
            setApproversData2(null) //clear
            setApproversData(response.data)
            setApproversData2(response.data)
        }
        

        console.log("Users =" + JSON.stringify(response.data))

    }

    const getPolicyDetail1 = async (policyId) => {
       // const pId = policyId.target.value;
        const policy = policyData.find(u => u.policyId === policyId);
        setPolicyId(policyId)
        console.log("policy data =", policy.name)
        console.log("data =", policy)
        console.log("my active cloud account =", activeCloudAccountId)
        let resourcePolicyTypeId = policy.typeId
        let resourcePolicyTypeName = policy.type

        console.log("resource policy type ==", resourcePolicyTypeId)
        console.log("resource policy type name ==", resourcePolicyTypeName)
        
        // this.setState({
        //     value: user
        // });
        
        setLoading(true)
         /*option 3 how to make api cal */
       let response =  await API.get("/api/Resource/all/"+activeCloudAccountId+"/"+resourcePolicyTypeId,
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
        }).finally(() => {
            setLoading(false)
        });



        console.log("resourcePolicyTypeName ===", resourcePolicyTypeName )
        console.log("resource data =", JSON.stringify(response.data))
        //change true/false to string for display
        response.data.forEach((data2, index) => {
            switch(resourcePolicyTypeName ) {
                case 'Tag':
                if (data2.isTagged == false ) {
                    resourceList1.push (
                        {
                            resourceId: data2.resourceId,
                            cloudAccountId: data2.accountId,
                            resourceName: data2.resourceName,
                            isTagged: data2.isTagged ? "true" : "false",
                            isOrphaned: data2.isOrphaned ? "true" : "false",
                            isUnderutilized:data2.isUnderutilized ? "true" : "false",
                            statusString: data2.statusString,
                            resourceType: data2.resourceType,
                            costSavings: data2.costSavings
                        }
                    )
                }

                case 'deleted':
                    if (data2.isUderutilitzed == true) {
                        resourceList1.push (
                            {
                                resourceId: data2.resourceId,
                                customerId: data2.customerId,
                                cloudAccountId: data2.accountId,
                                resourceName: data2.resourceName,
                                isTagged: data2.isTagged ? "true" : "false",
                                isOrphaned: data2.isOrphaned ? "true" : "false",
                                isUderutilitzed:data2.isUnderutilized ? "true" : "false",
                                statusString: data2.statusString,
                                resourceType: data2.resourceType,
                                costSavings: data2.costSavings
                            }
                        )
                    }

                default:

            }
           
        });
        //setApiRes(resourceList);
        setResourceList(resourceList1);

        console.log("resourceList1 =", resourceList1)
        console.log("resourceList1.count", resourceList1.length)
        


    }

    /*capture resource affected table data*/
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
            Table.SELECTION_INVERT
            // {
            //     key: 'even',
            //     text: 'Select Event Rows',
            //     onSelect: (allKeys) => {
            //         const selectedKeys = allKeys.filter(key=> {
            //             return key %2 == 0
            //         })
            //         //setAlreadySelectedRows(selectedKeys)
            //     }

            // }
        ]
      };
    /*const getResources = async (policyType) => {
        let qryString =""
        let params = null;

        console.log("props=", policyType)
        if (policyType =="stopOrphan") {
            params = new URLSearchParams([['isOrphaned', true]]);
        } else if (policyType =="resizeUnderutilized") {
            params = new URLSearchParams([['isTagged', false]]);
        } else if (policyType=="deleteStopped") {
            console.log("I called low use")
            params = new URLSearchParams([['isUnderutilize', true]]);
        }

        console.log("query string", qryString)
        setLoading(true)
         /*option 3 how to make api cal 
       let response =  await API.get("/api/Resources/all/"+policyType,
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
        }).finally(() => {
            setLoading(false)
        });



        //change true/false to string for display
        response.data.forEach((data2, index) => {
            resourceList1.push (
                {
                    resourceId: data2.resourceId,
                    customerId: data2.customerId,
                    cloudAccountId: data2.cloudAccountId,
                    resourceName: data2.resourceName,
                    isTagged: data2.isTagged ? "true" : "false",
                    isOrphaned: data2.isOrphaned ? "true" : "false",
                    utilization:data2.utilization,
                    state: data2.state ,
                    instantType: data2.instantType,
                    costSavings: data2.costSavings
                }
            )
        });
        //setApiRes(resourceList);
        setResourceList(resourceList1);

       // getMetrics(response.data)
        console.log("resource affected " + JSON.stringify(response.data))

    }*/
    const handlePolicyChange = (data) => {
        setPolicyName(data || [])
        console.log("policy Name", data)
        policyData.map((d1) => {
            if (d1.id == data) {
                policyList = {
                    id: d1.id,
                    policyId: d1.policyId,
                    customerId: d1.customerId,
                    name: d1.name,
                    category: d1.category,
                    description: d1.description,
                    rating: d1.rating,
                    isValidated: d1.isValidated,
                    transCompleted: d1.transCompleted,
                }

                if (d1.isRequiredApprover==true &&  d1.status =="approved") {
                    setIsHideAffectedResouceTable(true)
                } else {
                    setIsHideAffectedResouceTable(false)
                    console.log("setIshidden should be false")
                }
                setRateValue(d1.rating)
                setCanDeactivatePolicy(d1.isRequiredApprover)
                setPolicyStatus(d1.status)
                resourceCategory = d1.category
                console.log("rate value =" + d1.rating)
                console.log("policy output output", d1.name + " id =" + d1.id)
            }
        })

        setPolicyDetails(policyList);
        getResourcesAffected(resourceCategory)
        setMetricDetails(resourceCategory)
    }

    let userX = []
    
    const handleChange = (selectedOptions) => {
        userX =[]
       
        let approverStruct =[]
        console.log("handledChange =", selectedOptions.length )
        
       
        setApproversId(selectedOptions)
        userX = approversData

        console.log("my approver data =", userX)
        setApproverName2(selectedOptions || []);

        // selectedOptions.map((aData1, key) => {
        //     console.log("policyId", aData1)
        //     let i = aData1 + "1"
        //    userX2 = userX.filter((aData2, i) => aData2.id = aData1)
        //    //console.log("User output", JSON.stringify(user))
        // })
       
        // selectedOptions.forEach(select => {
        //     console.log("select =", select)
        //     //userX2 = userX.filter((aData2, i) => aData2.id = select)

        // });

        //const user2 = data.filter(user => user.username == username && user.password === password)
        
        
        console.log("id.length =",selectedOptions.length)
        
        /*treverse the id from the approver dropdown
        for each Id, get the approver record from the UserX
        object then push the record into the ApproverList object*/
        /*if (selectedOptions.length >0)  {
            selectedOptions.map((recId, key) => {

                const filterApproverRecord =userX.filter(approverRecord => approverRecord.id = recId)
                console.log("approverRecord.id=", "recId="+recId)
                console.log(" filterApproverRecord =",  JSON.stringify(filterApproverRecord))
                filterApproverRecord.map((d1, key) => {
                    /*push data into the approverlist object*/
                    /*approverList.push(
                        {
                            approvalId: 0,
                            customerId: customerId,
                            policyId: 0,
                            profileUuid: d1.profileUuid,
                            firstName: d1.firstName,
                            lastName: d1.lastName,
                            title: d1.title,
                            isApproved: false,
                            id: d1.id
                        }
                    )
                })  
            })
        
        } */
        
        //getApproverDetails(selectedOptions, userX)

        selectedOptions.map((id, key) => {
            
            console.log("id inside selectedOption =", id.profileid)
            //getApproverDetails(id)
            getApproverDetails(id, approversData2)
        })
        console.log(" end handledChange =", selectedOptions )
        console.log("approverName2 length", approverName2.length+1)
        selectedOptions = null;
        console.log(" end handledChange =", selectedOptions )
       
            setApproverDetailsCount(approverName2.length+1)
        
        
        //setApproverDetails(approverList);

       // console.log("approver list =="+id, approverList)
        
    }

    const getApproverDetails  = async (id, data) => {
        /*console.log("i called getapprover Details")
        console.log("value of data1 = ", id)
        let params = null;
        params = new URLSearchParams('?id='+ id);
        let response = []
        response = await API.get("http://localhost:3000/profile", {params}).catch((err) => {
            setError(err.response.status);
            console.log("Here " + JSON.stringify(err.response.status))
        }).finally(() => {
            setLoading(false);
        });

        console.log("getApproverDetails ==", JSON.stringify(response.data))
        console.log("getApproverDetails response code ==", response.status)

        console.log("Record count ==",response.data.length)
        if (response.data.length > 0 ){
            console.log("I am in side")
            response.data.map((d1) => {
                console.log("I am pushing")
                approverList.push(
                    {
                        approvalId: 0,
                        customerId: customerId,
                        policyId: 0,
                        profileUuid: d1.profileUuid,
                        firstName: d1.firstName,
                        lastName: d1.lastName,
                        title: d1.title,
                        isApproved: false,
                        id: d1.id
                    }
                ) 
            })
            
        }*/
        
       
      


        //setApproversData(response.data)
        //console.log("my 2 approver =" + JSON.stringify(data2))
        // let approverList =[]
        // data1.map((d1) => {
        //     data2.map((d2, key) => {
        //         if (d1 == d2.id) {
        //             console.log("data2 output", d2.firstName + " id =" + d1)
        //             approverList.push(
        //                 {
        //                     firstName: d2.firstName,
        //                     lastName: d2.lastName,
        //                     title: d2.title,
        //                     id: d2.id,
        //                 }
        //             ) 
                        
                    
        //         }
        //     })
        // })
        //setApproverDetails(null)
        
        /*treverse the id from the approver dropdown
        for each Id, get the approver record from the UserX
        object then push the record into the ApproverList object*/
        setApproverDetails(null) //clear
        /*if (data.length >0)  {
            data.map((recId, key) => {

                const filterApproverRecord =userX.filter(approverRecord => approverRecord.id = recId)
                console.log("approverRecord.id=", "recId="+recId)
                console.log(" filterApproverRecord =",  JSON.stringify(filterApproverRecord))
                filterApproverRecord.map((d1, key) => {
                    /*push data into the approverlist object*/
                    /*approverList.push(
                        {
                            approvalId: 0,
                            customerId: customerId,
                            policyId: 0,
                            profileUuid: d1.profileUuid,
                            firstName: d1.firstName,
                            lastName: d1.lastName,
                            title: d1.title,
                            isApproved: false,
                            id: d1.id
                        }
                    )
                })  
            })
        
        } */
        console.log("id = ", id)
        console.log("Data=", JSON.stringify(data))
       
        data.map((d1, key) => {
            if (d1.profileid == id) {
                console.log("we are moving forward")
                 approverList.push(
                    {
                        approvalId: 0,
                        customerId: customerId,
                        policyId: 0,
                        profileUuid: d1.profileUuid,
                        firstName: d1.firstName,
                        lastName: d1.lastName,
                        title: d1.title,
                        isApproved: false,
                        id: d1.id
                    }
                )
            }
            // const filterApproverRecord =data.filter(approverRecord => approverRecord.id = id)
            // console.log("approverRecord.id=", "selectionId="+id)
            // console.log(" filterApproverRecord =",  JSON.stringify(filterApproverRecord))
            setApproverDetails(approverList);
            console.log("I am here", id)
        })

        console.log("approver list =="+id, approverList)
        
    }

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Nam",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        }
    ]
    const [iApprovers, setIApprovers] = useState(null);
    const [iApprovers2, setIApprovers2] = useState([{profileUuId:"", name: ""}]);
    const [policyId, setPolicyId] = useState(0);
    const [policyName, setPolicyName] = useState('');
    const [approverName, setApproverName]= useState([]);
    const [approverName2, setApproverName2]= useState([]);
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [rateValue, setRateValue] = useState(0);
    const [approvalRecId, setApprovalRecId] = useState(0);
    const [resCode, setResCode] = useState(0);
    
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const OkModal = () => {
        submitApproval()
        setOpen(false);
    }

    let affectResourceList =[]


   
    const submitApproval = async () => {
        
        console.log("active account id =", activeCloudAccountId)
        console.log("active policeId =", policyId)
        console.log("resource select =", selectedRowKeys)
        console.log("approvers id =", approversId)
        console.log("I am submitted")
        console.log("value of open =", open)
       
       /* let approvalId = Math.floor(Math.random() * 10000)


        console.log("newly generated approvalId=", approvalId)
        resourceList.forEach((data2, index) => {
            console.log("resource list output == ", data2.resourceName)
            affectResourceList.push (
                {
                    resourceId: data2.resourceId,
                    resourceName: data2.resourceName,
                    instantType: data2.instantType
                }
            )
        })
        */

        setLoading(true)
        console.log("I called the api")
        let response =  await API.post('/api/Approval/addworkflow',
            {
                policyId: policyId,
                accountId: activeCloudAccountId,
                resourceIds: selectedRowKeys,
                approvers: approversId,
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + accessToken,
                    'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
            
                }
            },
        ).catch((err2) => {
            setError(err2);
        }).finally(() => {
            setLoading(false)
            
        });

        setLoading(false)

        console.log("submitted approval success code =",  response.data.success)
        console.log("Submitted Approval =", JSON.stringify(response.data))


        setResCode(response.status);
        
        console.log("resCode =", resCode)
        if (response.status == 200) {
           
            console.log("Workflow was added")
              //clean up
              setIsUpdateSuccess(true);
              setPolicyName('');
              setApproverName2([]);
              setApproverDetails('');
              setMetricDetails('');
           
        }

        /*let submissionDateTime = new Date().toLocaleString();
        API.post('/api/Approval/addworkflow', {
                policyId: policyId,
                accountid: activeCloudAccountId,
                resourceId: selectedRowKeys,
                approvers: approversId

          }).then((res) => {
              //setRegisterProfile(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
              //setLoginAPIResponse());
              
              console.log("create approval header status == " + res.status);
              console.log("payload", JSON.stringify(res.data))
              console.log("data = " + res.data)
              console.log("approval Id =", res.data.approvalId)
              
              setApprovalRecId(res.data.approvalId)
          }).catch((err) => {
              //setRegisterProfile(err);
              console.log("failed status == " + JSON.stringify(err.response.data));
          }).finally(() => {
              setLoading(false)
          });



          console.log("submitted approval success code =", response.status)
          console.log("Submitted Approval =", JSON.stringify(response.data))
          /*
          let recCount = approverDetails.length;
          let counter = 0;
          console.log("approvalId after approvalheader", approvalId)
          approverDetails.map((d1) => {
            counter +=1;
            const approvalList3 =
                {
                    "approvalId": approvalId,
                    "customerId": customerId,
                    "policyId": policyDetails.policyId,
                    "profileUuid": d1.profileUuid,
                    "firstName": d1.firstName,
                    "lastName": d1.lastName,
                    "title": d1.title,
                    "status": "",
                    "isApproved": false,
                    //"id": d1.id,
                }
            
            
            submitApprovers(approvalList3, recCount,counter)
            //i -= 1;
          })


          console.log("approvalRecId=", approvalRecId)
          let data = [
            {
                approvalId: approvalRecId,
                customerId: 1,
                policyId: 1,
                profileUuid: 1,
                approverName: "Dominic Brooks",
                title: "Dev Manager",
                isApproved: false
            },
            {
                approvalId: approvalRecId,
                customerId: 1,
                policyId: 1,
                profileUuid: 2,
                approverName: "John Lewis",
                title: "nager",
                isApproved: false,
            }]

       
        //pass approver data to be added
       
        // approverDetails.map((data1) => {
        //     console.log("counter =", i)
            
        //     console.log("my i", i)
        // })


        */
          
    };

   
    const submitApprovers = async (data, recCount,counter) => {
        
        console.log("IGHEDOSA APPROVAL LIST="+ counter, JSON.stringify(data))
        /*create individual approver object and submit
        this will change once we start using the real app
        we can submit an array of objects and let the backend
        take care of parsing*/
        // data.map((d1, key) => {
        //     let approverRecord = {};
        //     approverRecord = {
        //         approvalId: d1.approvelId,
        //         customerId: d1.customerId,
        //         policyId: d1.policyId,
        //         profileUuid: d1.profileUuId,
        //         firstName: d1.firstName,
        //         lastName: d1.lastName,
        //         title: d1.title,
        //         isApproved: d1.isApprove,
        //         id: d1.id
        //     }

        // })

        let responseCode = 0;



        API.post('http://localhost:3000/policyApprovalApprovers', data
     
            
      ).then((res) => {
          //setRegisterProfile(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
          //setLoginAPIResponse());
          
          console.log("create approval header status == " + res.status);
          responseCode = res.status;
          setResCode(res.status);
          console.log("payload", JSON.stringify(res.data))
          console.log("data = " + res.data)
          //console.log("approval Id =", res.data.approvalId)
          //setApprovalRecId(res.data.approvalId)
          console.log("response code =", responseCode)
          console.log("resCode =", resCode)
          if (res.status > 200 && res.status < 299) {
            console.log("I am between 201 and 299")
            if (recCount == counter) {
                console.log("SUCCESS GO FORWARD")
                //clean up
                setIsUpdateSuccess(true);
                setPolicyName('');
                setApproverName2([]);
                setApproverDetails('');
                setMetricDetails('');

                //refresh api.. may not need this
                getPolicies();
                getApprovers(); //this is refreshing approverData
                setCustomerId(state.customerId);
                setSubmitterName(state.firstName + " " + state.lastName);
                setSubmitterUuid(state.profileUuid);
                setApproverDetailsCount(0); //use to display approver table
        
            }
          }
      }).catch((err) => {
          //setRegisterProfile(err);
          console.log("failed status == " + JSON.stringify(err.response.data));
      }).finally(() => {
          setLoading(false)
      });

      
      console.log("submit Appover count", counter)
      console.log("recordr count", recCount)
    //   console.log("approve data", res.data)
    //   console.log("approve record code", res.status)
      
    
        
      console.log("setIsUpdateSucces =", isUpdateSuccess)
    }

    /* tun ryl*/
    const runETL = async () => {


        //let response = []

        console.log("RUN ETL activeCloudAccountId =", activeCloudAccountId)
        setLoading(true)
        console.log("RUN ETL access toke =", accessToken)
        console.log("RUN ETL xapiKeywithUserNam =", xapiKeyWithUserName)
        let response = await API.get("/api/Resource/invokeetl/"+activeCloudAccountId, 
        {
            headers: {
              'accept': 'text/plain',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + accessToken,
              'X-Api-Key': xapiKeyWithUserName , //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
         
            }
          },
          
        
        ).catch((err) => {
            setError(err.response.status);
            console.log("RUN ETL Here " + JSON.stringify(err.response.status))
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false)
        console.log("ETL Data == ", JSON.stringify(response.data))
    }

    return (

        

        
       
        <Space size={20} direction="vertical" >
            {/* {loading == true ?
                <>
                <Spin tip="Processing...please wait" size="large">
                    <div className="content" />
                </Spin>
            
                </> : ""
            } */}

            <Spin spinning={loading} size="large" fullscreen />

           <Typography.Title level={4} >Run ETL</Typography.Title>
           
            {isUpdateSuccess ==true ? 
                <Alert message="Your request was successfully submitted." type="success" /> : "" }
            
            <div >
            {canDeactivatePolicy ==true &&  policyStatus == "approved" ? 
                <Alert message="Note: This policy is currently active and in production. To change this policy, you must submit an approval request
                please select your approver(s) to proceed." type="info" /> 
            : ""}
            
              
            <Modal
                title="Policy Run Review and Approval"
                open={open}
                onOk={OkModal}
                onCancel={hideModal}
                okText="Continue"
                cancelText="Cancel"
            >
                <p>Would you like to proceed with submitting this policy run for review and approval?</p>
                <p></p>
                <p>Please note that once all approvers have approved, this policy will execute automatically</p>
            </Modal>
            </div>
                
                
                <Form
                    onFinish={onFinish}
                    onSubmit = {handleSubmit}
                >
                {/*
                <h4>Select Policy</h4>
                <Select 
                    value={policyName} 
                    
                    onChange={handlePolicyChange} 
                    style={{width:'500px'}}
                    options={policyData.map((policy, key) => {
                        if (policy.status =="approved" && policy.isRequiredApprover == true) {
                            console.log("make it bold", policy.name)
                            {<b>Dominic</b>}
                            return {
                                label: <b>{policy.name}</b>,
                                value: policy.policyId,
                                
                            }
                        } else {
                            return {
                                label: policy.name,
                                value: policy.policyId,
                                
                            }
                        }
                       
                    })

                    }
                    placeholder='Select Policy' 
                />
                <br></br><br></br> */}
                <div>
                <h4>Select Clound accountId</h4>
                <Form.Item name="cloudAccount" label="" requiredMark="optional">
                    <Select 
                    
                    
                    placeholder="Select cloud account" 
                    style={{width:'500px'}}
                    onChange={getPoliciesUsingAccountId}>
                        {availableCloudAccounts.map((account, key) => { 
                            return  <Select.Option value={account.id} key={key} >{account.label}</Select.Option>
                        
                        })}
                    </Select>
                </Form.Item>
                </div>
           
                
                <Space direction="vertical"
                    style={{
                    width: '100%',
                    
                    }} >
                   <button class="buttonPrimary" onClick={runETL}>Refresh Data</button>
                   
                </Space>
                </Form>
            
                <></>

        </Space>
    );
}

export default ETL;