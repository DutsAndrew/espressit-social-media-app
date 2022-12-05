import React, { useState } from "react";
import Header from "../Header";
import HomePageWeb from "./HomePage";
import CreateAccount from '../auth/CreateAccount';
import { initializeApp } from "firebase/app";
import { getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
User,
} from "firebase/auth";
import { userState } from '../../types/interfaces';
import LogIn from '../auth/LogIn';

const WebApp = () => {

  const [signUpStatus, setSignUpStatus] = useState({signUp: false});
  const [logInStatus, setLogInStatus] = useState({logIn: false});

  const [userStatus, setUserStatus] = useState<userState>({
    formCompleted: false,
    currentUser: '',
    errorStatus: '',
  });

  const handleSignUp = () => {
    if (signUpStatus.signUp === false) {
      setSignUpStatus({
        signUp: true,
      });
      return;
    } else {
      setSignUpStatus({
        signUp: false,
      });
    };
  };

  const handleLogIn = () => {
    if (logInStatus.logIn === false) {
      setLogInStatus({
        logIn: true,
      });
      return;
    } else {
      setLogInStatus({
        logIn: false,
      });
      return;
    };
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDsPecBa3Ch5uDw4UzHiJWAjKEYOKCrNdA",
    authDomain: "espressit.firebaseapp.com",
    projectId: "espressit",
    storageBucket: "espressit.appspot.com",
    messagingSenderId: "1094129721341",
    appId: "1:1094129721341:web:dc2bdc0a2b322504b04394"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const createAccountWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    console.log('form is being submitted');
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setUserStatus({
          formCompleted: false,
          currentUser: 'not found',
          errorStatus: `${errorCode}, ${errorMessage}`,
        });
        alert(`${errorCode}, ${errorMessage}, please try again`);
      });
  };

  const signInUser = async (email: string, password: string): Promise<void> => {
    console.log('attempting to sign in');
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setUserStatus({
          formCompleted: false,
          currentUser: 'not found',
          errorStatus: `${errorCode}, ${errorMessage}`,
        });
        alert(`${errorCode}, ${errorMessage}, please try again`);
      });
  };

  if (signUpStatus.signUp === true) {
    return (
      <div className="app-web">
        <Header handleSignUp={handleSignUp} handleLogIn={handleLogIn} />
        <CreateAccount createAccountWithEmailAndPassword={createAccountWithEmailAndPassword} handleSignUp={handleSignUp} />
      </div>
    );
  };

  if (logInStatus.logIn === true) {
    return (
      <div className="app-web">
        <Header handleSignUp={handleSignUp} handleLogIn={handleLogIn} />
        <LogIn signInUser={signInUser} handleLogIn={handleLogIn} />
      </div>
    );
  };

  return (
    <div className="app-web">
      <Header handleSignUp={handleSignUp} handleLogIn={handleLogIn} />
      <HomePageWeb />
    </div>
  );
};

export default WebApp;