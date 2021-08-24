import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = name =>
  toast.error(`${name} is already in contact!`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export default notify;
