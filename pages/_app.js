import Header from "../components/Header";
import "../styles/globals.css";
import { CategoriesContextProvider } from "/context/CategoryContext";
import {AuthContextProvider} from "/context/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
   <AuthContextProvider>
     <CategoriesContextProvider>
      <Header />
      <Component {...pageProps} />
    </CategoriesContextProvider>
   </AuthContextProvider>
  );
}

export default MyApp;
