import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as authSelector from '../../redux/authRedux/authSelector';
import style from './Header.module.css';
import UserMenu from 'components/UserMenu';

const Header = () => {
  const isLoggedIn = useSelector(authSelector.getIsLoggedIn);

  return (
    <header>
      <nav className={style.Navigation}>
        <div>
          <NavLink
            exact
            to="/"
            className={style.Nav}
            activeClassName={style.Active}
          >
            Главная
          </NavLink>
          <NavLink
            exact
            to="/contacts"
            className={style.Nav}
            activeClassName={style.Active}
          >
            Список контактов
          </NavLink>
        </div>

        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <div>
            <NavLink
              exact
              to="/register"
              className={style.Nav}
              activeClassName={style.Active}
            >
              Регистрация
            </NavLink>
            <NavLink
              exact
              to="/login"
              className={style.Nav}
              activeClassName={style.Active}
            >
              Логин
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
