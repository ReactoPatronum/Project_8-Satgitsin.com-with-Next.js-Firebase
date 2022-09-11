import React, { useState } from "react";
import {
  carType,
  gearType,
  numOfSeat,
  wheelDrive,
  fuels,
  cities,
} from "../components/OptionItem";
import LastCheck from "./LastCheck";
import UploadFiles from "./UploadFiles";
import { useAuth } from "../context/AuthContext";
import { SendCarAd } from "../components/SendToFirebase";
import { useRouter } from "next/router";
import { useCategories } from "../context/CategoryContext";

const CarCategory = () => {
  const router = useRouter();
  const { setCheckReload } = useCategories();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [option, setOption] = useState("");
  const [gear, setGear] = useState("");
  const [seat, setSeat] = useState("");
  const [wheel, setWheel] = useState("");
  const [fuel, setFuel] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState({
    number: "",
    showNumber: false,
    name: user.displayName,
    emergency: false,
  });
  const [allInputs, setAllInputs] = useState({
    year: "",
    model: "",
    brand: "",
    kilometer: "",
    plate: "",
    color: "",
    title: "",
    explanation: "",
    price: "",
    engine: "",
    boldText: false,
  });
  const { year, brand, model, engine, kilometer, title, explanation, price } =
    allInputs;
  const disabled =
    !year ||
    !brand ||
    !model ||
    !engine ||
    !kilometer ||
    !title ||
    !explanation ||
    !price ||
    !userInfo.name ||
    !images.length ||
    images.length > 8 ||
    !option ||
    !gear ||
    !fuel ||
    !city;

  const handleGear = (gears) => {
    if (!gear) {
      setGear(gears);
    } else {
      setGear("");
    }
  };

  const handleWheel = (wheels) => {
    if (!wheel) {
      setWheel(wheels);
    } else {
      setWheel("");
    }
  };

  function pay() {
    if (userInfo.emergency && allInputs.boldText) return 550;
    if (allInputs.boldText) return 300;
    if (userInfo.emergency) return 250;
  }
  return (
    <div className="border-2 p-5">
      <div className="border-b-2 ">
        <h2 className="text-lg font-semibold">SEÇİLEN KATEGORİ</h2>
        <p className="text-lg font-semibold">Araba</p>
      </div>
      <div className="mt-10 space-y-6">
        <h2>
          BİRAZ BİLGİ EKLE{" "}
          <span className="text-red-500 text-xs">
            * olan yerleri doldurmak zorunludur.
          </span>
        </h2>
        <div className="">
          <h2>Yıl*</h2>
          <input
            value={allInputs.year}
            onChange={(e) =>
              setAllInputs((current) => ({ ...current, year: e.target.value }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Marka*</h2>
          <input
            value={allInputs.brand}
            onChange={(e) =>
              setAllInputs((current) => ({ ...current, brand: e.target.value }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Model*</h2>
          <input
            value={allInputs.model}
            onChange={(e) =>
              setAllInputs((current) => ({ ...current, model: e.target.value }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Kasa Tipi*</h2>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="cursor-pointer border h-10  rounded-lg border-black p-2 "
          >
            {carType.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="">
          <h2>Vites*</h2>
          <div className=" flex  flex-wrap">
            {gearType.map((gears) => (
              <h3
                onClick={() => handleGear(gears)}
                className={`border mr-6 p-1 mt-4 cursor-pointer hover:bg-blue-300 transition-all duration-200 ${
                  gear == gears && "bg-blue-300 border-black border-2"
                }`}
                key={gears}
              >
                {gears}
              </h3>
            ))}
          </div>
        </div>
        <div className="">
          <h2>Koltuk Sayısı</h2>
          <select
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            className="mt-4 cursor-pointer border h-10  rounded-lg border-black p-2 "
          >
            {numOfSeat.map((seat) => (
              <option key={seat}>{seat}</option>
            ))}
          </select>
        </div>
        <div className="">
          <h2>Çekiş</h2>
          <div className=" flex  flex-wrap">
            {wheelDrive.map((wheels) => (
              <h3
                onClick={() => handleWheel(wheels)}
                className={`border mr-6 p-1 mt-4 cursor-pointer hover:bg-blue-300 transition-all duration-200 ${
                  wheel == wheels && "bg-blue-300 border-black border-2"
                }`}
                key={wheels}
              >
                {wheels}
              </h3>
            ))}
          </div>
        </div>
        <div className="">
          <h2>Motor*</h2>
          <input
            value={allInputs.engine}
            onChange={(e) =>
              setAllInputs((current) => ({
                ...current,
                engine: e.target.value,
              }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Kilometre*</h2>
          <input
            value={allInputs.kilometer}
            onChange={(e) =>
              setAllInputs((current) => ({
                ...current,
                kilometer: e.target.value,
              }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Plaka</h2>
          <input
            value={allInputs.plate}
            onChange={(e) =>
              setAllInputs((current) => ({ ...current, plate: e.target.value }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Renk</h2>
          <input
            value={allInputs.color}
            onChange={(e) =>
              setAllInputs((current) => ({ ...current, color: e.target.value }))
            }
            className="border h-10 text-xl rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
        </div>
        <div className="">
          <h2>Yakıt*</h2>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="mt-4 cursor-pointer border h-10  rounded-lg border-black p-2 "
          >
            {fuels.map((fuel) => (
              <option key={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
        <div className="max-w-[290px]">
          <div className="flex justify-between">
            <h2>İlan Başlığı*</h2>
            <h2>{allInputs.title.length} / 70</h2>
          </div>
          <input
            value={allInputs.title}
            onChange={(e) =>
              setAllInputs((current) => ({
                ...current,
                title: e.target.value.slice(0, 70),
              }))
            }
            placeholder="Ürününün temel özelliklerinden bahset"
            className="border h-10 w-[295px] rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
          <div className="flex items-center mt-2">
            <input
              value={allInputs.boldText}
              onChange={() =>
                setAllInputs((current) => ({
                  ...current,
                  boldText: !allInputs.boldText,
                }))
              }
              type="checkbox"
            />
            <span className="text-sm mx-3 text-orange-600">
              İlanım Anasayfa da Yer Alsın ( +300TL )
            </span>
          </div>
        </div>
        <div className="">
          <h2>Açıklama*</h2>
          <textarea
            value={allInputs.explanation}
            onChange={(e) =>
              setAllInputs((current) => ({
                ...current,
                explanation: e.target.value.slice(0, 1500),
              }))
            }
            placeholder="Durum, özellik ve satma nedeni gibi bilgileri ekle"
            cols="37"
            className="h-40 resize-none border  rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
            type="text"
          />
          <p>{allInputs.explanation.length}/1500</p>
        </div>
        <div className="border-y-2 py-4 ">
          <h2>FİYAT BELİRLE</h2>
          <h2>Fiyat*</h2>
          <div className="flex items-center">
            <p className="border-r-2 border-gray-600 absolute px-2">₺</p>
            <input
              value={allInputs.price}
              onChange={(e) =>
                setAllInputs((current) => ({
                  ...current,
                  price: e.target.value,
                }))
              }
              className="pl-8 border h-10 w-[295px] rounded-lg border-black p-2 focus-within:outline-blue-700 focus-within:border-2"
              type="number"
            />
          </div>
        </div>
        <UploadFiles images={images} setImages={setImages} />
        <div className="border-y-2 py-4 ">
          <h2>KONUMUNU ONAYLA</h2>
          <p>İl*</p>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="cursor-pointer border h-10  rounded-lg border-black p-2 "
          >
            {cities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <LastCheck userInfo={userInfo} setUserInfo={setUserInfo} />
        <div>
          <button
            onClick={() =>
              SendCarAd(
                user,
                option,
                gear,
                seat,
                wheel,
                fuel,
                city,
                userInfo,
                allInputs,
                images
              )
                .then(() => setCheckReload(false))
                .then(() => router.push("/success"))
            }
            disabled={disabled}
            className="disabled:bg-gray-400 disabled:scale-100 p-3 font-semibold bg-blue-400 text-white rounded-md transition-all duration-200 hover:bg-green-400 hover:scale-[1.02]"
          >
            {pay() ? `${pay()} TL öde ve ilan ver` : "İlan ver"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCategory;
