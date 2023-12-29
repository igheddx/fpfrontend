import React, { useState } from 'react';
import { Radio, Tabs, Typography, TabsProps} from 'antd';
import Registration from './Registration/Registration';
import EditProfile from './Registration/EditProfile';
import CreateProfileStatus from './Registration/CreateProfileStatus';
import CreateCustomerProfile from './CreateCustomerProfile';
import PolicyMgmt from './PolicyMgmt/PolicyMgmt';
import LinkPolicy from './PolicyMgmt/LinkPolicy';

import SuperAdmin from './SuperAdmin/SuperAdmin';
import index from './../Logins/index.css'

function Administration () {

  const items = [
    {
      key: 1,
      label: `Create Profile`,
      children: <><div><Registration/></div> <br></br><br></br><div><CreateProfileStatus /></div></>
    },
    {
      key: 2,
      label: `Edit Profile`,
      children: <EditProfile/>,
    },
    {
      key: 3,
      label: `Create Policy`,
      children: <PolicyMgmt/>,
    },
    {
      key: 4,
      label: `Link Policy`,
      children: <LinkPolicy/>,
    },
    
    {
      key: 5,
      label: `Super Admin`,
      children: <SuperAdmin/>,
    },
  ];

  const  [adminComp, setAdminComp] = useState('')

  const onChange = (key) => {
    console.log("my key " + key);
    setAdminComp(key)
  };

  return (
    <>
    <Tabs 
    onChange={onChange}
    type="card"
    items={items}
    />
 
  </>
  )
   
};
export default Administration;