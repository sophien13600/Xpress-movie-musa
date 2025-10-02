import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRoutes from './router/AppRoutes'
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://xflwlhugpayqffrkwkxb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbHdsaHVncGF5cWZmcmt3a3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMDQ2NzAsImV4cCI6MjA3NDg4MDY3MH0.IZgL6GAWKVC6FO3bZ62Z60QOnWQzGOL4PN7BqGYRBTA";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);


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
