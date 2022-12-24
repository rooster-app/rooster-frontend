// @packages
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// @scripts
import Activate from './pages/activate';
import CreatePostModal from './components/post/createPostModal';
import Home from './pages/home';
import LoggedInRoutes from './routes/LoggedInRoutes';
import Login from './pages/login';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import Profile from './pages/profile';
import Reset from './pages/reset';

function App() {
  const [postModalVisible, setPostModalVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {postModalVisible && (
        <CreatePostModal
          user={user}
          setPostModalVisible={setPostModalVisible}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route
            path="/"
            element={<Home setPostModalVisible={setPostModalVisible} />}
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
