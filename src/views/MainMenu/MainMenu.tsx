import React from 'react';

import { Link } from 'react-router-dom';

import './MainMenu.css';

const MainMenu = (): JSX.Element => {
  return (
    <div className="main-menu-container">
      <h1>Coffee Calculator</h1>
      <ul>
        <li>
          <Link to="/four-six">4:6</Link>
        </li>
        <li>
          <Link to="/french-press">French Press</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
