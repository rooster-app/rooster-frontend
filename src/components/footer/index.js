// @packages
import { Link } from 'react-router-dom';
import React from 'react';
// @scripts
import './style.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_wrapper'>
        <Link to='/'>Privacy</Link>
        <Link to='/'>Terms</Link>
        <Link className='rooster_copy' to='/' style={{ fontSize: '12px' }}>
          Rooster &copy; 2023
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
