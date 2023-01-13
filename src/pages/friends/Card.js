// @packages
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// @scripts
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
} from '../../functions/user';

export default function Card({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));

  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId, user?.token);
    if (res === 'ok') {
      getData();
    }
  };

  const confirmHandler = async (userId) => {
    const res = await acceptRequest(userId, user?.token);
    if (res === 'ok') {
      getData();
    }
  };

  const deleteHandler = async (userId) => {
    const res = await deleteRequest(userId, user?.token);
    if (res === 'ok') {
      getData();
    }
  };

  const sendFriendRequestHandler = async (userId) => {
    const res = await addFriend(userId, user?.token);
    if (res === 'ok') {
      getData();
    }
  };

  return (
    <div className='req_card'>
      <Link to={`/profile/${userr?.username}`}>
        <img src={userr?.picture} alt='' />
      </Link>
      <div className='req_name'>
        {userr?.first_name} {userr?.last_name}
      </div>
      {type === 'sent' ? (
        <button
          className='teal_bttn'
          onClick={() => cancelRequestHandler(userr?._id)}>
          Cancel Request
        </button>
      ) : type === 'request' ? (
        <>
          <button
            className='teal_bttn'
            onClick={() => confirmHandler(userr?._id)}>
            Confirm
          </button>
          <button
            className='gray_bttn'
            onClick={() => deleteHandler(userr?._id)}>
            Delete
          </button>
        </>
      ) : type === 'suggestion' ? (
        <button
          className='teal_bttn'
          onClick={() => sendFriendRequestHandler(userr?._id)}>
          Add Friend
        </button>
      ) : (
        ''
      )}
    </div>
  );
}
