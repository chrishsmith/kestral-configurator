import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="App-header">
      <div className="header-content">
        <Logo className="App-logo" />
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/configure">Single Damper</Link>
          <Link to="/bulk-order">Bulk Order</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/support">Support</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 