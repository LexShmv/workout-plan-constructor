import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {
  timestamp,
  signUpUser,
  signInUser,
  signOutUser,
  getCurrentUser,
  saveTraining,
  getTrainings,
  deleteTrainings,
  saveDates,
  getDates,
  deleteDate,
  updateUserInfo,
};

function signUpUser(email, password, firstName, lastName) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      db.collection('users')
        .doc(userCredential.user.uid)
        .set({
          email,
          firstName,
          lastName,
        });
      return userCredential.user.uid;
    })
    .catch((error) => {
      throw error;
    });
}

function signInUser(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => userCredential.user.uid)

    .catch((error) => {
      throw error;
    });
}

function getCurrentUser(uid) {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((res) => ({ ...res.data(), userID: uid }));
}

function updateUserInfo(uid, newUserInfo) {
  return db
    .collection('users')
    .doc(uid)
    .update({
      firstName: newUserInfo.firstName,
      lastName: newUserInfo.lastName,
    });
}

function signOutUser() {
  firebase.auth().signOut();
  window.location.reload();
}

function saveTraining(uid, training) {
  db.collection('trainingsInfo')
    .doc(uid)
    .collection('trainings')
    .doc(training.name)
    .set(training)
    .then(() => console.log('Training saved!'))
    .catch((e) => console.error('Error ' + e));
}

function getTrainings(uid) {
  return db
    .collection('trainingsInfo')
    .doc(uid)
    .collection('trainings')
    .get()
    .then((querySnapshot) => {
      let loadedTrainings = [];
      querySnapshot.forEach((doc) => {
        loadedTrainings.push(doc.data());
      });
      return loadedTrainings;
    })
    .catch((e) => console.error(e));
}

function deleteTrainings(uid, trainingName) {
  return db
    .collection('trainingsInfo')
    .doc(uid)
    .collection('trainings')
    .doc(trainingName)
    .delete()
    .then(() => console.log('Training deleted'))
    .catch((e) => 'Error: ' + e);
}

function saveDates(uid, payload) {
  db.collection('trainingsInfo')
    .doc(uid)
    .collection('dates')
    .doc(payload.trainingName)
    .set(payload)
    .then(() => console.log('Dates saved!'))
    .catch((e) => console.error('Error ' + e));
}

function getDates(uid) {
  return db
    .collection('trainingsInfo')
    .doc(uid)
    .collection('dates')
    .get()
    .then((querySnapshot) => {
      let loadedDates = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        loadedDates.push(doc.data());
      });
      return loadedDates;
    })
    .catch((e) => console.error(e));
}

function deleteDate(uid, trainingName) {
  return db
    .collection('trainingsInfo')
    .doc(uid)
    .collection('dates')
    .doc(trainingName)
    .delete()
    .then(() => console.log('Training date deleted'))
    .catch((e) => 'Error: ' + e);
}
