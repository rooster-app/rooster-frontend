// @packages
import axios from 'axios';
import DotLoader from 'react-spinners/DotLoader';
import React, { useEffect, useRef, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import CreatePostForm from '../../components/createPostForm';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import Post from '../../components/post';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import { postsReducer } from '../../functions/reducers';
import './saved.css';

export default function Saved({ setPostModalVisible }) {
  // eslint-disable-next-line
  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  const { user } = useSelector((user) => ({ ...user }));
  const [height, setHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  const [savedPostsFound, setSavedPostsFound] = useState(null);
  const middle = useRef(null);

  useEffect(() => {
    setHeight(middle.current.clientHeight + 30);
    window.addEventListener('scroll', getScroll, { passive: true });
    return () => {
      window.addEventListener('scroll', getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);

  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  const getSavedPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/getSavedPosts`,
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

      if (data.length > 0) {
        setSavedPostsFound(true);
      } else {
        setSavedPostsFound(false);
      }
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
    getSavedPosts();
    // eslint-disable-next-line
  }, [user?.token]);

  return (
    <div className='home' style={{ height: `${height + 100}px` }}>
      <Header page='home' getAllPosts={getSavedPosts} />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        {user?.verified === false && <SendVerification user={user} />}
        <CreatePostForm user={user} setPostModalVisible={setPostModalVisible} />
        <div className='posts'>
          <DotLoader
            className='posts_spinner'
            color='#0cb1c7'
            loading={loading}
            size={30}
          />
          {posts?.length > 0
            ? posts?.map((post, i) => <Post key={i} post={post} user={user} />)
            : ''}
          {savedPostsFound === false && (
            <div className='no_saved_posts'>Go Save a Post!</div>
          )}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
