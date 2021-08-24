import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import store from './redux/contactsRedux/contactsStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}

      <App />

      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
