// @packages
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
// @scripts
import Activate from './pages/activate';
import CreatePostModal from './components/createPostModal';
import Home from './pages/home';
import LoggedInRoutes from './routes/LoggedInRoutes';
import Login from './pages/login';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import { postsReducer } from './functions/reducers';
import Profile from './pages/profile';
import Reset from './pages/reset';

// function reducer(state, action) {
//   switch (action.type) {
//     case 'POSTS_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'POSTS_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: '',
//       };
//     case 'POSTS_ERROR':
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// }

function App() {
  const [postModalVisible, setPostModalVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  // const [{ posts }, dispatch] = useReducer(reducer, {
  //   loading: false,
  //   posts: [],
  //   error: '',
  // });

  useEffect(() => {
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
      } catch (error) {
        dispatch({
          type: 'POSTS_ERROR',
          payload: error.response.data.message,
        });
        return Promise.reject(error);
      }
    };
    getAllPosts();
  }, [user?.token]);

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
          <Route
            path='/profile'
            element={<Profile setPostModalVisible={setPostModalVisible} />}
            exact
          />
          <Route
            path='/profile/:username'
            element={<Profile setPostModalVisible={setPostModalVisible} />}
            exact
          />
          <Route
            path='/'
            element={
              <Home setPostModalVisible={setPostModalVisible} posts={posts} />
            }
            exact
          />
          <Route path='/activate/:token' element={<Activate />} exact />
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
