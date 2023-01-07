// @packages
import Moment from 'react-moment';
// @scripts
import { deleteComment } from '../../functions/post';

export default function Comment({
  comment,
  post,
  user,
  setComments,
  setCount,
}) {

  const deleteCommentHandler = async () => {
    const updated_comments = await deleteComment(
      post?._id,
      comment?._id,
      user.token
    );
    setComments(updated_comments);
    setCount((prev) => --prev);
  };

  return (
    <div className='comment'>
      <img src={comment.commentBy.picture} alt='' className='comment_img' />
      <div className='comment_col'>
        <div className='comment_wrap'>
          <div className='comment_name'>
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          <div className='comment_text'>{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt='' className='comment_image' />
        )}
        <div className='comment_actions'>
          {/* <span>Like</span>
          <span>Reply</span> */}
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
          {post.user._id === user.id ? (
            <div className='delete_comment' onClick={deleteCommentHandler}>
              <span>Delete</span>
            </div>
          ) : user.id === comment.commentBy._id ? (
            <div className='delete_comment' onClick={deleteCommentHandler}>
              <span>Delete</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
