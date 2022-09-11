import React from "react";

const SellerInfo = ({ info }) => {
  const myDate = new Date(info?.timestamp?.seconds * 1000);
  const formatedTime = myDate.toJSON();

  return (
    <div className="h-full text-sm lg:text-base">
      <div className="bg-slate-200 h-full p-1 px-6 space-y-3 flex flex-col justify-center">
        <h2>
          İlan Sahibi: &nbsp;<span className="font-semibold">{info.name}</span>
        </h2>
        <h2>
          İlan Tarihi: &nbsp;{" "}
          <span className="font-semibold"> {formatedTime?.slice(0, 10)}</span>
        </h2>
        <h2>
          Cep No:&nbsp;{" "}
          <span className="font-semibold">
            {info.showNumber ? info.number : "Bilgi Verilmedi"}
          </span>
        </h2>
        <h2 className="font-bold text-red-500 text-lg">
          {info.emergency && "Acil İlan"}
        </h2>
      </div>
    </div>
  );
};

export default SellerInfo;
