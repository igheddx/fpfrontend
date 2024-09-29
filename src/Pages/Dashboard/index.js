import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
    TagOutlined,
    ArrowDownOutlined,
    MinusCircleFilled,
  } from "@ant-design/icons";
  import MetricsCards1 from "../../Components/Metrics/metricsCards1";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { useEffect, useState,  useContext } from "react";
  import { getCustomers, getInventory, getOrders, getRevenue } from "../../apis";
  import { Link } from 'react-router-dom';
  import OrphanResources from "./OrphanResources";
  import LowUtilization from "./LowUtilization";
  import UntaggedResources from "./UntaggedResources";
  import CostSavings from "./CostSavings";
  import CostSavingsDonutChart from "./Charts/CostSavingsDonutChart";
  import axios from "axios";
  import CryptoJS from 'crypto-js';
  import { Context } from '../../Store';
  import { setGlobalState, useGlobalState} from '../../state2';
  import ResourceTable
   from "../../Components/General/ResourceTable";
  //import useAPI from "../../hooks/useAPI";
//import useAxios from "../../hooks/useAxios";
//import fpFrontEnd from "../../apis/fpFrontEnd";
//import getResources from "../../apis/getResources";
//import MetricsCards1 from "../../Components/Metrics/MetricsCards1";



import {
    Chart as ChartJS,
    CategoryScale,

    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Jokes2 from "../../Components/Jokes2";
//import MetricsCards1 from "../../Components/Metrics/metricsCards1";
import Jokes from "../../Components/Jokes";
//import useAxios from "../../hooks/useAxios";
//import axiosInstance from "../../services/apiService";
// import useAxios from "../../hooks/useAPI";



ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);
function Dashboard() {
    const [state, setState] = useContext(Context);
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [metricDetails, setMetricDetails] = useState("");
    const [apiRes, setApiRes] = useState([])
    const [customerId, setCustomerId] = useState(0)
    const [error, setError] = useState('');
    const currentAccountId = useGlobalState("accountId");
    const currentAccountName = useGlobalState("accountName");
    const defaultAccountId = useGlobalState("defaultAccountId");
    const [resourceList, setResourceList] = useState([]);
    const [apiResponse, setApiResponse] = useState({})
    const [loginAPIResponse, setLoginAPIResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [apikey, setAPIKey] = useState('')

   
    //const {data1, loading1, error1} = useAPI('/api/Resource/counts/5/40')
    
    //const {response1, error1, loading1, status1, fetchData} = useAxios();



    //x-API-Key = 8216EB35-BB77-49AD-94CA-A7C3520DC464
    const getEncryption=() => {
        const data = '8216EB35-BB77-49AD-94CA-A7C3520DC464';
        const iv = 'F5cEUty4UwQL2EyW';
        const key = 'CHqcPp7MN3mTY3nF6TWHdG8dHPVSgJBj';

        const fkey = CryptoJS.enc.Utf8.parse(key);
        const fiv = CryptoJS.enc.Utf8.parse(iv);

        const enc = CryptoJS.AES.encrypt(data, fkey, {
                iv: fiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
        });

        const final = enc.ciphertext.toString(CryptoJS.enc.Base64);
        setAPIKey(final);

        console.log("my encryption = " + final )
    };

    const profileData = 
        {
            customerid: 11,
            cloudCustomerId: "johntravoltacloud111",
            profileid: 9,
            profileUUID: "johntravolta",
            firstName: "john",
            lastName: "travolta",
            email: "johntravolta@mail.com",
            phone: "800-555-1234",
        }
    
    let accessToken = sessionStorage.getItem('accessTokenData')
    let xapiKeyWithUserName = sessionStorage.getItem('xapikey')
    useEffect (() =>{

      
        if (apiRes.length == 0 ) {
            console.log("apires = 0")
            //makeAPICalls()
        }
        setCustomerId(state.customerId)
        // getOrders().then((res) => {
        //     setOrders(res.total);
        //     setRevenue(res.discountedTotal)
        // });
        // getInventory().then((res) => {
        //     setInventory(res.total);
        // });
        // getCustomers().then((res) => {
        //     setCustomers(res.total);
        // });
        // getRevenue().then((res) => {
        //     setRevenue(res.total);
        // });
        // setMetricDetails("John");
       
    }, [apiRes])

    useEffect (() =>{
        //refreshMetrics()
        console.log("default account Me Dashbboard ==", defaultAccountId)
        getMyMetrics();
        
    }, [currentAccountId])

    const handleLinkClick = (card) => {
        console.log('Link clicked' + card);
    };

    


    const refreshMetrics = () => {
        console.log("I made a call to refreshh metrics")
    }
   
    const API =  axios.create({
    });

    API.interceptors.request.use(function(config){
        //do stuff in here
        //setLoading(true)
        return config
    }, function(error) {
        return Promise.reject(error);
    });

    API.interceptors.response.use(function(response){
        //do stuff in here
        //setLoading(false)
        return response
    }, function(error) {
        return Promise.reject(error);
    });
    
    const makeAPICalls = async () => {
        setLoading(true)
         /*option 3 how to make api cal */
       let response = await API.get("http://localhost:3000/resources"
       ).catch((err) => {
            setApiResponse(err);
        }).finally(() => {
            setLoading(false)
        });


        //console.log("MASTER RESOURCES =", JSON.stringify(response.data))
        //setApiRes(response.data)
        getMetrics(response.data)
        //console.log("I am here " + response.data)
    };


    const makeAPICalls2 = async () => {
        setLoading(true)
         /*option 3 how to make api cal */
       let response = await API.get("http://localhost:3000/costSavings"
       ).catch((err) => {
            setApiResponse(err);
        }).finally(() => {
            setLoading(false)
        });


        //setApiRes(response.data)
        getMetrics(response.data)
        //console.log("I am here " + response.data)
    };

    // const makeGetApiCall = async () => {
    //     //e.preventDefault();
    //     setLoading(true)
    //     let response = await API.get("http://localhost:3000/adminRole").catch((err) => {
    //         setError(err);
    //         console.log("Here " + err.response.data)
    //     }).finally(() => {
    //         setLoading(false);
    //     });
    /* another way to post data
    axios({
        method: 'POST',
        url: 'http://localhost:3001/users/login',
        data: { username, password },
        validateStatus: () => true
    }).then(res => {
        console.log(res.status);
    }); */

    const makePostAPICalls=() => {
        setLoading(true)
        API.post("/api/Customer/authenticate/", {
            username: "johntravolta",
            password: "pass1234"
        }).then((res) => {
            setLoginAPIResponse(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
            //setLoginAPIResponse());
            
            console.log("status == " + res.status);
            console.log("data = " + res.data)
        }).catch((err) => {
            setLoginAPIResponse(err);
            console.log("failed status == " + err.status);
        }).finally(() => {
            setLoading(false)
        });
    };
    
    const profileStruct =  {
        firstName: "",
        lastName: "",
        customerid: 0,
        cloudCustomerId: "",
        profileid: 0,
        profileUUID: 0,
        token: "",
    }

   /*create account */
   var registerData = {
        customerid: 13,
        cloudCustomerId: "johntravoltacloud111",
        profileid: 11,
        profileUUID: "test1@me.com",
        firstName: "Test1",
        lastName: "Test1",
        email: "test1@me.com",
        phone: "6825004353",
        isintegratedWithAD: false,
        status: 1,
    }

    /*get metrics */
    const metrics = 
    {
        customerid: 13,
        cloudCustomerId: "johntravoltacloud111",
        metrics: [
        {
            id: "orphan",
            value: 524,
        },
        {
            id: "lowuse",
            value: 220,
        },
        {
            id: "untagged",
            value: 1020,
        },
        {
            id: "costsavings",
            value: 20000,
        }]

    };
    
    const [metric, setMetric] = useState(metrics)
    const [orphanCount, setOrphanCount] = useState(0)
    const [lowUseCount, setLowUseCount] = useState(0)
    const [untaggedCount, setUntaggedCount] = useState(0)
    const [costSavings, setCostSavings] = useState(0)
    //const [fetchMetrics, setFetchMetrics] = useState(true)

    let [getProfile, setGetProfile] = useState(profileStruct)
    
    const getMetrics = (data1)  => {

        
        const metricOrphan = data1.filter(data => data.isOrphaned === true && data.customerId == state.customerId);
        setOrphanCount(metricOrphan.length)

        const metricUtil = data1.filter(data => data.utilization <= 60);
        console.log("Low Util count =", metricUtil.length )
        setLowUseCount(metricUtil.length)

        const metricTagged = data1.filter(data => data.isTagged === false);
        setUntaggedCount(metricTagged.length)

        /*const metricCostSavings = data1.filter(data => data.customerId == state.customerId);
        console.log("METRICS customerId = ", customerId)
        console.log("METRICS COST SAVINGS", JSON.stringify(metricCostSavings))
        const metricCostSavingsSum = metricCostSavings.map(item => item.costSavings).reduce((a, b) => a + b) */
        setCostSavings(0)

       // const result = metricCostSavings.reduce((total, currentValue) => total = total + currentValue.prix,0);

    }

    
    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    const list =[];

    const getMyMetrics = async () => {
        //console.log("getPoliciesUsingAccountId data =", JSON.stringify())
      
        let accountId = null;
        let myDefaultAccountId = null;
        let myCurrentAccountId = null;
        /*if the defaultAccountId is not 0 then use that to pull the metrics else
        use the value from the dropdown selection*/
        console.log("current AccountId=", currentAccountId)
        console.log("default AccountId==", defaultAccountId )
        
  
        /*extract defaultAccountId from object*/
        defaultAccountId.map((d1, key) =>{
            console.log("my key==", key)
            if (key == 0){
                myDefaultAccountId  = d1
            }
        })

         /*extract AccountId from object*/
        currentAccountId.map((d1, key) =>{
            console.log("my key==", key)
            if (key == 0){
                myCurrentAccountId = d1
            }
        })


        if (myDefaultAccountId != 0) {
    
            accountId = myDefaultAccountId;
        } else {
            console.log("currentAccount==", currentAccountId)

            accountId = myCurrentAccountId 
        }


        let response = []
        //let params = new URLSearchParams('?accountId='+myCustomerId+'&isActive=true');
        //let params = new URLSearchParams(accountId);
        
        
        
        console.log("access toke =", accessToken)
        console.log("xapiKeywithUserNam =", xapiKeyWithUserName)
        /*response = await API.get("/api/Resource/counts/"+accountId+"/40", 
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
        }); */

       /* if (response.status  == 200) {
            
            let data= response.data
            console.log("isOrphaned===", data.isOrphanedCount)
            setOrphanCount(data.isOrphanedCount)
            setUntaggedCount(data.isUntaggedCount)
            setLowUseCount(data.isUnderutilizedCount)
            
            // setApproversData(null) //clear
            // setApproversData2(null) //clear
            // setApproversData(response.data)
            // setApproversData2(response.data)
        }*/
        

        //console.log("metrics=" + JSON.stringify(data1))
       
        // if (response1.status == 200) {
        //     console.log("NAYLA IGHEDOSA")
        // }
            

    }

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



const fetchPosts = async (id) => {
    console.log("@@I was called")
    
    // setMetricDetails("untagged");
    // await fetchData ({
    //     url: "/api/Resource/all/5/0",
    //     method: "GET",
    // });

    let accountId = getAccountId(currentAccountId, defaultAccountId)
    console.log("@@TYPE == ", type)
    setLoading(true)
     /*option 3 how to make api cal */
   let response =  await API.get("/api/Resource/all/"+accountId+"/0",
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

    let type = "untagged"
    response.forEach((data2, index) => {
        data2.isTagged ? (console.log("isTagged ==True== ResourceId", data2.resourceId,)) : (console.log("isTagged ==False== ResourceId", data2.resourceId,)) 

        console.log("TIM HIERE ==", data2.isTagge )
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

        }
       
    });

    setApiRes(resourceList1)

    //setMetricDetails("untagged");


       // console.log("ERROR CODE =", status)
        console .log("NAYLA DATA ==", JSON.stringify(response, null, 2))
        console .log("NAYLA DATA ERROR ==", error)

  
}

const resourceList1 =[];
const getMetricsDetails = async (type) => {

    console.log("@@@Here")
    //fetchPosts()
    //nayla is awesome yayy i love papa he is mochi yayyy
        let accountId = getAccountId(currentAccountId, defaultAccountId)
        console.log("@@TYPE == ", type)
        setLoading(true)
         /*option 3 how to make api cal */
       let response =  await API.get("/api/Resource/all/"+accountId+"/0",
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


       // fetchPosts(accountId); 
   
        response.forEach((data2, index) => {
            data2.isTagged ? (console.log("isTagged ==True== ResourceId", data2.resourceId,)) : (console.log("isTagged ==False== ResourceId", data2.resourceId,)) 

            console.log("TIM HIERE ==", data2.isTagge )
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

            }
           
        });
   
        setApiRes(resourceList1)

        setMetricDetails(type);
  
    }




    const [registerProfile, setRegisterProfile] = useState({registerData})
    const makePostAPICalls2=() => {
        setLoading(true)
        API.post("/api/Customer/register/", {
            firstName: "Dominic",
            lastName: "Ighedosa",
            username: "dominic@finpromptu.com",
            password: "Pass2@23",
            email: "dominic@finpromptu.com",
            phone: "6825004353",
            cloudCustomerId: "johntravoltacloud111"
        }).then((res) => {
            setRegisterProfile(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
            //setLoginAPIResponse());
            
            console.log("status == " + res.status);
            console.log("data = " + res.data)
        }).catch((err) => {
            setRegisterProfile(err);
            console.log("failed status == " + err.status);
        }).finally(() => {
            setLoading(false)
        });
    };

    return (
        <>
       

        <Space size={2} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <MetricsCards1 />

            {/* {"login response data  == " + loginAPIResponse.firstName + "   " + loginAPIResponse.email}
            <br></br>
            {"APIv Keyv==  " + apikey} */}
            {/* <br></br>
            <div>{loading? "Loading...": JSON.stringify(apiResponse)}</div> */}
            {/*<Space direction="horizontal">

           

            <Link onClick={e => {getMetricsDetails("orphan"); getEncryption(); }} > 
                  
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
                        value={untaggedCount}
                    />
                 </Link>
                <Link onClick={e => {getMetricsDetails("orphan"); getEncryption(); }} >
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
                        title={"Orphan Resources"} 
                        //link={<a href="#">Detail</a>}
                        value={orphanCount}
                        
                    />
                </Link>
                
                <Link onClick={e => getMetricsDetails("lowuse")} >
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
                        title={"Low Utilization"} 
                        value={lowUseCount}
                    />
                </Link>

                

                {/* <Link onClick={e => getMetricsDetails("costSavings")} >
                    <DashboardCard 
                        icon={
                            <DollarCircleOutlined 
                            style={{
                                color: "red",
                                backgroundColor: "rgb(255,0,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            } }
                            />
                        }
                        title={"Cost Savings"} 
                        value={costSavings}
                    />
                </Link> 
    
            </Space>
            <Space> 
          
            {/* {metricDetails == "" ? <OrphanResources data={apiRes} type={metricDetails} /> : null}
            {metricDetails == "" ? <DashboardChart />: null} */}

              
              
              {loading && <p>Loading...</p>}

                { metricDetails == "untagged" ? <UntaggedResources data={apiRes}  /> : null}
               {/*metricDetails == "untagged" ? <UntaggedResources data={apiRes}  /> : null}
               {/* {metricDetails == "untagged" ? <DashboardChart /> : null} */}

               {metricDetails == "lowuse" ? <LowUtilization data={apiRes} /> : null}
               {/* {metricDetails == "lowuse" ? <DashboardChart /> : null} */}

               {metricDetails == "orphan" ? <OrphanResources data={apiRes} /> : null}
               {/* {metricDetails == "orphan" ? <DashboardChart />: null} */}

              {/* {metricDetails == "costSavings" ? <CostSavings data={apiRes} sum={costSavings} /> : null}
              
               
               <div style = { {

                    width: '100%',
                    height: '100%',
                    margin: 'auto',
                    padding: '20px',
                 }}> 
                {metricDetails == "costSavings" ? <CostSavingsDonutChart /> : null}</div> */}
                
            </Space>
        
        </>
    );
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

function RecentOrders() {
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
            dataIndex: "id"
        },
        {
            title: "Name",
            dataIndex: "name"
        },

        {
            title: "Group",
            dataIndex: "group"
        },
        {
            title: "Region",
            dataIndex: "region"
        },
        {
            title: "Provider",
            dataIndex: "provider"
        },
        {
            title: "Status",
            dataIndex: "status"
        },



        
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
        
        dataSource={dataSource}
        pagination={false}
        ></Table>
    </>
    );
}

function DashboardChart() {
    const [revenueData, setrevenueData] = useState({
        labels: [],
        datasets: []
    })
    useEffect(() => {
        getRevenue().then(res => {
            const labels = res.carts.map(cart=>{
                return `User-${cart.userId}`
            });

            const data = res.carts.map(cart=>{
                return cart.discountedTotal;
            });

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Cost Savings',
                        data: data,
                        backgroundColor: 'rgba(255,0,0,1)',
                    }
                ],
            };

            setrevenueData(dataSource)
        });
    },[]);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Cost Savings',
            },
        },
    };

    
    return (
        <Card style={{width: 500, height: 250}}>
            <Bar options={options} data={revenueData} />
        </Card>
    )
}

export default Dashboard