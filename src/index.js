import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios/index";
import { Provider } from 'mobx-react';

import stores from "./Stores";
import App from './App/App';
import { APIBaseURL } from './config.js';

axios.defaults.baseURL = APIBaseURL;

ReactDOM.render(<Provider { ...stores } ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();