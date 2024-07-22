import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ExplorePage from "./pages/ExplorePage"
import LikePage from "./pages/LikePage"
import Sidebar from "./components/Sidebar"
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-200 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/explore" element={<ExplorePage />}/>
          <Route path="/likes" element={<LikePage />}/>
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}

export default App
