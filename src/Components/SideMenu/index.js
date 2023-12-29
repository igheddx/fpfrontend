import '../../App.css';
import {Menu, Badge} from "antd"
import {useNavigate, useLocation} from "react-router-dom";

import {useEffect, useState, useContext} from "react";
import { Context } from '../../Store';
import axios from "axios";


import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    CheckOutlined,
    DashboardOutlined,
    SyncOutlined,
    ToolOutlined,
  } from "@ant-design/icons";
import Login from '../../Pages/Logins/LoginHold1';
import useBearStore from "../../state/state";

function SideMenu() {

    const [state, setState] = useContext(Context);
    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState('/')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiRes, setApiRes] = useState([])
    const [menu, setMenu] = useState([])
    const [role, setRole] = useState('');
    const [zeroCount, setZeroCount] = useState(0)
   
    
    let pathName2 = [];
    useEffect(() => {
       
        if (zeroCount == 0 ){

            console.log("I called getUseRole")
            //sgetUserRole()
            getUserRole()
        }
        
      const pathName = location.pathname;
      
      if(pathName ==="/logout"){
        console.log("logout is selected 1");
        setSelectedKeys("/");
        pathName2 = '/';
      } else {
        console.log("logout no in use" + pathName);
        setSelectedKeys(pathName);
        pathName2 = pathName;
      }
      
      console.log("my path = " + location.pathname);
      console.log("my pathname2 = " + pathName2)
    }, [])

    let count = 3;
    const customerAdminRole =[
        {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />,
        }, 
        {
            label: "Run Policy",
            key: "/policy",
            icon: <SyncOutlined />,
        },
        {
            label: "Approvals",
            key: "/approval",
            icon: <Badge Count={2} dot><CheckOutlined /></Badge>,
        },
        {
            label: "Administration",
            key: "/admin",
            icon: <ToolOutlined />,
        },
        {
            label: "Settings",
            key: "/settings",
            icon: <SettingOutlined />,
            // children: [
            //     {label: "Profile", key: "/profile", icon: <UserOutlined />},
            //     {label: "Privacy", key: "/privacy"},
            //     {label: "Terms and Condition", key: "/tnc"},
            // ],
        },
        {
            label: "Log Out",
            key: "/logout",
            icon: <LogoutOutlined  />,
            danger: true,
        },    
    ]

    const viewerRole =[
        {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />,
        }, 
        {
            label: "Settings",
            key: "/settings",
            icon: <SettingOutlined />,
            // children: [
            //     {label: "Profile", key: "/profile", icon: <UserOutlined />},
            //     {label: "Privacy", key: "/privacy"},
            //     {label: "Terms and Condition", key: "/tnc"},
            // ],
        },
        {
            label: "Log Out",
            key: "/logout",
            icon: <LogoutOutlined  />,
            danger: true,
        },    
    ]

    const approverRole =[
        {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />,
        }, 
        {
            label: "Approvals",
            key: "/approval",
            icon: <Badge count={count} dot><CheckOutlined /></Badge>,
        },
        {
            label: "Settings",
            key: "/settings",
            icon: <SettingOutlined />,
            // children: [
            //     {label: "Profile", key: "/profile", icon: <UserOutlined />},
            //     {label: "Privacy", key: "/privacy"},
            //     {label: "Terms and Condition", key: "/tnc"},
            // ],
        },
        {
            label: "Log Out",
            key: "/logout",
            icon: <LogoutOutlined  />,
            danger: true,
        },    
    ]

    const superAdminRole =[
        {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />,
        }, 

        {
            label: "Administration",
            key: "/admin",
            icon: <ToolOutlined />,
        },
        {
            label: "Settings",
            key: "/settings",
            icon: <SettingOutlined />,
            // children: [
            //     {label: "Profile", key: "/profile", icon: <UserOutlined />},
            //     {label: "Privacy", key: "/privacy"},
            //     {label: "Terms and Condition", key: "/tnc"},
            // ],
        },
        {
            label: "Log Out",
            key: "/logout",
            icon: <LogoutOutlined  />,
            danger: true,
        },    
    ]

  

    const API = axios.create({
     });

     const getUserRole = () => {
        //setZeroCount(0)
        //console.log("my role is ", s)
       console.log("role JSON I was called= ", state.role)

        let profileRole = sessionStorage.getItem('roleData')


       // console.log("isRootAdmi 1 = ",state.isRootAdmin  )
        if (state.isRootAdmin == "true" ){
            profileRole = state.role
            console.log("isRootAdmin = true")
        }
        const USER_TYPES = {
            PUBLIC: 'Public User',
            NORMAL_USER: "User",
            CUSTOMER_ADMIN_USER: "Customer",
            SUPER_ADMIN_USER: "Super Admin User",
            APPROVER_USER: "Approver User"
        }
        
        const CURRENT_USER_TYPE = profileRole;
        
       

        switch(CURRENT_USER_TYPE) {
            case USER_TYPES.CUSTOMER_ADMIN_USER:
                return setMenu(customerAdminRole);
            case USER_TYPES.NORMAL_USER:
                console.log("i am a viewer")
                return setMenu(viewerRole);
            case USER_TYPES.APPROVER_USER:    
                return setMenu(approverRole);
            case USER_TYPES.SUPER_ADMIN_USER:    
                console.log("My ROLE IS CUSTOMER")
                return setMenu(superAdminRole);
            default:
                return setMenu(viewerRole);
        };
        
     }
    const makeGetApiCall = async () => {
        //e.preventDefault();
        setLoading(true)
        let response = await API.get("http://localhost:3000/adminRole").catch((err) => {
            setError(err);
            console.log("Here " + err.response.data)
        }).finally(() => {
            setLoading(false);
        });

        setApiRes(response.data)
        console.log(JSON.stringify(response.data))
        console.log("menu = " + response.data)
        switch(state.role) {
            case 'admin':
                return setMenu(customerAdminRole);
            case 'viewer':
                console.log("i am a viewer")
                return setMenu(viewerRole);
            case 'approver':    
                return setMenu(approverRole);
            case 'superAdmin':    
                return setMenu(superAdminRole);
            default:
                return setMenu(viewerRole);
        };
        
        //authenticate(response.data)
    }


    
    const setIsUserValid = useBearStore((state) => state.setIsUserValid);

    const navigate = useNavigate()
    return (
        <div className='SideMenu'>
            <Menu
                className='SideMenuVertical'
                mode='vertical'
                onClick ={(item)=>{
                    //item key
                    
                    console.log(item.key)
                    if(item.key ==="/logout"){
                        
                       // setState([])
                        setMenu([])
                        setSelectedKeys("/")
                        setIsUserValid(false);
                        console.log("selectedKeys = " + selectedKeys)
        
                        console.log("i am logging out = pathname2 =" + pathName2)
                        pathName2 = "/"
                    } else {
                        pathName2 = item.key
                    }
                    navigate(pathName2)
                }}
                selectedKeys={[selectedKeys]}
                items={menu}
                    
            > </Menu>
        </div>

    )
}

export default SideMenu