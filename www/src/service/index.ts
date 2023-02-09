import UsersServiceProxy from "./tasks-service-proxy";
import { Project } from '../types/Types'

const getTasksService = (project: Project) => {
    return UsersServiceProxy(project);
}



export { }