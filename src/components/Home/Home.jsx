import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.scss";

function Home() {
    const history = useHistory();
    
    function click () {
        history.push('/wheel')
    }

    return (
        <div className="home">
            <div className="title">wheel it</div>
            <div className="description">
                Build your fortune wheel, <br /> сustomize it and <br />
                share it <br /> with your friends
            </div>
            <button onClick={click}className="start-btn">Get started</button>
        </div>
    );
}


export default Home;
