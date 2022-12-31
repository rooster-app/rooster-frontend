// @scripts
import { Feeling, Photo } from '../../svg';
import './style.css';

export default function CreatePostForm({ user, setPostModalVisible, profile }) {
  return (
    <div className='createPost'>
      <div className='createPost_header'>
        <img src={user?.picture} alt='' />
        <div
          className='open_post hover2'
          onClick={() => setPostModalVisible(true)}>
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className='create_splitter'></div>
      <div className='createPost_body'>
        <div
          className='createPost_icon hover1'
          onClick={() => setPostModalVisible(true)}>
          <img src={`../../../left/events.png`} alt='' />
          Post Event
        </div>
        <div
          className='createPost_icon hover1'
          onClick={() => setPostModalVisible(true)}>
          <Photo color='#4bbf67' />
          Share Photo
        </div>
        {profile ? (
          <div
            className='createPost_icon hover1'
            onClick={() => setPostModalVisible(true)}>
            <i className='lifeEvent_icon'></i>
            Life Stuff
          </div>
        ) : (
          <div
            className='createPost_icon hover1'
            onClick={() => setPostModalVisible(true)}>
            <Feeling color='#f7b928' />
            Feeling/Activity
          </div>
        )}
      </div>
    </div>
  );
}
