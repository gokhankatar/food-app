import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "food-app-38799.firebaseapp.com",
    projectId: "food-app-38799",
    storageBucket: "food-app-38799.appspot.com",
    messagingSenderId: "766177029067",
    appId: "1:766177029067:web:67bc943162d9619c51e44e"
};

const app = initializeApp(firebaseConfig);

export default app;