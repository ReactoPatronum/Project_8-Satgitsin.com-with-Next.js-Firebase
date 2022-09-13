import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { db, storage } from "../firebase";

export const SendCarAd = async (
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
) => {
  if (user) {
    let toastId = toast.loading("Yükleniyor");
    const sendDocumentUser = await addDoc(
      collection(db, "users", user.email, "ad"),
      {
        option: option,
        gear: gear,
        seat: seat,
        wheel: wheel,
        fuel: fuel,
        city: city,
        number: userInfo.number,
        showNumber: userInfo.showNumber,
        name: userInfo.name,
        emergency: userInfo.emergency,
        year: allInputs.year,
        brand: allInputs.brand,
        model:allInputs.model,
        kilometer: allInputs.kilometer,
        plate: allInputs.plate,
        color: allInputs.color,
        title: allInputs.title,
        explanation: allInputs.explanation,
        price: allInputs.price,
        engine: allInputs.engine,
        boldText: allInputs.boldText,
        timestamp: serverTimestamp(),
      }
    );

    const allAds = await setDoc(doc(db, "allAds", sendDocumentUser.id), {
      option: option,
      gear: gear,
      seat: seat,
      wheel: wheel,
      fuel: fuel,
      city: city,
      number: userInfo.number,
      showNumber: userInfo.showNumber,
      name: userInfo.name,
      emergency: userInfo.emergency,
      year: allInputs.year,
      brand: allInputs.brand,
      model:allInputs.model,
      kilometer: allInputs.kilometer,
      plate: allInputs.plate,
      color: allInputs.color,
      title: allInputs.title,
      explanation: allInputs.explanation,
      price: allInputs.price,
      engine: allInputs.engine,
      boldText: allInputs.boldText,
      timestamp: serverTimestamp(),
    });

    if (images) {
      await images.forEach(async (image, i) => {
        const imageRef = ref(
          storage,
          `images/${sendDocumentUser.id}/${v4()}`
        );
        await uploadBytes(imageRef, image).then(() => {
          toast.success(
            `"Resim Yükleniyor" ${images.length - i} / ${images.length}`
          );
        });
      });
      //for thumbnail
      if (images[0]) {
        await uploadBytes(
          ref(storage, `images/${sendDocumentUser.id}/thumbnail`),
          images[0]
        );

        const downloadURL = await getDownloadURL(
          ref(storage, `images/${sendDocumentUser.id}/thumbnail`)
        );
        await updateDoc(doc(db, "allAds", sendDocumentUser.id), {
          image: downloadURL,
        });

        await updateDoc(
          doc(db, "users", user?.email, "ad", sendDocumentUser.id),
          {
            image: downloadURL,
          }
        );
      }
    }
    toast.success("İlanınız Başarıyla Yayımlandı", { id: toastId });
  }
};
