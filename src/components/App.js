import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Launcher from "./Launcher";
import Redirect from "./Redirect";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Route path="/redirect" component={Redirect} />

                <Route path="/" component={Launcher} exact />
            </BrowserRouter>
        </div>
    );
}

