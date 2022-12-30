import React, { useState } from "react";
import Header from "../Header";
import HomePageWeb from "./HomePageWeb";
import CreateAccount from '../auth/CreateAccount';
import { initializeApp } from "firebase/app";
import { getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
} from "firebase/auth";
import { userState } from '../../types/interfaces';
import LogIn from '../auth/LogIn';
import EditProfile from "../auth/EditProfile";
import ViewFavorites from "../auth/ViewFavorites";

const WebApp = () => {

  const [signUpStatus, setSignUpStatus] = useState({signUp: false});
  const [logInStatus, setLogInStatus] = useState({logIn: false});

  const [userStatus, setUserStatus] = useState<userState>({
    formCompleted: false,
    currentUser: '',
    errorStatus: '',
  });

  const [editProfileRequested, setEditProfileRequested] = useState({status: false});
  const [viewFavoritesRequested, setViewFavoritesRequested] = useState({status: false});

  const handleSignUp = () => {
    if (signUpStatus.signUp === false) {
      if (logInStatus.logIn === true) {
        setLogInStatus({
          logIn: false,
        });
      };
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
      if (signUpStatus.signUp === true) {
        setSignUpStatus({
          signUp: false,
        });
      };
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
  const provider = new GoogleAuthProvider();

  const createAccountWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });
        setSignUpStatus({
          signUp: false,
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
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });
        setLogInStatus({
          logIn: false,
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

  const signInWithGoogleAccount = async (): Promise<void> => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setUserStatus({
            formCompleted: true,
            currentUser: user,
            errorStatus: '',
          });
          setLogInStatus({
            logIn: false,
          });
          console.log(user);
        };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setUserStatus({
          formCompleted: false,
          currentUser: 'not found',
          errorStatus: `${errorCode}, ${errorMessage}`,
        });
        alert(`${errorCode}, ${errorMessage}; ${email}, ${credential} please try again`);
      });
  };

  const signOut = () => {
    setUserStatus({
      formCompleted: false,
      currentUser: '',
      errorStatus: '',
    });
  };

  const toggleEditProfilePage = () => {
    if (editProfileRequested.status === false) {
      if (viewFavoritesRequested.status === true) {
        setViewFavoritesRequested({
          status: false,
        });
      };
      setEditProfileRequested({
        status: true,
      });
    } else {
      setEditProfileRequested({
        status: false,
      });
    };
  };

  const toggleViewFavoritesPage = () => {
    if (viewFavoritesRequested.status === false) {
      if (editProfileRequested.status === true) {
        setEditProfileRequested({
          status: false
        });
      };
      setViewFavoritesRequested({
        status: true,
      });
    } else {
      setViewFavoritesRequested({
        status: false,
      });
    };
  };

  const setFavoritePost = () => {

  };

  if (signUpStatus.signUp === true) {
    return (
      <div className="app-web">
        <Header handleSignUp={handleSignUp}
          handleLogIn={handleLogIn}
          currentUser={userStatus.currentUser}
          signOut={signOut}
          toggleEditProfilePage={toggleEditProfilePage}
          toggleViewFavoritesPage={toggleViewFavoritesPage}
        />
        <CreateAccount createAccountWithEmailAndPassword={createAccountWithEmailAndPassword}
          handleSignUp={handleSignUp}
        />
      </div>
    );
  };

  if (logInStatus.logIn === true) {
    return (
      <div className="app-web">
        <Header handleSignUp={handleSignUp}
          handleLogIn={handleLogIn}
          currentUser={userStatus.currentUser}
          signOut={signOut}
          toggleEditProfilePage={toggleEditProfilePage}
          toggleViewFavoritesPage={toggleViewFavoritesPage}
        />
        <LogIn signInUser={signInUser}
          handleLogIn={handleLogIn}
          signInWithGoogleAccount={signInWithGoogleAccount}
        />
      </div>
    );
  };

  if (editProfileRequested.status === true) {
   return (
    <div className="app-web">
      <Header handleSignUp={handleSignUp}
        handleLogIn={handleLogIn}
        currentUser={userStatus.currentUser}
        signOut={signOut}
        toggleEditProfilePage={toggleEditProfilePage}
        toggleViewFavoritesPage={toggleViewFavoritesPage}
      />
      <EditProfile currentUser={userStatus.currentUser}
        toggleEditProfilePage={toggleEditProfilePage}
      />
    </div>
   );
  };

  if (viewFavoritesRequested.status === true) {
    return (
      <div className="app-web">
        <Header handleSignUp={handleSignUp}
          handleLogIn={handleLogIn}
          currentUser={userStatus.currentUser}
          signOut={signOut}
          toggleEditProfilePage={toggleEditProfilePage}
          toggleViewFavoritesPage={toggleViewFavoritesPage}
        />
        <ViewFavorites />
      </div>
     );
  };

  return (
    <div className="app-web">
      <Header handleSignUp={handleSignUp}
        handleLogIn={handleLogIn}
        currentUser={userStatus.currentUser}
        signOut={signOut}
        toggleEditProfilePage={toggleEditProfilePage}
        toggleViewFavoritesPage={toggleViewFavoritesPage}
      />
      <HomePageWeb currentUser={userStatus.currentUser}/>
    </div>
  );
};

export default WebApp;