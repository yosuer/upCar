import to from 'await-to-js';
import { auth, database, provider } from "../../config/firebase";

//Register the user using email and password
export function register(data, callback) {
  const { email, password } = data;
  auth.createUserWithEmailAndPassword(email, password)
    .then((user) => callback(true, user, null))
    .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser(user, callback) {
  database.ref('users').child(user.uid).update({ ...user })
    .then(() => callback(true, null, null))
    .catch((error) => callback(false, null, {message: error}));
}

//Sign the user in with their email and password
export const login = async (data, callback) => {
  const { email, password } = data;
  const [err, user] = await to(auth.signInWithEmailAndPassword(email, password))
  if (err) return callback(false, null, err)
  else getUser(user, callback)
}

//Get the user object from the realtime database
export function getUser(user, callback) {
  database.ref('users').child(user.uid).once('value')
    .then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      //if the user exist in the DB, replace the user variable with the returned snapshot
      if (exists) user = snapshot.val();
      const data = { exists, user }
      callback(true, data, null);
    })
    .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
  const { email } = data;
  auth.sendPasswordResetEmail(email)
    .then((user) => callback(true, null, null))
    .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
  auth.signOut()
    .then(() => {
      if (callback) callback(true, null, null)
    })
    .catch((error) => {
      if (callback) callback(false, null, error)
    });
}