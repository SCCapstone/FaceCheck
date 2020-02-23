import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'react-native-firebase';
const db = firebase.firestore();

//
// Initial State
//

const initialState = {
  classes: [],
};

//
// Reducer
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setClasses':
      return {...state, classes: action.value};
    default:
      return state;
  }
};

//
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export {store};

//
// Action Creator
//

const setClasses = classes => {
  return {
    type: 'setClasses',
    value: classes,
  };
};

const watchClasses = () => {
  return function(dispatch) {
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(function(doc) {
        if (doc.data()) {
          // console.log("\n\nTest: ", doc.data());
          var classes = doc.data().classes;
          classesPromise = classes.map(classID => {
            return db
              .collection('classes')
              .doc(classID)
              .get();
          });
        } else {
          classesPromise = [];
        }
        Promise.all(classesPromise).then(classDocs => {
          returnClasses = classDocs.map(classDoc => {
            return classDoc.data();
          });
          dispatch(setClasses(returnClasses));
        });
      });
  };
};

export {setClasses, watchClasses};
