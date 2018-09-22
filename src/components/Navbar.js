import React from 'react';
import { slide as BurgerMenu } from 'react-burger-menu';
import { Link } from 'gatsby';

import './Navbar.css';

export const Navbar = () => (
  <BurgerMenu right isOpen={false}>
    <Link exact="true" to="/" activeClassName="selected">
      Home
    </Link>
    <Link to="/news" activeClassName="selected">
      News
    </Link>
    <Link to="/team" activeClassName="selected">
      Meet our team
    </Link>
    <Link to="/bla" activeClassName="selected">
      Not found
    </Link>
  </BurgerMenu>
);
