import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Header from "./components/Header";
import WheelPage from "./views/WheelPage";

let style = { right: 768 };

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                <Switch>
                    <Route path="/wheel">
                        <WheelPage />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
