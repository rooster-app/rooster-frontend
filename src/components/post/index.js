// @packages
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
// @scripts
import './style.css';
import Comment from './Comment';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import ReactsPopup from './ReactsPopup';
import { Dots, Public } from '../../svg';
import { getReacts, reactPost } from '../../functions/post';

export default function Post({ post, user, profile }) {
  const postRef = useRef(null);
  const [check, setCheck] = useState();
  const [savedPost, setSavedPost] = useState();
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);
  const [reacts, setReacts] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingPost, setEditingPost] = useState(false);
  const [text, setText] = useState(post?.text);

  const textRef = useRef(null);

  useEffect(() => {
    getPostReacts();
    // eslint-disable-next-line
  }, [post]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post?.comments]);

  const getPostReacts = async () => {
    const res = await getReacts(post?._id, user?.token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setSavedPost(res.checkSaved);
  };

  const reactHandler = async (type) => {
    reactPost(post?._id, type, user?.token);
    // if the new type of reaction is what is in the database
    if (check === type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react === check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      // otherwise change the type of reaction
      setCheck(type);
      // and modify counts
      let index = reacts.findIndex((x) => x.react === type);
      let index1 = reacts.findIndex((x) => x.react === check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };

  const commentHandler = () => {
    setOpenComment((value) => !value);
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const cancelUpdatingPostComment = () => {
    setEditingPost(false);
    setText(post?.text);
  }

  const updatePostComment = () => {
    setEditingPost(false);
    // Call function to persist comment here
    return;
  };

  return (
    <div
      className='post'
      style={{ width: `${profile && '100%'}` }}
      ref={postRef}>
      <div className='post_header'>
        <Link
          to={`/profile/${post?.user?.username}`}
          className='post_header_left'>
          <img src={post?.user?.picture} alt='' />
          <div className='header_col'>
            <div className='post_profile_name'>
              {post?.user?.first_name} {post?.user?.last_name}
              <div className='updated_p'>
                {post?.type === 'profilePicture' &&
                  `updated ${
                    post?.user?.gender === 'male'
                      ? 'his'
                      : post?.user?.gender === 'female'
                      ? 'her'
                      : 'their'
                  } profile picture`}
                {post?.type === 'coverPicture' &&
                  `updated ${
                    post?.user?.gender === 'male'
                      ? 'his'
                      : post?.user?.gender === 'female'
                      ? 'her'
                      : 'their'
                  } cover picture`}
              </div>
            </div>
            <div className='post_profile_privacy_date'>
              <Moment fromNow interval={30}>
                {post?.createdAt}
              </Moment>
              . <Public color='#828387' />
            </div>
          </div>
        </Link>
        <div
          className='post_header_right hover1'
          onClick={() => setShowMenu((prev) => !prev)}>
          <Dots color='#828387' />
        </div>
      </div>
      {post?.background ? (
        <div
          className='post_bg'
          style={{ backgroundImage: `url(${post?.background})` }}>
          <div className='post_bg_text'>{post?.text}</div>
        </div>
      ) : post?.type === null ? (
        <>
          {!editingPost && <div className='post_text'>{text}</div>}
          {editingPost && (
            <div>
              <textarea
                ref={textRef}
                maxLength='250'
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={'post_input'}
                style={{
                  paddingTop: `Math.abs(textRef.current.value.length * 0.1 - 32)
                }%`,
                }}></textarea>
              <div className='edit_comment_btn_container'>
                <button
                  className='gray_bttn opacity_btn edit_comment_btn'
                  onClick={() => cancelUpdatingPostComment()}>
                  Cancel
                </button>
                <button
                  className='teal_bttn edit_comment_btn'
                  onClick={() => updatePostComment()}>
                  Save
                </button>
              </div>
            </div>
          )}
          {post?.images && post?.images.length && (
            <div
              className={
                post?.images.length === 1
                  ? 'grid_1'
                  : post?.images.length === 2
                  ? 'grid_2'
                  : post?.images.length === 3
                  ? 'grid_3'
                  : post?.images.length === 4
                  ? 'grid_4'
                  : post?.images.length >= 5 && 'grid_5'
              }>
              {post?.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt='' className={`img-${i}`} />
              ))}
              {post?.images.length > 5 && (
                <div className='more-pics-shadow'>
                  +{post?.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post?.type === 'profilePicture' ? (
        <div className='post_profile_wrap'>
          <div className='post_updated_bg'>
            <img
              src={`${
                post?.user?.cover
                  ? post.user.cover
                  : '../../../images/postBackgrounds/10.jpg'
              }`}
              alt=''
            />
          </div>
          <img
            alt=''
            className='post_updated_picture'
            src={post?.images[0].url}
          />
        </div>
      ) : (
        <div className='post_cover_wrap'>
          <img src={post?.images[0].url} alt='' />
        </div>
      )}
      <div className='post_infos'>
        <div className='reacts_count'>
          <div className='reacts_count_imgs'>
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=''
                        key={i}
                      />
                    )
                )}
          </div>
          <div className='reacts_count_num'>{total > 0 && total}</div>
        </div>
        <div className='to_right'>
          <div className='comments_count'>
            {comments?.length > 1
              ? `${comments.length} comments`
              : comments?.length > 0
              ? '1 comment'
              : ''}{' '}
          </div>
          {/* <div className='share_count'>1 share</div> */}
        </div>
      </div>
      <div className='post_actions'>
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className='post_action hover1'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check ? check : 'like')}>
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=''
              className='small_react'
              style={{ width: '18px' }}
            />
          ) : (
            <i className='like_icon'></i>
          )}
          <span
            style={{
              color: `
          
          ${
            check === 'like'
              ? '#4267b2'
              : check === 'love'
              ? '#f63459'
              : check === 'haha'
              ? '#f7b125'
              : check === 'sad'
              ? '#f7b125'
              : check === 'wow'
              ? '#f7b125'
              : check === 'angry'
              ? '#e4605a'
              : ''
          }
          `,
            }}>
            {check ? check : 'Like'}
          </span>
        </div>
        <div className='post_action ignore_action'>
          {/* <i className='share_icon'></i> */}
          <span> </span>
        </div>
        <div className='post_action hover1' onClick={commentHandler}>
          <i className='comment_icon'></i>
          <span>Comment</span>
        </div>
      </div>
      <div className='comments_wrap'>
        <div className='comments_order'></div>
        {openComment && (
          <CreateComment
            postId={post?._id}
            setComments={setComments}
            setCount={setCount}
            user={user}
            openComment={openComment}
            setOpenComment={setOpenComment}
          />
        )}
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => (
              <Comment
                comment={comment}
                key={i}
                post={post}
                setComments={setComments}
                setCount={setCount}
                user={user}
              />
            ))}
        {count < comments?.length && (
          <div className='view_comments' onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          images={post?.images}
          imagesLength={post?.images?.length}
          postId={post?._id}
          postRef={postRef}
          postUserId={post?.user?._id}
          savedPost={savedPost}
          setEditingPost={setEditingPost}
          setSavedPost={setSavedPost}
          setShowMenu={setShowMenu}
          token={user?.token}
          userId={user?.id}
        />
      )}
    </div>
  );
}
