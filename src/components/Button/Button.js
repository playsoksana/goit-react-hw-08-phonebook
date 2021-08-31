import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonBlack = ({ type, onClick, children }) => (
  <Button type={type} className="btn btn-dark" onClick={onClick}>
    {children}
  </Button>
);

export default ButtonBlack;
