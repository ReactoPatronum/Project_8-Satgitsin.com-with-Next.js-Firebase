import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginImage from "/public/LoginImage.webp";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/solid";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleImg from "/public/icons8-google-240.png";
import { auth } from "../firebase";

const Login = () => {
  const { SignIn, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const provider = new GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <main className="grid grid-cols-2 max-w-5xl mx-auto md:shadow-lg md:bg-gray-50  mt-24 rounded-lg ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="col-span-2 md:col-span-1 rounded-lg p-6 "
      >
        <h2>
          Hesabınız Yok Mu?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-sm text-blue-400 hover:underline cursor-pointer"
          >
            {" "}
            Kayıt Ol
          </span>
        </h2>
        <div className="flex flex-col ">
          <div className="mt-10 flex flex-col items-center">
            <h2 className="text-2xl font-semibold">HOŞGELDİNİZ</h2>
            <p>Sizlere en iyi tecrübeyi yaşatmak için buradayız.</p>
          </div>
          <div className="flex flex-col space-y-6 w-full p-8">
            <input
            required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail"
              className="border h-10 text-xl  border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
              type="text"
            />
            <div className="flex flex-col relative w-full">
              <input
              required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                className=" border h-10 text-xl  border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
                type={passwordVisibility ? "text" : "password"}
              />
              <div
                className="cursor-pointer"
                onClick={() => setPasswordVisibility((current) => !current)}
              >
                {passwordVisibility ? (
                  <EyeIcon className="w-6 h-6 absolute top-2 right-2" />
                ) : (
                  <EyeOffIcon className="w-6 h-6 absolute top-2 right-2" />
                )}
              </div>
            </div>
            <p className="text-blue-400 cursor-pointer max-w-fit hover:underline">
              Şifrenizi mi Unuttunuz?
            </p>

            <button
              onClick={() => SignIn(email, password)}
              className="transition-all duration-200 hover:bg-blue-600 hover:scale-105 bg-blue-500 p-3 text-white font-semibold text-lg"
            >
              Giriş Yap
            </button>
          </div>
        </div>
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
      </form>
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

export default Login;
