/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";

const AdCards = ({ ad }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`ilan/${ad.id}`)}
      className={`shadow-2xl ${
        ad.emergency && "shadow-red-500"
      }  cursor-pointer active:cursor-grabbing  col-span-12 sm:col-span-6 xl:col-span-3 m-2 rounded-lg`}
    >
      <img
        className="min-w-full h-48 object-cover rounded-t-lg"
        src={ad.image}
        alt=""
        loading="lazy"
      />
      <div className="p-5">
        <h2 className="text-[20px] text-[#1b1c1d] font-bold">{ad.brand}</h2>
        <h2 className="text-[16px] text-[#1b1c1d] font-semibold">{ad.model}</h2>
        <div className="flex space-x-2 text-[#1b1c1d] text-[14px] mt-2 items-center">
          <div className="flex items-center space-x-1">
            <h2 className="">{ad.year}</h2>
            <hr className="border-r-black border-2 h-4" />
          </div>
          <div className="flex items-center space-x-1">
            <h2>{ad.kilometer} km</h2>

            <hr className="border-r-black border-2 h-4" />
          </div>
          <div className="flex items-center space-x-1">
            <h2 className="">{ad.gear}</h2>
            <hr className="border-r-black border-2 h-4" />
          </div>

          <h2 className="">{ad.fuel}</h2>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] text-[#4e5052] font-bold mt-2">
            {ad.price} TL
          </h2>
          <h2 className="text-2xl text-red-500 font-semibold underline">
            {ad.emergency && "ACİL"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdCards;
