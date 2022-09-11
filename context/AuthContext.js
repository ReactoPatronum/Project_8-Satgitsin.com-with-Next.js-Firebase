import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";



const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((user) =>
      console.log(user)
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

//user varsa anasayfaya yolla

  const SignIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => console.log(user))
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          toast.error("Hotmail yada parola uyuşmuyor");
        } else {
          toast.error(err.message);
        }
      });
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };


  const contextValue = { user, SignIn, logOut, signUpWithGoogle , setUser };
  return (
    <AuthContext.Provider value={contextValue}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
