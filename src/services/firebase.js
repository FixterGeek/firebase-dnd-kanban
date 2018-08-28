
import * as firebase from 'firebase'

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDKffDj1yNE5ZMGeESjosOFfnc47qGFl6I",
    authDomain: "fir-firebase-b64eb.firebaseapp.com",
    databaseURL: "https://fir-firebase-b64eb.firebaseio.com",
    projectId: "fir-firebase-b64eb",
    storageBucket: "fir-firebase-b64eb.appspot.com",
    messagingSenderId: "856341620154"
  };
  firebase.initializeApp(config);

  export default firebase
