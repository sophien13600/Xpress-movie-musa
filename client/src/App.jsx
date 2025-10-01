import './App.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRoutes from './router/AppRoutes'
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


function App() {


  const [instruments, setInstruments] = useState([]);
  useEffect(() => {
    getInstruments();
  }, []);
  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data);
  }
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />

    </>
  )
}

export default App
