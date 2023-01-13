// @packages
import { Link } from 'react-router-dom';

export default function LeftLink({ img, text, link, notification }) {
  return (
    <Link to={link} className='left_link hover2'>
      <img src={`../../../left/${img}.png`} alt='' />
      {notification !== undefined ? (
        <div className='col'>
          <div className='col_1'>{text}</div>
          <div className='col_2'>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </Link>
  );
}
