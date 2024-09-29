import { Navigate, Outlet } from "react-router-dom";
import {Space} from "antd"
import './App.css';
import AppHeader from "./Components/AppHeader";
import SideMenu from "./Components/SideMenu";
import PageContent from "./Components/PageContent";
import AppFooter from "./Components/AppFooter";

import useBearStore from "../src/state/state";
import Login1 from "./Pages/Logins/Login1";
import Signin from './Pages/Logins/Signin';
import Store from './Store';
import Jokes from "./Components/Jokes";
import Jokes2 from "./Components/Jokes2";
function App() {
  


  const isUserValid = useBearStore((state) => state.isUserValid);

  //console.log("isUserValue =" + isUserValid)
  // return <div>{isUserValid ? <Outlet /> : <Navigate to={"login"} />}</div>;

  return isUserValid ? (
    <Store>
    <div className="App">
      
      <AppHeader props={"Dominic Ighedosa"} />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <PageContent></PageContent>
        </div>
      <AppFooter />
    </div>
    </Store>
  ) : (
    <Store>
         {/* this example of self-contain component w/ API serivce call <Jokes /> */}
    <div className="App">
    <Signin/>
    
    </div>
    </Store>
  );
}

export default App;
