
import React, { useState } from 'react';
import { Radio, Tabs, Typography, TabsProps} from 'antd';
import Registration from '../../Pages/Admin/Registration/Registration';
import EditProfile from '../../Pages/Admin/Registration/EditProfile';
import CreateProfileStatus from '../../Pages/Admin/Registration/CreateProfileStatus';
import PolicyMgmt from '../../Pages/Admin/PolicyMgmt/PolicyMgmt';
import SuperAdmin from '../../Pages/Admin/SuperAdmin/SuperAdmin';
import Profile from '../Profile/Profile';
import DefaultSettings from './DefaultSettings';

function Settings () {

  const items = [
    {
      key: '1',
      label: `My Profile`,
      children: <> <div><Profile /></div></>
    },
    {
      key: '2',
      label: `Default Settings`,
      children: <DefaultSettings/>,
    },
    {
      key: '3',
      label: `Privacy`,
      children: "Policy goes here",
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
export default Settings;