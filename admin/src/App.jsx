import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import axios from "axios"

function App() {
  axios.configs.baseUrl = import.meta.env.BACKEND_URL

  return (
    <>
      <Navbar />
      <Admin />
    </>
  );
}

export default App
  