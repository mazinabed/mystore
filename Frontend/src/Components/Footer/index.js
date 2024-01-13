import React from 'react';
import "./Cart.css";
//import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
      <p>شركة الحر العراقية المحدودة ش.ذ.م.م. بغداد النهضة شارع المعارض. رقم الهاتف: 07822256050</p>

        <p>
       تم انشاء وتطوير هذا البوت من قبل {' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
         <a href='https://babyloncenter.net'target="_blank" >www.babyloncenter.net </a> 
          &copy; {new Date().getFullYear()}. 
        </p>
      </div>
      {/* <h4>&copy; {new Date().getFullYear()} - Babylon Center</h4> */}
    </footer>
  );
};

export default Footer;
