import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import NotificationList from "./components/NotificationList";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Save token when user logs in
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div className="container mx-auto">
            {/* Navbar */}
            <header className="flex justify-between items-center bg-purple-300 p-4 rounded-md shadow-md">
              <h1 className="text-2xl font-bold">StackOverflow</h1>
              <nav className="flex gap-4 flex-wrap">
                <Link className="font-bold text-black bg-white rounded-md border-black border-2 px-3 py-1 hover:bg-gray-200" to="/">Home</Link>
                <Link className="font-bold text-white bg-black rounded-md px-3 py-1 hover:bg-gray-800" to="/notifications">Notifications</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
                >
                  Logout
                </button>
              </nav>
            </header>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<PostList token={token} />} />
              <Route path="/post/:postId" element={<SinglePost token={token} />} />
              <Route path="/notifications" element={<NotificationList token={token} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
