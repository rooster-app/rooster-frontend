// @packages
import { Link } from 'react-router-dom';
// @scripts
// import { Dots } from "../../svg";

export default function ProfileMenu({ visitor }) {
  return (
    <div className='profile_menu_wrap'>
      <div className='profile_menu'>
        <Link to='/profile' className='profile_menu_active'>
          Posts
        </Link>
        {!visitor && (
          <Link to='/friends' className='hover1'>
            Friends
          </Link>
        )}
        <Link to='/' className='hover1'>
          Home
        </Link>
      </div>
    </div>
  );
}
