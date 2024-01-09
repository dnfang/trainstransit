import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore'

// Firebase configuration
// Fine to expose 'apiKey', just an identifier on Google's server
// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
const firebaseConfig = {
  apiKey: "AIzaSyBUrml0Wm8gNxgcjAtKmmK6oXqmUBjH30E",
  authDomain: "trainstransit.firebaseapp.com",
  projectId: "trainstransit",
  storageBucket: "trainstransit.appspot.com",
  messagingSenderId: "37344575003",
  appId: "1:37344575003:web:4861ea2a3cd01b222dc2be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export async function getConnectingPlatform (stationString, platformOriginString, platformDestString, legDescription) {
  const stationRef = await getDoc(doc(firestore, 'Stations', stationString ))

  if (!(stationRef.exists())) {
    return null
  }

  if (Object.keys(stationRef.data()).includes(legDescription)) {
    if (Object.keys(stationRef.data()[legDescription][platformOriginString]).includes(platformDestString)) {
      return stationRef.data()[legDescription][platformOriginString][platformDestString]
    } else {
      return stationRef.data()[legDescription][platformOriginString]['Exit']
    }
  }

  if (Object.keys(stationRef.data()[platformOriginString]).includes(platformDestString)) {
    return stationRef.data()[platformOriginString][platformDestString]
  } else {
    return stationRef.data()[platformOriginString]['Exit']
  }
}