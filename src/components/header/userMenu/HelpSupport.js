import { Link } from 'react-router-dom';

export default function HelpSupport({ setVisible }) {
  return (
    <div className='absolute_wrap'>
      <div className='absolute_wrap_header'>
        <div
          className='circle hover1'
          onClick={() => {
            setVisible(0);
          }}>
          <i className='arrow_back_icon'></i>
        </div>
        Help & Support
      </div>
      <Link to='support' className='mmenu_item hover3'>
        <div className='small_circle'>
          <i className='email_icon'></i>
        </div>
        <div>Support Inbox</div>
      </Link>
      <Link to='/support' className='mmenu_item hover3'>
        <div className='small_circle'>
          <i className='info_filled_icon'></i>
        </div>
        <div>Report a Problem</div>
      </Link>
    </div>
  );
}
