import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import * as authOperation from '../../redux/authRedux/authOperation';
import styles from './Register.module.css'


const RegisterView = () => {
    const dispatch = useDispatch();

    const onSubmit = ev => {
        ev.preventDefault();
        const { target: { name, email, password } } = ev;
        const data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
       dispatch(authOperation.register(data))
    }

    return <Form className={styles.Form} onSubmit={onSubmit}>
          <h2 className={styles.Text}>Регистрация</h2>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Имя</Form.Label>
    <Form.Control type="text" placeholder="Введите имя" name='name'/>
    <Form.Text className="text-muted">
    </Form.Text>
        </Form.Group>
        
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Электронная почта</Form.Label>
    <Form.Control type="email" placeholder="Введите почту" name='email'/>
    <Form.Text className="text-muted">
     
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Пароль</Form.Label>
    <Form.Control type="password" placeholder="Введите пароль" name='password'/>
  </Form.Group>

  <Button className={styles.Button} variant="dark" type="submit">
    Submit
  </Button>
</Form>
}



export default RegisterView;