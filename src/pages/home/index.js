// @packages
import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import CreatePostForm from '../../components/createPostForm';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import Post from '../../components/post';
import { profileReducer } from '../../functions/reducers';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import './home_style.css';

export default function Home({ setPostModalVisible, posts }) {
  const { user } = useSelector((user) => ({ ...user }));



  const [height, setHeight] = useState();
  const middle = useRef(null);

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [posts]);

  // eslint-disable-next-line
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, [user]);

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getProfile/${user?.username}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (data.success) {
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      } else {
        dispatch({
          type: 'PROFILE_ERROR',
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className='home' style={{ height: `${height + 100}px` }}>
      <Header page='home' />
      <LeftHome user={user} profile={profile} />
      <div className='home_middle' ref={middle}>
        {user?.verified === false && <SendVerification user={user} />}
        <CreatePostForm user={user} setPostModalVisible={setPostModalVisible} />
        <div className='posts'>
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} profile={profile} />
    </div>
  );
}
