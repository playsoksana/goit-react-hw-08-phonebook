import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({
  filter,
  name,
  onChangeInput,
  textLabel,
  value,
  ...allProps
}) => {
  return (
    <>
      <input
        className={styles.Input}
        value={value}
        onChange={onChangeInput}
        {...allProps}
        name={name}
        required
      />
      <label htmlFor={name} className={styles.Label}>
        {textLabel}
      </label>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  textLabel: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
