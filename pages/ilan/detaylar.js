import React, { useEffect } from "react";
import { useCategories } from "../../context/CategoryContext";
import CarCategory from "/components/CarCategory";
import { useRouter } from "next/router";

const Detaylar = () => {
  const router = useRouter();
  const { car, electronics,checkReload } = useCategories();

  useEffect(() => {
    if (!electronics && !car) {
      router.push("/ilan");
    }
  }, []);

  useEffect(() => {
    if(checkReload){
      window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
    }
  }, [checkReload]);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  
  return (
    <main className="p-1 max-w-4xl mx-auto flex flex-col  ">
      <h1 className="text-center text-2xl md:text-4xl my-5 font-semibold">İLAN YAYINLA</h1>
      <div>
        {car && <CarCategory />}
      </div>
    </main>
  );
};

export default Detaylar;
