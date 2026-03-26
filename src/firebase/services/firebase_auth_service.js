import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const login_user = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

export const logout_user = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error.message;
  }
};

export const observe_User = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

// export const observeAuthState = (callback) => {
//   return onAuthStateChanged(auth, callback);
// };
