import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import { AppConfig } from "./config";

const config = {
  apiKey: AppConfig.apiKey,
  authDomain: AppConfig.authDomain,
  databaseURL: AppConfig.databaseURL,
  projectId: AppConfig.projectId,
  storageBucket: AppConfig.storageBucket,
  messagingSenderId: AppConfig.messagingSenderId,
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
