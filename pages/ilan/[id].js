/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import CarFeatures from "../../components/CarFeatures";
import SellerInfo from "../../components/SellerInfo";
import { IoLocationSharp } from "react-icons/io5";

const SingleAd = () => {
  const icon = <ChevronRightIcon className="w-3 h-3" />;
  const [singleAd, setSingleAd] = useState([]);
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const [imageURL, setImageURL] = useState([]);
  const [bigImage, setBigImage] = useState(imageURL[0]);
  const { id } = router.query;
 
  const getAllImages = async () => {
    if (!imageURL.length > 0) {
      const listRef = ref(storage, `images/${id}`);
      await listAll(listRef)
        .then(async (res) => {
          for await (let r of res.items) {
            if (r.fullPath.slice(-9, -4) !== "thumb") {
              const URL = await getDownloadURL(ref(storage, r.fullPath));
              setImageURL((current) => [...current, URL]);
            }
          }
        })
        .catch((error) => {
          toast.error(error);
        });
      setCheck(true);
    }
  };

  const getSingleAd = async () => {
    const docRef = doc(db, "allAds", id);
    const querySnapshot = await getDoc(docRef);
    setSingleAd(querySnapshot.data());
    getAllImages();
  };

  useEffect(() => {
    id && getSingleAd();
  }, [id]);

  return (
    <main className=" ">
      <div className="max-w-7xl mx-auto ">
        <div className=" w-full p-1 text-blue-500  ">
          <h2 className="text-sm flex items-center ">
            {icon}Otomobil {icon}
            &nbsp;{singleAd.brand}
            &nbsp;{icon} {singleAd.model}
          </h2>
        </div>
        <div className="mt-6 p-1 md:p-2">
          <h1 className="border-b text-xl md:text-2xl font-semibold mb-4">
            {singleAd.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-7">
            <div className=" col-span-1 md:col-span-3 flex">
              <div className="w-full">
                {check ? (
                  <div className="">
                    <img
                      className="w-full h-80 object-cover"
                      src={bigImage ? bigImage : imageURL[0]}
                      alt=""
                    />
                    <div className="grid grid-cols-4 border mt-4">
                      {imageURL.map((url) => (
                        <img
                          onClick={() => setBigImage(url)}
                          className="w-full h-24 p-1 object-cover cursor-pointer"
                          key={url}
                          src={url}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-80 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <h2 className="font-semibold">Yükleniyor..</h2>
                      <CgSpinner className="w-10 h-10 animate-spin  text-blue-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className=" col-span-1 md:col-span-2">
              <div className="px-4">
                <h2 className="font-semibold text-lg">{singleAd.price} TL</h2>
                <div className="flex items-center">
                  <IoLocationSharp className="w-5 h-5" />
                  <h2 className="font-semibold my-3 text-sm">
                    {singleAd.city}
                  </h2>
                </div>
              </div>
              <CarFeatures features={singleAd} />
            </div>
            <div className="border col-span-1 md:col-span-2 h-40 p-1">
              <SellerInfo info={singleAd} />
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="w-full bg-slate-200 p-1 border">
            <h2 className="font-semibold px-5">Açıklama</h2>
          </div>
          <div className="p-5">{singleAd.explanation}</div>
        </div>
      </div>
    </main>
  );
};

export default SingleAd;
