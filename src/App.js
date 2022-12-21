// @packages
import { Routes, Route } from "react-router-dom";
// @scripts
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import Login from "./pages/login";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Profile from "./pages/profile";

function App() {
  
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
