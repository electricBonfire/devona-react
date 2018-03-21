import { observable, action } from 'mobx';
import axios from "axios";

class ProjectStore {
    @observable projects = [];

    @action
    getProjects = () => {
        axios.get('/payments')
            .then((response) => {
                this.projects = response.data;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default ProjectStore;