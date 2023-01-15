// @packages
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @scripts
import './style.css';
import SupportForm from './SupportForm';
import Footer from '../../components/footer';

export default function Support() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../images/rooster-logo.png' alt='' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user?.picture} alt='' />
            </Link>
            <button
              className='teal_bttn'
              onClick={() => {
                navigate('/');
              }}>
              Home
            </button>
          </div>
        ) : (
          <Link to='/' className='right_reset'>
            <button className='teal_bttn'>Home</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        <SupportForm />
      </div>
      <Footer />
    </div>
  );
}
