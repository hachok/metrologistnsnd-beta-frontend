import React, {Component} from 'react';
import '../style/App.css';
import Login from "./Login";
import {Switch,Route,Redirect} from 'react-router-dom'
import SignUp from "../SignUp";
import history from '../history';
import {Router} from "react-router-dom";

import History from "./History";
import { GC_USER_ID, RESET_TOKEN as resetToken} from '../constants'
import MenuUser from "../menu/MenuUser";
import ForgetPassword from "./ForgetPassword";
import ConfirmResetPassword from "./ConfirmResetPassword";
import MenuTabPanel from "./MenuTabPanel";
import AddDevice from "./AddDevice";
import PleaseConfirmEmail from "./PleaseConfirmEmail";
import CheckYourEmail from "./CheckYourEmail";


class App extends Component {

    render() {
        const userId = localStorage.getItem(GC_USER_ID);

        return (

            <div className="App">
                <div className="App-header">

                    <Switch>
                        <Router history={history}>
                    <Route exact path="/" component={MenuTabPanel} />
            
             <Route exact path={"/check-email"} component={CheckYourEmail}/>
                    <Route path={"/confirm-email"} component={PleaseConfirmEmail}/>
                            <Route exact path="/reset-password" component={ForgetPassword} />
             <Route exact path="/login" component={Login}/>
                            <Route exact path={"/reset-password/"+resetToken} component={ConfirmResetPassword}/>
                    <Route exact path="/signup" component={SignUp} />

                           
                                {userId ? ( <Redirect to={{path:"/user"}} component={MenuUser}/>


                                ):(<Redirect to={{path:'/', state:'Please Login In'}}/>)
                                }
                             <Route exact path="/user" component={MenuUser}/>
                                    <Route exact path="/add-device" component={AddDevice} />
                                   
                        </Router>
                    </Switch>

                </div>
            </div> )
    }
}


export default App;
