// @packages
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
// @scripts
import Activate from './pages/activate';
import CreatePostModal from './components/createPostModal';
import Friends from './pages/friends';
import Home from './pages/home';
import LoggedInRoutes from './routes/LoggedInRoutes';
import Login from './pages/login';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import Profile from './pages/profile';
import Reset from './pages/reset';
import Saved from './pages/saved';
import Support from './pages/support';
import { postsReducer } from './functions/reducers';

function App() {
  const [postModalVisible, setPostModalVisible] = useState(false);
  const { darkTheme, user } = useSelector((state) => ({ ...state }));

  // eslint-disable-next-line
  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
      return 'Thank you';
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, [user?.token]);

  return (
    <div className={darkTheme ? 'dark' : 'rooster_app'}>
      {postModalVisible && (
        <CreatePostModal
          dispatch={dispatch}
          posts={posts}
          setPostModalVisible={setPostModalVisible}
          user={user}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path='/profile'
            element={
              <Profile
                setPostModalVisible={setPostModalVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path='/profile/:username'
            element={
              <Profile
                setPostModalVisible={setPostModalVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path='/friends'
            element={
              <Friends
                setPostModalVisible={setPostModalVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path='/friends/:type'
            element={
              <Friends
                setPostModalVisible={setPostModalVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route
            path='/'
            element={
              <Home
                loading={loading}
                posts={posts}
                setPostModalVisible={setPostModalVisible}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route path='/activate/:token' element={<Activate />} exact />
          <Route
            path='/saved'
            element={<Saved setPostModalVisible={setPostModalVisible} />}
            exact
          />
          <Route path='/support' element={<Support />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path='/login' element={<Login />} exact />
        </Route>
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
