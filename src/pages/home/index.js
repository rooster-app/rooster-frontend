// @packages
import { useSelector } from 'react-redux';
// @scripts
import CreatePostForm from '../../components/post/createPostForm';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import Post from '../../components/post/postComponent';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import './style.css';

export default function Home({ setPostModalVisible, posts }) {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        {user?.verified === false && <SendVerification user={user} />}
        <CreatePostForm user={user} setPostModalVisible={setPostModalVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
