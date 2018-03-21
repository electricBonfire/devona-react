import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/app_dev.php';

let session = JSON.parse(localStorage.getItem("session"));
if(session) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + session.token.access_token;
}

export default axios;