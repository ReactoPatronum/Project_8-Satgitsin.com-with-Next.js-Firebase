import React from "react";
import { useWindowSize } from "@react-hook/window-size";
import successImage from "../public/successImage.webp"
import {CheckCircleIcon} from "@heroicons/react/outline"
import Image from "next/image";
import Confetti from "react-confetti"
import Link from "next/link";

const Success = () => {
  const [width, height] = useWindowSize();

  return (
    <div>
      <div className="flex items-center justify-center mt-10 flex-col text-center p-4">
      <CheckCircleIcon className="w-20 h-20 text-green-500"/>
      <h2 className="text-3xl font-semibold">Tebrikler ilanınız başarı ile oluşturuldu!</h2>
      <h2 className="text-xl mt-4 mb-10">İlanınızı ilanlarım sekmesinden görüntüleyebilirsiniz.</h2>
      <Link href="/ilanlarim">
      <h2 className="text-blue-500 text-2xl my-3 font-semibold hover:underline cursor-pointer">İlanlarım</h2>
      </Link>
      <Image className="rounded-md" width={700} height={400} objectFit={"cover"} src={successImage}/>
      </div>
      
      <Confetti
      numberOfPieces={700}
      wind={0.01}
      gravity={0.05}
      width={width}
      height={height}
    />
      
    </div>
  );
};

export default Success;
