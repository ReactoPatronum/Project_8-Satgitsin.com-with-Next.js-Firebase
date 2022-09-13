import React, { useEffect } from "react";
import { AiFillCar } from "react-icons/ai";
import { ImMobile } from "react-icons/im";
import { useRouter } from "next/router";
import { useCategories } from "../../context/CategoryContext";

const Advert = () => {
  const { car, electronics, setCar, setElectronics } = useCategories();
  const router = useRouter();

  return (
    <main className="max-w-5xl mx-auto  p-6 ">
      <h1 className="text-center text-xl  md:text-3xl font-semibold">İLAN YAYINLA</h1>
      <div className="mt-6">
        <h2 className="text-lg  md:text-2xl font-semibold">BİR KATEGORİ SEÇ</h2>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2">
        <div
          onClick={() => {
            setCar(true);
            setElectronics(false)
            router.push("/ilan/detaylar");
          }}
          className="sm:hover:scale-105 transition-all duration-200 m-2 sm:-ml-3 relative rounded-xl shadow-lg w-full h-[300px] sm:h-[400px] flex items-center justify-center cursor-pointer"
        >
          <div
            className={`bg-orange-500 w-full h-2 absolute top-0 rounded-t-lg`}
          ></div>
          <div className="flex flex-col justify-center items-center text-orange-500">
            <AiFillCar className={` h-12 w-12 `} />
            <h2 className="text-lg font-semibold">Araba</h2>
            <h2 className="text-lg font-semibold">İlanı vermek istiyorum</h2>
          </div>
        </div>

        <div
          onClick={() => {
            setElectronics(true);
            setCar(false)
          }}
          className="bg-slate-200 sm:-mr-3  m-2 relative rounded-xl shadow-lg w-full h-[300px] sm:h-[400px] flex items-center justify-center "
        >
          <div
            className={`bg-purple-500 w-full h-2 absolute top-0 rounded-t-lg`}
          ></div>
          <div className="h-full w-full relative flex flex-col justify-center items-center text-purple-500">
            <ImMobile className={` h-10 w-10 `} />
            <h2 className={``}>Telefon</h2>
            <h2 className="">İlanı vermek istiyorum</h2>
           <div className="text-black absolute bottom-10">
           <h2 className="text-sm">
              ÇOK YAKINDA
            </h2>
            <h2 className="text-xs">(Bu kategori şuan da geliştirilme aşamasındadır.)</h2>
           </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Advert;
