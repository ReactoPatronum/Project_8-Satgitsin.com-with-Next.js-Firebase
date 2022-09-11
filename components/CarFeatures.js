import React from "react";
import { carFeature } from "../components/OptionItem";

const CarFeatures = ({ features }) => {
  const allSpecs= [
    features.brand,
    features.model,
    features. year,
    features.fuel,
    features. gear,
    features.kilometer,
    features.option,
    features. engine,
    features. wheel,
    features.color,
    features. plate,
    features.seat,
  ];
 
  return (
    <div>
      {carFeature.map((cf, i) => (
        <div className="grid grid-cols-2 border-b p-1 px-4" key={cf}>
          <h2 className="font-semibold col-span-1">{cf}</h2>
          <h2 className="col-span-1">{allSpecs[i]?allSpecs[i]:"Bilgi Verilmedi"}</h2>
        </div>
      ))}
    </div>
  );
};

export default CarFeatures;
