import "./App.css";
import * as React from "react";
import Trial from "./container/Trial";
import Moogle from "./container/moogle";

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
  React.useEffect(() => {
    document.title = "Trial Cell 5";
  }, []);
  
  return (
    <div className="App">
      <Trial />
      <Moogle/> 
    </div>
  );
}

export default App;
