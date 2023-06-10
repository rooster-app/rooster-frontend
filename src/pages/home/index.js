// @packages
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import CreatePostForm from '../../components/createPostForm';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import Post from '../../components/post';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import './home.css';

export default function Home({
  getAllPosts,
  setPostModalVisible,
  posts,
  loading,
}) {
  const { user } = useSelector((user) => ({ ...user }));
  const [height, setHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
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

  return (
    <div className='home' style={{ height: `${height + 100}px` }}>
      <Header page='home' getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        {user?.verified === false && <SendVerification user={user} />}
        <CreatePostForm user={user} setPostModalVisible={setPostModalVisible} />
        <div className='posts'>
          {posts?.map((post, i) => (
            <Post key={i} post={post} user={user} getAllPosts={getAllPosts}/>
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
