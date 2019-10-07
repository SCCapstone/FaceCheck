const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
// Using express to better format REST api and handle errors
const app = require("express")();
// Init firebase admin object
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyBdXrOOzC_PZx4SeDH5WzMmYsnmbRd4NHo",
  authDomain: "facecheck-f1a51.firebaseapp.com",
  databaseURL: "https://facecheck-f1a51.firebaseio.com",
  projectId: "facecheck-f1a51",
  storageBucket: "facecheck-f1a51.appspot.com",
  messagingSenderId: "658389282843",
  appId: "1:658389282843:web:c85b82fa317bc5ae5308be",
  measurementId: "G-NHQF0Z8RZ4"
};

// Init firebase via config
firebase.initializeApp(firebaseConfig);

// ----------------------------------------------------------------------------
// API Start
// ----------------------------------------------------------------------------

// Basic hello world test endpoint
app.get("/hello-world", (request, response) => {
  response.send("Hello from Firebase!");
});

// Signup endpoint that implements whitelist functionality
app.post("/auth/sign-up", (request, response) => {
  // Get value of user whitelist in database
  let userWhitelistEntry = admin
    .firestore()
    .collection("whitelist")
    .doc(request.body.email);
  //  Test if email is whitelisted. If so, signup user and build data.
  userWhitelistEntry
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //  User is whitelisted, signup
        firebase
          .auth()
          .createUserWithEmailAndPassword(request.body.email, request.body.password)
          .then(data => {
            // on success, create user data
            let userData = {
              userType: doc.data().userType,
              classes: []
            };
            // Add user data to users collection with doc id of uid
            admin
              .firestore()
              .collection("users")
              .doc(data.user.uid)
              .set(userData);
            // Return object with user creation success
            return response
              .status(201)
              .json({ userCreated: true, error: null });
          })
          .catch(error => {
            return response
              .status(500)
              .json({ userCreated: false, error: error });
          });
      } else {
        // doc.data() will be undefined in this case
        console.log(`User: ${data.user.uid} is not whitelisted`);
        return response.status(400).json({
          userCreated: false,
          error: `User: ${data.user.uid} is not whitelisted`
        });
      }
    }) /* Only happens on server error */
    .catch(function(error) {
      console.log("Error getting document:", error);
      return response.status(500).json({
        userCreated: false,
        error: error
      });
    });
});

// https://baseurl.com/api/ <- base url for all requests
exports.api = functions.https.onRequest(app);

// ----------------------------------------------------------------------------
// API End
// ---
// Event Trigger(Aggregators) Start
// ----------------------------------------------------------------------------



// ----------------------------------------------------------------------------
// Event Triggers End
// ----------------------------------------------------------------------------
