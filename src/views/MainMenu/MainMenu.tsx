import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import './MainMenu.css';

const coinbase = '3FHZPvEnpFukXrRXJtGB7qWUmhhFGqmtzp';
const src = `https://chart.googleapis.com/chart?chs=180x180&cht=qr&choe=UTF-8&chl=bitcoin:${coinbase}`;

const MainMenu = (): JSX.Element => {
  const [copied, setCopied] = useState(false);
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
      <div className="bitcoin-donation">
        <div className="bitcoin-code">
          <img src={src} alt={coinbase} />
          <div>
            <h1>Buy me a coffee</h1>
            <p>
              If you found this site useful, please consider buying me a coffee
              with Bitcoins.
            </p>
          </div>
        </div>
        <div className="bitcoin-address">
          <div>
            Address <span> {coinbase}</span>
          </div>
          <CopyToClipboard text={coinbase} onCopy={() => setCopied(true)}>
            <button> {copied ? 'Copied!' : 'Copy'}</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
