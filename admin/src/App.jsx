import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import axios from "axios"

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

  return (
    <>
      <Navbar />
      <Admin />
    </>
  );
}

export default App
  