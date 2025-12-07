import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD0sAsUmdularHp1lJC4DSwB6gm2kIVTbQ",
  authDomain: "chat-demo-ed6ff.firebaseapp.com",
  projectId: "chat-demo-ed6ff",
  storageBucket: "chat-demo-ed6ff.firebasestorage.app",
  messagingSenderId: "732048528912",
  appId: "1:732048528912:web:5962695cea0154c7141c95"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export const useFirebase = () => {
  return {
    db,
    auth,
    storage
  }
}