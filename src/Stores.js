import PaymentStore from './Payment/PaymentStore';
import DesignationStore from "./Designation/DesignationStore";
import UserStore from "./User/UserStore";
import ProjectStore from "./Project/ProjectStore";
import SessionStore from "./Session/SessionStore";

const stores = {
    PaymentStore: new PaymentStore(),
    DesignationStore: new DesignationStore(),
    UserStore: new UserStore(),
    ProjectStore: new ProjectStore(),
    SessionStore: new SessionStore()
};

export default stores;