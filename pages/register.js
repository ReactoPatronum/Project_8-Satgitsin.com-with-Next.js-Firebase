import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginImage from "/public/LoginImage.webp";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import googleImg from "/public/icons8-google-240.png";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [newMembership, setNewMembership] = useState({
    name: "",
    email: "",
    pw: "",
    pwCheck: "",
  });

  const { setUser, user } = useAuth();
  const provider = new GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    await userSave();
  };

  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: newMembership.name,
        photoURL:
          "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
      });
      await setUser((current) => ({
        ...current,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      }));
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("Bu hesap ile daha önce kayıt olunmuş.");
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleRegister = async () => {
    if (newMembership.pw === newMembership.pwCheck) {
      try {
        await registerUser(newMembership.email, newMembership.pw);
        userSave();
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Şifreler Uyuşmuyor!");
    }
  };

  const userSave = async () => {
    await setDoc(doc(db, "users", auth.currentUser.email), {
      name: auth?.currentUser?.displayName,
      email: auth?.currentUser?.email,
      uid: auth?.currentUser?.uid,
      photoURL: auth?.currentUser?.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <main className="grid grid-cols-2 max-w-5xl mx-auto md:shadow-lg md:bg-gray-50  mt-24 rounded-lg ">
      <div className="col-span-2 md:col-span-1 rounded-lg p-6 ">
        <h2>
          Bir hesabınız mı var?{" "}
          <span onClick={()=>router.push("/login")} className="text-sm text-blue-400 hover:underline cursor-pointer">
            Giriş Yapın
          </span>
        </h2>
        <div className="flex flex-col ">
          <div className="mt-10 flex flex-col items-center">
            <h2 className="text-2xl font-semibold">HOŞGELDİNİZ</h2>
            <p>Sizlere en iyi tecrübeyi yaşatmak için buradayız.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col space-y-6 w-full p-8"
          >
            <input
              required
              value={newMembership.name}
              onChange={(e) =>
                setNewMembership((current) => ({
                  ...current,
                  name: e.target.value,
                }))
              }
              placeholder="Adınız"
              className="border h-10 text-xl  border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
              type="text"
            />
            <input
              required
              value={newMembership.email}
              onChange={(e) =>
                setNewMembership((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
              placeholder="E-Mail"
              className="border h-10 text-xl  border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
              type="email"
            />
            <input
              required
              value={newMembership.pw}
              onChange={(e) =>
                setNewMembership((current) => ({
                  ...current,
                  pw: e.target.value,
                }))
              }
              placeholder="Şifre"
              className="border h-10 text-xl  border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
              type="password"
            />
            <input
              required
              value={newMembership.pwCheck}
              onChange={(e) =>
                setNewMembership((current) => ({
                  ...current,
                  pwCheck: e.target.value,
                }))
              }
              placeholder="Şifreyi Tekrar Girin"
              className="border h-10 text-xl  border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
              type="password"
            />
            <button
              onClick={() => handleRegister()}
              className="transition-all duration-200 hover:bg-blue-600 hover:scale-105 bg-blue-500 p-3 text-white font-semibold text-lg"
            >
              Kayıt-Ol
            </button>
          </form>
          <div className="px-8">
            <h2 className="text-center font-bold">ya da</h2>
            <div
              onClick={signUpWithGoogle}
              className="mt-6 flex items-center bg-red-400 text-white justify-center rounded-md transition-all duration-200 hover:bg-red-500 cursor-pointer "
            >
              <Image alt="" src={googleImg} height={50} width={50} />
              <button className="font-semibold">Google ile Oturum Aç</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 hidden md:block relative">
        <div className="p-6  h-[600px]">
          <Image
            className="object-cover rounded-r-lg "
            src={loginImage}
            alt=""
            layout="fill"
          />
          <h2 className="absolute top-1/4 text-white text-4xl font-bold">
            Almak , satmak , keşfetmek için adres hep aynı.
          </h2>
          <h2 className="absolute bottom-1/4 text-white text-2xl font-bold">
            satgitsin.com
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Register;
