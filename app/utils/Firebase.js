import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBGqH-My6giLyWY4FT4v-B1sYtY1koWjrM",
    authDomain: "tenedoresreactnative.firebaseapp.com",
    databaseURL: "https://tenedoresreactnative.firebaseio.com",
    projectId: "tenedoresreactnative",
    storageBucket: "tenedoresreactnative.appspot.com",
    messagingSenderId: "219224146207",
    appId: "1:219224146207:web:f11328bebe4cfdd3ffb02a"
}

export const firebaConfigApp = firebase.initializeApp(firebaseConfig);