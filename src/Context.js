import React, { useContext, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { initializeApp } from "firebase/app";
import {getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'
import { getDatabase, ref, child, get, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyC4ArOt1mv8aI5K2Q1HTk-LN4h6F6GgneU",
  authDomain: "esports-website.firebaseapp.com",
  databaseURL: "https://esports-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esports-website",
  storageBucket: "esports-website.appspot.com",
  messagingSenderId: "887756716077",
  appId: "1:887756716077:web:c43332a324582b54a560a4"
};


const fireabaseApp = initializeApp(firebaseConfig);
const firebaseDatabase = ref(getDatabase(fireabaseApp));
const firebaseStorage = getStorage()

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}


export function Context({ children }) {
  const [gamerTagAvailable, setGamerTagAvailable ] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    let uid = sessionStorage.getItem("uniqueGamerId");
    if(uid){
      return;
    }else{
        let tempId = uuidv4();
        sessionStorage.setItem("uniqueGamerId", tempId);
    }
  }, [])

  const uploadImages = async (imageAsFile, fileName) => {
    const uploadTaskRef = storageRef(firebaseStorage, `/collegePhotoIdImages/${fileName}`)
    uploadBytes(uploadTaskRef, imageAsFile).then((snapshot) => {
      console.log('Uploaded a file!');
      setFormSubmitted(true);
    });
  }

  const submitForm = async (data) => {
    delete data["attachedFileFRONT"]
    delete data["attachedFileBACK"]
    let referralId = sessionStorage.getItem("referralId")
    if(referralId){
      const referralIdDb = child(firebaseDatabase, 'userData/' + referralId + "/referral");
      await set(referralIdDb, data.uniqueGamerId);
    }
    const dbRef = child(firebaseDatabase, 'userData/' + data.uniqueGamerId);
    await set(dbRef, data);
    const dbRef2 = child(firebaseDatabase, 'gamerTag/' + data.uniqueGamerTag);
    await set(dbRef2, data.uniqueGamerId);

    sessionStorage.setItem("uniqueGamerId", "");
    sessionStorage.setItem("referralId", "");
  }

  const checkGamerTag = async (name) => {
    if(name === '') {
      setGamerTagAvailable(-1);
      return;
    }
    const dbRef = child(firebaseDatabase, 'gamerTag')
    await get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        if(name in data){
          setGamerTagAvailable(-1);
        }else{
          setGamerTagAvailable(1);
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  const value = {
      checkGamerTag,
      gamerTagAvailable,
      submitForm,
      uploadImages,
      formSubmitted
  };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}


