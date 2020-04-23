import React from 'react';
import 'Components/Header/header.styles.css';

const Header = () => (
  <div className="header">
    <img
      src="https://uploads-ssl.webflow.com/5e2f6f2acb2e5ea801e164bb/5e4f731d9da233ac2e3922f8_fpo-logo-white.svg"
      alt="logo"
      style={{ width: '15%' }}
    ></img>
    <div className="header__title">Search Mobilze Database for events displayed on map</div>
  </div>
);

export default Header;
