import * as Google from 'expo-google-app-auth';  //imported from expo package
import * as Facebook from 'expo-facebook';  //imported from expo package
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { authUpdate } from './firebase-config';


var keyboardH = 0

if (Platform.OS === 'ios') {
    keyboardH = 1
} else {
    keyboardH = -400
}


//----------------------authentication function from social media providers.
async function signInWithGoogleAsync() {
    try {
        const result = await Google.logInAsync({
            androidClientId: '61563102292-tnvinjlktep702p0qdvjmgumhv87gkvt.apps.googleusercontent.com',
            iosClientId: '61563102292-i37c28r92d4elgiok38bqdqoj1ia4hrb.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            // console.log(result)
            const credential = GoogleAuthProvider.credential(result.idToken, result.accessToken);

            // Sign in with credential from the Facebook user.
            signInWithCredential(authUpdate, credential)
                .then(async result => {
                    // console.log(result)
                })
                .catch(error => { console.log(error) });


            return result.accessToken;
        } else {
            console.log("cancelled by user")
            return { cancelled: true };
        }
    } catch (e) {
        console.log(e);
        return { error: true };
    }//
}

async function signInWithFacebookAsync() {
    await Facebook.initializeAsync({appId:'257589779781838'});  //configuration is only for android device do it for ios as well

    const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
    });

    if (result.type === 'success') {
        // console.log(result)
        let fetchTokenFromGraph = result.token;
        const credential = FacebookAuthProvider.credential(result.token);

        // Sign in with credential from the Facebook user.
        signInWithCredential(authUpdate, credential)
            .then(async result => {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${fetchTokenFromGraph}&fields=first_name,last_name,gender,email`);
                const userInfo = await response.json();
                console.log("my first Response:", userInfo)
            })
            .catch(error => { console.log(error) });
    } else {
        console.log("cancelled by user");
    }
}


const SignInWithFirebase = async (_email, _password) => {
    console.log(`following is _${_email}_ and _${_password}_`)
    signInWithEmailAndPassword(authUpdate, _email, _password)
        .then((userCredential) => {
            // Signed in 
            // console.log("Following are the credentials", userCredential);
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

const PasswordResetFirebaseUser = async (_email) => {
    console.log(`Password reset for ${_email}`)
    sendPasswordResetEmail(authUpdate, _email)
        .then(() => {
            console.log("Password reset email sent!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

const RegisterUserInFirebase = async (_email,_password) => {
    console.log(`following is _${_email}_ and _${_password}_`)
    try{
      createUserWithEmailAndPassword(authUpdate, _email, _password)
        .then((userCredential) => {
            // Signed in 
            //   console.log(`user crendentials are ${userCredential}`)
            //   const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

    }catch(e){
      console.log(e)
    }
  }

  const LogoutUser = async () => {
    signOut(authUpdate).then(() => {
        // Sign-out successful.
        // console.log("Successful signout")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

export { signInWithGoogleAsync, signInWithFacebookAsync, SignInWithFirebase, 
        PasswordResetFirebaseUser,RegisterUserInFirebase,LogoutUser }

