import Firebase, { db } from '../config/Firebase.js'

// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

// actions

export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}

export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}
		
// Only allow access to admins
export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user

			const usersRef = db.collection('admins').doc(email)

			usersRef.get()
  			.then((docSnapshot) => {
    		if (docSnapshot.exists) {
				const response = Firebase.auth().signInWithEmailAndPassword(email, password)
			
			}
			else {
				alert('User is not an admin!')
			}
});
			
		} catch (e) {
			alert(e)
		}
	}
}
