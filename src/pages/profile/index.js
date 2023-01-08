// @packages
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
// @scripts
import './style.css';
import Cover from './Cover';
import CreatePostForm from '../../components/createPostForm';
import CreatePostModal from '../../components/createPostModal';
import DotLoader from 'react-spinners/DotLoader';
import Friends from './Friends';
// import GridPosts from './GridPosts';
import Header from '../../components/header';
import Intro from '../../components/intro';
import Photos from './Photos';
import Post from '../../components/post';
// import PplYouMayKnow from './PplYouMayKnow';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import { profileReducer } from '../../functions/reducers';

export default function Profile({ getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));

  const { username } = useParams();
  const navigate = useNavigate();
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [photos, setPhotos] = useState({});
  const [postPhotoUrls, setPostPhotoUrls] = useState();
  const [othername, setOthername] = useState();
  const [shuffledFriends, setShuffledFriends] = useState(false);
  const [shuffledFriendsArray, setShuffledFriendsArray] = useState();

  var userName = username === undefined ? user.username : username;
  // determine if the user is profile page visitor or owner
  var visitor = userName === user.username ? false : true;

  // eslint-disable-next-line
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, [userName]);

  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  // cloudinary path to get photos from
  const path = `${user.id}/*`;
  const max = 30;
  const sort = 'desc';

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.success === false) {
        navigate('/profile');
      } else {
        // get photo URL's for Photos function
        const photoUrls = [];
        if (data.posts) {
          data.posts.forEach((post) => {
            if (post.images) {
              photoUrls.push(post.images[0].url);
            }
          });
        }
        setPostPhotoUrls(photoUrls);
        // get all images for ProfilePicture function
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 30);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener('scroll', getScroll, { passive: true });
    return () => {
      window.addEventListener('scroll', getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);

  const check = useMediaQuery({
    query: '(min-width:901px)',
  });

  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  if (profile?.friends && !shuffledFriends) {
    const shuffledFriends = [...profile?.friends];
    shuffledFriends.sort((a, b) => 0.5 - Math.random());
    setShuffledFriendsArray(shuffledFriends);
    setShuffledFriends(true);
  }

  return (
    <div className='profile'>
      {postModalVisible && (
        <CreatePostModal
          dispatch={dispatch}
          posts={profile?.posts}
          profile={profile}
          setPostModalVisible={setPostModalVisible}
          user={user}
        />
      )}
      <Header page='profile' getAllPosts={getAllPosts} />
      <div className='profile_top' ref={profileTop}>
        <div className='profile_container'>
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos?.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos?.resources}
            othername={othername}
            shuffledFriends={shuffledFriendsArray}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className='profile_bottom'>
        <div className='profile_container'>
          <div className='bottom_container'>
            {/* <PplYouMayKnow /> */}
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? 'scrollFixed showLess'
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    'scrollFixed showMore'
              }`}>
              <div className='profile_left' ref={leftSide}>
                <Intro
                  detailss={profile.details}
                  visitor={visitor}
                  setOthername={setOthername}
                />
                <Photos
                  username={userName}
                  token={user?.token}
                  photos={postPhotoUrls}
                />
                <Friends friends={shuffledFriendsArray} />
              </div>
              <div className='profile_right'>
                {!visitor && (
                  <CreatePostForm
                    user={user}
                    profile={profile}
                    setPostModalVisible={setPostModalVisible}
                  />
                )}
                {/* <GridPosts /> */}
                <div className='posts'>
                  <DotLoader
                    className='loading-posts'
                    color='#0cb1c7'
                    loading={loading}
                    size={30}
                  />
                  {profile?.posts && profile?.posts?.length > 0 ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : !loading ? (
                    <div className='no_posts'>No posts available</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
