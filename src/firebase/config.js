import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCvEwhazrksZTmN4dMNktv9pTo5VYVSnnw",
    authDomain: "cooking-ninja-site-4fa69.firebaseapp.com",
    projectId: "cooking-ninja-site-4fa69",
    storageBucket: "cooking-ninja-site-4fa69.appspot.com",
    messagingSenderId: "924940829418",
    appId: "1:924940829418:web:4615c1ff0dd5a056e94d93"
};

firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()

export { projectFirestore }
