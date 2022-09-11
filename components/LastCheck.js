/* eslint-disable @next/next/no-img-element */
import React, {  useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { BiLike } from "react-icons/bi";

const LastCheck = ({ userInfo, setUserInfo }) => {

  const { user } = useAuth();
  const NightMode = () => {
    setUserInfo((current) => ({ ...current, emergency: !userInfo.emergency }));
  };
  console.log(userInfo.emergency);
  return (
    <div>
      <h2 className="my-6">BİLGİLERİNİ GÖZDEN GEÇİR</h2>
      <div className="flex">
        <img
          referrerPolicy="no-referrer"
          className="rounded-full w-20 h-20"
          src={user?.photoURL}
          alt=""
        />
        <div>
          <h2 className="ml-3">Ad ve soyad*</h2>
          <input
            value={userInfo.name}
            onChange={(e) =>
              setUserInfo((current) => ({ ...current, name: e.target.value }))
            }
            className="ml-3 border h-10  rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
      </div>
      <div className="mt-4">
        <h2>Telefon Numarası</h2>
        <div className="flex relative">
          <h2 className="absolute top-2 left-2 text-gray-400 border-r-2 px-2">
            +90
          </h2>
          <input
            value={userInfo.number}
            onChange={(e) =>
              setUserInfo((current) => ({ ...current, number: e.target.value }))
            }
            className="pl-16 border h-10 w-[300px] rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="mt-2 flex items-center">
          <input
            value={userInfo.showNumber}
            onChange={() =>
              setUserInfo((current) => ({
                ...current,
                showNumber: !userInfo.showNumber,
              }))
            }
            type="checkbox"
          />
          <h2 className="ml-2">İlanlarım da telefon numaramı göster.</h2>
        </div>
        <div className="border-y-2 py-6 mt-4">
          <h2 className="text-xl font-semibold">
            İlanımı Acil Kategorisine Koy
            <span className="text-sm text-red-400"> ( +250TL )</span>
          </h2>

          <div className="flex items-center mt-4">
            <BiLike className="rotate-180 h-7 w-7"/>
            <div
              onClick={NightMode}
              className={`relative w-14 h-6 ${
                userInfo.emergency ? "bg-orange-600 " : "bg-gray-400"
              } rounded-xl flex items-center cursor-pointer`}
            >
              <div className="flex">
                <motion.div
                  animate={!userInfo.emergency ? { x: 0 } : { x: 32 }}
                  className="h-6 w-6 rounded-full bg-gray-200 absolute bottom-[0px] "
                ></motion.div>
              </div>
            </div>
            <BiLike className={`${userInfo.emergency&&"text-red-500"} h-7 w-7`}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastCheck;
