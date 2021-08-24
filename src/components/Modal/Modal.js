import { useEffect, useCallback } from 'react';
import Styles from './Modal.module.css';
import ButtonIcon from '../Button/ButtonIcon';
import PropTypes from 'prop-types';
import { ReactComponent as IconAddContact } from '../../icon/close.svg';
import { createPortal } from 'react-dom';

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
      <ButtonIcon
        toggleIsVisible={toggleIsVisible}
        aria="close"
        classButton="ButtonIcon"
      >
        <IconAddContact width="20px" height="20px" />
      </ButtonIcon>
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
