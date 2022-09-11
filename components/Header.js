/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import logo from "/public/carLogo.png";
import {
  MenuIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useCategories } from "../context/CategoryContext";

const Header = () => {
  const { setHamburger, hamburger } = useCategories();
  const { user, logOut } = useAuth();
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();

  return (
    <header className=" shadow-lg p-1">
      <AnimatePresence>
        {hamburger && (
          <motion.div
            onClick={() => setHamburger(false)}
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            className="md:hidden bg-purple-600 h-screen   top-0 right-0 p-5 rounded-md"
          >
            <XCircleIcon className="w-10 h-10 text-white" />
            <div>
              <ul className="text-white flex flex-col items-center justify-center font-semibold text-lg text-center px-10 mt-10">
                <li
                  onClick={() => router.push("/")}
                  className="border-y p-6  w-full"
                >
                  Anasayfa
                </li>
                <li
                  onClick={() => router.push("/login")}
                  className="border-y p-6  w-full"
                >
                 Giriş Yap
                </li>
                <li
                  onClick={() => router.push("/register")}
                  className="border-y p-6  w-full"
                >
                  Üye Ol
                </li>
                <li
                 onClick={
                  user
                    ? () => router.push("/ilan")
                    : () => toast.error("Lütfen Oturum Açınız!")
                }
                  className="border-b p-6 w-full"
                >
                  Ücretsiz* İlan Ver
                </li>
                <li
                  onClick={
                    user
                      ? () => router.push("/ilanlarim")
                      : () => toast.error("Lütfen Oturum Açınız!")
                  }
                  className="border-b p-6 w-full"
                >
                  İlanlarım
                </li>
                <li onClick={() => logOut()} className="border-b p-6 w-full">
                  Çıkış Yap
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto flex items-center space-x-4">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image className="" alt="logo" width={150} height={70} src={logo} />
          </div>
        </Link>
        <div className="flex-1 rounded-lg  flex items-center bg-gray-200 focus-within:bg-gray-100">
          <input
            className="flex-1 p-[6px] md:p-[10px] rounded-lg  outline-none bg-gray-200  focus-within:bg-gray-100"
            placeholder="İlan Ara"
            type="text"
          />
          <SearchIcon className="w-6 h-6 mx-2" />
        </div>
        <div className="hidden md:flex items-center transition-all duration-200 z-10">
          {user ? (
            <div>
              <div
                onClick={() => setDropDown((current) => !current)}
                className="flex  items-center justify-center mx-2 cursor-pointer"
              >
                <img
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full "
                  src={user?.photoURL}
                  alt=""
                />
                {!dropDown ? (
                  <ChevronDownIcon className="w-5 h-5 " />
                ) : (
                  <ChevronUpIcon className="w-5 h-5 " />
                )}
              </div>
              <AnimatePresence>
                {dropDown && (
                  <motion.div
                    initial={{ y: -400 }}
                    animate={{ y: 5 }}
                    exit={{ y: -400 }}
                    className="font-semibold shadow-lg absolute h-20 w-52  text-center bg-gray-400"
                  >
                    <h2
                      className="hover:text-white p-2 cursor-pointer hover:bg-gray-500 transition-all duration-200"
                      onClick={() => {
                        logOut();
                        router.push("/");
                        setDropDown(false);
                      }}
                    >
                      Çıkış Yap
                    </h2>

                    <h2
                      onClick={() => {
                        router.push("/ilanlarim");
                        setDropDown(false);
                      }}
                      className="hover:text-white p-2 cursor-pointer hover:bg-gray-500 transition-all duration-200"
                    >
                      İlanlarım
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex space-x-3 text-sm mx-3 items-center">
              <button
                onClick={() => router.push("/login")}
                className="hover:underline cursor-pointer"
              >
                Giriş Yap
              </button>
              <hr className="border-gray-500 border-2 h-6" />
              <button
                onClick={() => router.push("/register")}
                className="hover:underline cursor-pointer"
              >
                Üye Ol
              </button>
            </div>
          )}
          <div className="">
            <button
              onClick={
                user
                  ? () => router.push("/ilan")
                  : () => toast.error("Lütfen Oturum Açınız!")
              }
              className="font-semibold bg-blue-300 p-2 rounded-md text-gray-100 hover:bg-blue-400 transition-all duration-200"
            >
              Ücretsiz* İlan Ver
            </button>
          </div>
        </div>
        <div className=" md:hidden">
          <MenuIcon onClick={() => setHamburger(true)} className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
