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

const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/posts/:postId' component={SinglePost}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/signin' component={Signin}/>
            <PrivateRoute exact path='/users/:userId' component={Profile}/>
            <PrivateRoute exact path='/users/edit/:userId' component={EditProfile}/>
            <PrivateRoute exact path='/find-people' component={FindPeople}/>
            <PrivateRoute exact path='/create-post' component={NewPost}/>
        </Switch>
    </div>
);

export default MainRouter;
