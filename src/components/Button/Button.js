import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonBlack = ({type, onClick, children}) => (
 <button type={type} className="btn btn-dark" onClick={onClick}>
    {children}
      </button>
);

export default ButtonBlack;