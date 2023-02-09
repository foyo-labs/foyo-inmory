import { TasksType, Project } from '../types/Types'

const UsersServiceProxy = (project: Project) => {
    return {
        generate_tasks: async (): Promise<TasksType> => {
            

            return null
        }
    }
}

export default UsersServiceProxy;