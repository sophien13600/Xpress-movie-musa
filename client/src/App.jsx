import './App.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRoutes from './router/AppRoutes'




function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />

    </>
  )
}

export default App
