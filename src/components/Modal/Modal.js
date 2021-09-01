import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ toggleIsVisible, children, isVisibleModal }) {
  const handleKeyDown = useCallback(
    ({ code }) => {
      if (code === 'Escape') {
        toggleIsVisible();
      }
    },
    [toggleIsVisible],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  function closeBackdropOnClick({ target, currentTarget }) {
    if (currentTarget === target) {
      toggleIsVisible();
    }
  }

  if (!isVisibleModal) {
    return null;
  }

  return createPortal(
    <div className={Styles.Backdrop} onClick={closeBackdropOnClick}>
      <div className={Styles.Modal}>{children}</div>
      <div className={Styles.Close}>
        <button
          type="button"
          className="btn-close btn-close-white"
          color="#fff"
          onClick={toggleIsVisible}
          aria-label="Close"
          width="30px"
          height="30px"
        ></button>
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  toggleIsVisible: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisibleModal: PropTypes.bool.isRequired,
};

export default Modal;
