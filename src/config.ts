const DEV_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDEoRc80I8ISUekDY61D25U2tm4LcY3HYo",
    authDomain: "trial-58898.firebaseapp.com",
    databaseURL: "https://trial-58898-default-rtdb.firebaseio.com",
    projectId: "trial-58898",
    storageBucket: "trial-58898.appspot.com",
    messagingSenderId: "975059319737",
    appId: "1:975059319737:web:d0c33f4dab2977e8921468"
};

const PROD_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDEoRc80I8ISUekDY61D25U2tm4LcY3HYo",
    authDomain: "trial-58898.firebaseapp.com",
    databaseURL: "https://trial-58898-default-rtdb.firebaseio.com",
    projectId: "trial-58898",
    storageBucket: "trial-58898.appspot.com",
    messagingSenderId: "975059319737",
    appId: "1:975059319737:web:d0c33f4dab2977e8921468"
};

const prod = {
  ...PROD_FIREBASE_CONFIG,
};

const dev = {
  ...DEV_FIREBASE_CONFIG,
};

const local = {
  ...DEV_FIREBASE_CONFIG,
};

function getAppConfig() {
  if (process.env.REACT_APP_ENV === "production") {
    return prod;
  } else if (process.env.REACT_APP_ENV === "development") {
    return dev;
  }

  return local;
}

export const AppConfig = getAppConfig();
