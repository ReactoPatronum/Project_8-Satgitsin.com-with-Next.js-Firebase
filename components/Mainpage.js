import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import banner from "../public/carWallpaper.jpg";
import AdCards from "./AdCards";
import { MdEmergency } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Mainpage = () => {
  const [allAds, setAllAds] = useState([]);
  const GetAds = async () => {
    const docRef = collection(db, "allAds");
    const snapshots = await getDocs(
      query(docRef, orderBy("timestamp", "desc"))
    );
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    setAllAds(docs);
  };

  useEffect(() => {
    GetAds();
  }, []);

  return (
    <main className="p-4 max-w-[1350px] mx-auto">
      <Image
        layout="responsive"
        className=" rounded-md "
        src={banner}
        alt="banner"
      />
      <div className="flex flex-col items-center text-center ">
        <h2 className="text-[#4e5052] font-semibold text-[25px] md:text-[40px]">
          İkinci el araç satmanın kolay ve güvenilir yolu
        </h2>
        <h2 className="text-[#4e5052] mt-4 md:mt-0 text-[16px] ">
          Aracınızı evinizin konforunda tek bir tık ile satın alın
        </h2>
      </div>
      <div className=" mt-4">
        <div className="flex items-center space-x-2 text-red-500 animate-pulse">
          <MdEmergency className="w-6 h-6" />
          <h1 className="text-2xl font-semibold ">Acil İlanlar</h1>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className=""
        >
          {allAds.map((ad) => {
            if (ad.emergency == true) {
              return (
                <SwiperSlide key={ad.id}>
                  <AdCards key={ad.id} ad={ad} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
        <h2 className="text-xs text-center my-2 text-slate-400">
          *Kaydırmak için sürükle ilana gitmek için tıkla
        </h2>
      </div>
      <div className="mt-6">
        <h1 className="text-2xl font-semibold">Tüm İlanlar</h1>
        <div className="grid grid-cols-12">
          {allAds.map((ad) => {
            if (ad.emergency !== true) {
              return <AdCards key={ad.id} ad={ad} />;
            }
          })}
        </div>
      </div>
    </main>
  );
};

export default Mainpage;
