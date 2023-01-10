import React, { useState, Suspense, lazy } from "react";
import Header from "../Header";
import HomePageWeb from "./HomePageWeb";
import LoadingBar from "../LoadingBar";
import { userState } from '../../types/interfaces';

// firbase db imports
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";

// lazy imports for anything that doesn't render on load
const CreateAccount = lazy(() => import('../auth/CreateAccount'));
const LogIn = lazy(() => import('../auth/LogIn'));
const EditProfile = lazy(() => import('../auth/EditProfile'));
const ViewContributions = lazy(() => import('../auth/ViewContributions'));

const WebApp = () => {

  const [signUpStatus, setSignUpStatus] = useState({
    signUp: false
  });

  const [logInStatus, setLogInStatus] = useState({
    logIn: false
  });

  const [userStatus, setUserStatus] = useState<userState>({
    formCompleted: false,
    currentUser: '',
    errorStatus: '',
  });

  const [editProfileRequested, setEditProfileRequested] = useState({
    status: false
  });

  const [viewFavoritesRequested, setViewFavoritesRequested] = useState({
    status: false
  });

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
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const createAccountWithEmailAndPassword = async (username: string, email: string, password: string): Promise<void> => {

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log('user created');
        // sync user data with local state
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });

        // create user instance in db to store username, posts, comments, etc
        setDoc(doc(db, "users", user.uid), {
          comments: [],
          displayName: '',
          favoritePosts: [],
          posts: [],
          imgURL: '',
          imgURLRef: '',
          uid: user.uid,
          username: username,
        });

        setSignUpStatus({
          signUp: false,
        });

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

        // sync user with local state
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });
        setLogInStatus({
          logIn: false,
        });

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

  const returnToMainAfterProfileEdit = () => {
    setEditProfileRequested({
      status: false,
    });
    signOut();
  };

  const toggleViewContributionsPage = () => {
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

  if (signUpStatus.signUp === true) {
    return (
      <div className="app-web">
        <Header handleSignUp={handleSignUp}
          handleLogIn={handleLogIn}
          currentUser={userStatus.currentUser}
          signOut={signOut}
          toggleEditProfilePage={toggleEditProfilePage}
          toggleViewContributionsPage={toggleViewContributionsPage}
        />
        <Suspense fallback={<LoadingBar/>}>
          <CreateAccount createAccountWithEmailAndPassword={createAccountWithEmailAndPassword}
            handleSignUp={handleSignUp}
          />
        </Suspense>
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
          toggleViewContributionsPage={toggleViewContributionsPage}
        />
        <Suspense fallback={<LoadingBar/>}>
          <LogIn signInUser={signInUser}
            handleLogIn={handleLogIn}
            signInWithGoogleAccount={signInWithGoogleAccount}
          />
        </Suspense>
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
        toggleViewContributionsPage={toggleViewContributionsPage}
      />
      <Suspense fallback={<LoadingBar/>} >
        <EditProfile currentUser={userStatus.currentUser}
          toggleEditProfilePage={toggleEditProfilePage}
          returnToMainAfterProfileEdit={returnToMainAfterProfileEdit}
        />
      </Suspense>
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
          toggleViewContributionsPage={toggleViewContributionsPage}
        />
        <Suspense fallback={<LoadingBar/>}>
          <ViewContributions
            currentUser={userStatus.currentUser}
            toggleViewContributionsPage={toggleViewContributionsPage}
          />
        </Suspense>
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
        toggleViewContributionsPage={toggleViewContributionsPage}
      />
      <HomePageWeb currentUser={userStatus.currentUser}/>
    </div>
  );
};

export default WebApp;