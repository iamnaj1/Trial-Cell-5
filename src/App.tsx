import "./App.css";
import * as React from "react"; 
import Trial from "./container/Trial";

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
function App() {
  return (
    <div className="App">
      <Trial />
    </div>
  );
}

export default App;
