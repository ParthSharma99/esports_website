import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCG9uOJHgklTyvKupp7017-sWhdmKmhL5o",
  authDomain: "esports-website-434b7.firebaseapp.com",
  databaseURL: "https://esports-website-434b7-default-rtdb.firebaseio.com",
  projectId: "esports-website-434b7",
  storageBucket: "esports-website-434b7.appspot.com",
  messagingSenderId: "890730674082",
  appId: "1:890730674082:web:10dd94b0bdd8adf7e7a4fb",
};

const fireabaseApp = initializeApp(firebaseConfig);
const firebaseDatabase = ref(getDatabase(fireabaseApp));
const firebaseStorage = getStorage();

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function Context({ children }) {
  const [gamerTagAvailable, setGamerTagAvailable] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    let uid = sessionStorage.getItem("uniqueGamerId");
    if (uid) {
      return;
    } else {
      let tempId = uuidv4();
      sessionStorage.setItem("uniqueGamerId", tempId);
    }
  }, []);

  const uploadImages = async (imageAsFile, fileName) => {
    const uploadTaskRef = storageRef(
      firebaseStorage,
      `/collegePhotoIdImages/${fileName}`
    );
    uploadBytes(uploadTaskRef, imageAsFile).then((snapshot) => {
      console.log("Uploaded a file!");
      setFormSubmitted(true);
    });
  };

  const submitForm = async (data) => {
    delete data["attachedFileFRONT"];
    delete data["attachedFileBACK"];
    let referralId = sessionStorage.getItem("referralId");
    if (referralId) {
      const referralIdDb = child(
        firebaseDatabase,
        "userData/" + referralId + "/referral"
      );
      await set(referralIdDb, data.uniqueGamerId);
    }
    const dbRef = child(firebaseDatabase, "userData/" + data.uniqueGamerId);
    await set(dbRef, data);
    const dbRef2 = child(firebaseDatabase, "gamerTag/" + data.uniqueGamerTag);
    await set(dbRef2, data.uniqueGamerId);

    sessionStorage.setItem("uniqueGamerId", "");
    sessionStorage.setItem("referralId", "");
  };

  const checkGamerTag = async (name) => {
    if (name === "") {
      setGamerTagAvailable(-1);
      return;
    }
    const dbRef = child(firebaseDatabase, "gamerTag");
    await get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          if (name in data) {
            setGamerTagAvailable(-1);
          } else {
            setGamerTagAvailable(1);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const value = {
    checkGamerTag,
    gamerTagAvailable,
    submitForm,
    uploadImages,
    formSubmitted,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
