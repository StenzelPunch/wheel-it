import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Header from "./components/Header";
import WheelPage from "./views/WheelPage";

function App() {
    return (
        <Router basename="/wheel-it">
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
