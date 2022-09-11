/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import "moment/locale/tr";
import { TrashIcon } from "@heroicons/react/solid";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { deleteObject, listAll, ref } from "firebase/storage";

const Ad = ({ ad, GetAds }) => {
  const { user } = useAuth();
  const deleteAd = async () => {
    await deleteDoc(doc(db, "users", user?.email, "ad", ad.id));
    await deleteDoc(doc(db, "allAds", ad.id));
    deleteStoragedImages();
    await GetAds();
  };
  const router = useRouter();

  const deleteStoragedImages = async () => {
    const listRef = ref(storage, `images/${ad.id}`);
    await listAll(listRef)
      .then(async (res) => {
        for await (let r of res.items) {
          await deleteObject(ref(storage, r.fullPath));
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div
      onClick={() => {
        router.push(`ilan/${ad.id}`);
     
      }}
      className="mt-10 border cursor-pointer hover:scale-[1.02] transition-all duration-100"
    >
      <div className="max-w-full h-28  bg-white flex ">
        <div className="w-3 h-full bg-slate-600"></div>
        <div className="bg-slate-100 w-16 md:w-28 flex items-center">
          <Moment className="font-semibold ml-3 text-sm md:text-base" fromNow>
            {ad?.timestamp?.toDate()}
          </Moment>
        </div>
        <div className="flex bg-slate-50 items-center justify-between w-full px-1 md:px-3 space-x-2">
          <div className="flex items-center">
            <img
              className="hidden md:block h-4/5 w-20 rounded-lg object-contain"
              src={ad.image}
              alt=""
            />
            <h2 className="ml-2 text-sm md:text-base ">
              {ad.explanation.slice(0, 30)}...
            </h2>
          </div>
          <div>
            <h2 className="text-sm md:text-base font-semibold">{ad.price}₺ </h2>
          </div>
          <div>
            <h2 className="text-red-500 text-sm md:text-lg font-semibold ml-4 md:ml-0">
              İlan Yayında
            </h2>
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteAd();
                toast.success("İlan başarılı bir şekilde silindi.");
              }}
              className="flex items-center justify-center mt-5 text-sm hover:text-purple-500"
            >
              <h2 className="hover:underline hidden md:block">İlanı Kaldır</h2>
              <TrashIcon className="w-4 h-4 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ad;
