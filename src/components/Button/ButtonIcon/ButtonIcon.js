import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ButtonIcon.module.css';

const ButtonIcon = ({ children, toggleIsVisible, aria, classButton }) => (
  <button
    className={[Styles[classButton]]}
    onClick={toggleIsVisible}
    aria-label={aria}
    type="button"
  >
    {children}
  </button>
);

ButtonIcon.propTypes = {
  children: PropTypes.node.isRequired,
  toggleIsVisible: PropTypes.func.isRequired,
  aria: PropTypes.string.isRequired,
};
export default ButtonIcon;
