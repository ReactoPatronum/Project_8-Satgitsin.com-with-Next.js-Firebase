/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";

const UploadFiles = ({ images, setImages }) => {
  const ref = useRef(null);
  const [imageURL, setImageURL] = useState([]);

  function handleImage(e) {
    setImages((current) => [...current, ...e.target.files]);
  }

  const deleteImage = (image) => {
    setImages((current) => current.filter((item) => item.name !== image.name));
  };

  console.log("images", images, "imageURL", imageURL);
  useEffect(() => {
    setImageURL([]);
    images.map((image) =>
      setImageURL((current) => [
        ...current,
        { name: image.name, URL: URL.createObjectURL(image) },
      ])
    );
  }, [images]);

  return (
    <div className="space-y-2 ">
      <h2 className="text-lg ">8 Adete Kadar Fotoğraf Yükleyebilirsin*</h2>
      <div className="flex items-center">
        <input
          ref={ref}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImage}
        />
        <button
          className="ml-2 p-2 px-5 text-white rounded-md font-semibold transition-all duration-150 hover:bg-blue-600 bg-[#007bff]"
          onClick={() => ref.current.click()}
        >
          Resim Seç
        </button>
        <p
          className={`${
            images.length > 8 ? "text-red-500" : "text-green-500"
          } font-semibold ml-10 text-lg`}
        >
          {images && images.length}/8
        </p>
      </div>
      {images && images.length > 8 && (
        <p className="text-red-500 text-lg font-semibold">
          {`Yüklenebilen Resim Adeti Aşıldı! ${
            images.length - 8
          } tane resim silin`}
        </p>
      )}
      <div className="flex flex-wrap">
        {imageURL &&
          imageURL.map((image, i) => (
            <div className="relative m-2" key={i}>
              <img className="w-32 h-32 object-cover" src={image.URL} alt="" />
              <XCircleIcon
                onClick={() => deleteImage(image)}
                className="w-8 h-8 absolute top-0 text-white right-0 cursor-pointer"
              />
              {i == 0 && (
                <p className="absolute bottom-0 left-11 text-white text-sm px-2 rounded-lg bg-red-500 max-w-fit">
                  Kapak
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadFiles;
