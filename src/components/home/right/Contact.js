// @packages
import { Link } from 'react-router-dom';

export default function Contact({friend }) {
  return (
    <Link to={`/profile/${friend?.username}`}>
      <div className='contact hover3'>
        <div className='contact_img'>
          <img src={friend?.picture} alt='' />
        </div>
        <span>
          {friend?.first_name} {friend?.last_name}
        </span>
      </div>
    </Link>
  );
}


