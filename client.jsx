import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import UserAppReducer from "./src/UserAppReducer";

const Hot = hot(UserAppReducer);

ReactDOM.render(<Hot />, document.querySelector("#root"));
