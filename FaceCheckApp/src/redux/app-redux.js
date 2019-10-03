import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as firebase from 'react-native-firebase'

// 
// Initial State
// 

const initialState = {
    classes: [],
}

// 
// Reducer
// 

const reducer  = (state = initialState, action) => {
    switch(action.type) {
        case 'setClasses': 
            return { ...state, classes: action.value }
        default: return state
    }
}

// 
// Store
// 

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export { store }

// 
// Action Creator
// 

const setClasses = (classes) => {
    return{
        type: "setClasses",
        value: classes
    }
}

const watchClasses = () => {
    return function(dispatch) {
        firebase.database().ref("classes").on("value", function(snapshot) {
            var firestoreClasses = snapshot.val()
            var classes = firestoreClasses.classes
            dispatch(setClasses(classes))
        }), function(error) {
            // TODO: handle error
        }
    }
}

export { setClasses, watchClasses }
