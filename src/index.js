import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from "./Stores";
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios/index";

// axios.defaults.baseURL = 'http://localhost:8000/app.php';
axios.defaults.baseURL = 'http://localhost:8000/app_dev.php';

ReactDOM.render(<Provider { ...stores } ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();