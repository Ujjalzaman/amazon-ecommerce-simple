import { useContext, useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireBase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); 
}

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    name: '',
    photo: '',
    email: '',
    password: '',
    error: '',
    success: false,
    isLoggedIn: false
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || {form: {pathname: '/'}};

  //hanlde sign in with google
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(GoogleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
          isLoggedIn: true,
        }
        setUser(signedInUser);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const handleSignOUt = () => {
    firebase.auth().signOut()
      .then(() => {
        const isSignedOutUser = {
          isLoggedIn: false,
          photo: '',
          email: '',
          name: ''
        }
        setUser(isSignedOutUser);
        console.log("signed out successfully")
      })
      .catch((error) => {
        console.log(error)
      });
  }
  //handle sign in with email and password
  const handleOnBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isFieldValid)
    }
    if (e.target.name === 'password') {
      const isLargePassword = e.target.value.length > 8;
      const isPasswordValid = /\d{1}/.test(e.target.value);
      isFieldValid = isLargePassword && isPasswordValid;
      // console.log(isFieldValid)
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }
  const handleAuthSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          updateUserInfo(user.name)
          // console.log(res)
        })
        .catch(error => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
          // console.log(error, "error is")
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // console.log(res)
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(res.user) 
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }
  //update user informations
  const updateUserInfo = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(res => {
      // console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }
  const textStyle = {
    'textAlign': "center",    
    // "padding": "20px"
  }
  return (
    <div style={textStyle}>
      <h1>Sign in With google</h1>
      <h2>Name : {user.name}</h2>
      <p>Email : {user.email}</p>
      <img src={user.photo} alt="" /> <br />
      {user.isLoggedIn ? <button onClick={handleSignOUt}> Sign Out</button> :
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      <hr />
      <h1>Sign Up With Email & PassWord</h1><br />
      {/* <h2>name : {user.name}</h2>
      <h2>{user.email}</h2>
      <p>password : {user.password}</p> */}
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser" >NewUser Sign In</label>
      <form onSubmit={handleAuthSubmit}>
        {newUser && <input type="text" name="name" onChange={handleOnBlur} placeholder="write your name" />
        }
        <br />
        <input type="email" name="email" onBlur={handleOnBlur} required placeholder="input your email" /> <br />
        <input type="password" name="password" onBlur={handleOnBlur} required placeholder="input your password" /><br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>successfully {newUser ? "created" : "logged In"} </p>
      }
    </div>
  );
}


export default Login;
