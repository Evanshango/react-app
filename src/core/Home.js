import React from "react";
import Posts from "../post/Posts";

const Home = () => (
    <div>
        <div className='jumbotron'>
            <div className='text-center'>
                <h2>React is really awesome</h2>
            </div>
        </div>
        <div className="container">
            <Posts/>
        </div>
    </div>
);

export default Home;
