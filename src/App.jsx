import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigation } from "./components/Navigation"
import { Home } from "./pages/Home"
import { PostDetail } from "./pages/PostDetail"
import { Authors } from "./pages/Authors"
import { Footer } from "./components/Footer"

function App() {
  return (
    <Router>
      <div className="min-h-screen max-w-fullbg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/authors" element={<Authors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
