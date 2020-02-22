import React from "react";
import {Route, Switch} from 'react-router-dom'
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}/>
            <PrivateRoute exact path='/create-post' component={NewPost}/>
            <Route exact path='/posts/:postId' component={SinglePost}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/signin' component={Signin}/>
            <PrivateRoute exact path='/users/:userId' component={Profile}/>
            <PrivateRoute exact path='/users/edit/:userId' component={EditProfile}/>
            <PrivateRoute exact path='/find-people' component={FindPeople}/>
            <PrivateRoute exact path='/post/edit/:postId' component={EditPost}/>
        </Switch>
    </div>
);

export default MainRouter;
