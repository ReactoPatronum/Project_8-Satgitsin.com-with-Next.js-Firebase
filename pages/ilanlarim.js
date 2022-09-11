/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Ad from "../components/Ad";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Ilanlar = () => {
  const { user } = useAuth();
  const [myAd, setMyAd] = useState([]);

  const GetAds = async () => {
    const docRef = collection(db, "users", user?.email, "ad");
    const snapshots = await getDocs(
      query(docRef, orderBy("timestamp", "desc"))
    );
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    setMyAd(docs);
  };

  useEffect(() => {
    user && GetAds();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-10 p-2">
      <h1 className="text-center text-xl md:text-3xl font-semibold">
        İLANLARIM
      </h1>
      {myAd?.map((ad) => (
        <Ad key={ad.id} ad={ad} GetAds={GetAds} />
      ))}
    </div>
  );
};

export default Ilanlar;
