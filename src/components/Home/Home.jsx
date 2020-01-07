import React from "react";
import "./Home.scss";

function Home() {
    return (
        <div className="home">
            <div className="title">wheel it</div>
            <div className="description">
                Build your fortune wheel, <br /> сustomize it and <br />
                share it <br /> with your friends
            </div>
            <button className="start-btn">Get started</button>
        </div>
    );
}

export default Home;
