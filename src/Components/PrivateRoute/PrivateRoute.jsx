import React, { useState, useEffect } from 'react';
import './privateroute.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../api/auth-login';

const PrivateRoute = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
  
    const handleClosePopup = () => {
      setShowPopup(false);
      navigate('/login');
    };
  
    if (!currentUser && !showPopup) {
      setShowPopup(true);
    }
  
    return (
      <>
        {showPopup && (
          <div className="popup-container">
            <div className="popup-content">
              <p>Bạn cần đăng nhập để truy cập vào trang này!</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
        {currentUser ? children : null}
      </>
    );
  };
  
  export default PrivateRoute;
