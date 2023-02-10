import { Project, Task } from "@/types/Types";

import moment from 'moment'
import { find } from 'lodash'

export const createTasksAction = (project: Project) => {
    var tasks: Task[] = []
    if (project.started_at == '') return tasks
    const start = moment(project.started_at)
    // if( project.mode === 1){
    //     const duration = project.duration || 1
    // }
    const start_seq  = 1

    for(var i = start_seq; i<= 31; i++){
        const date = start.add(1, 'days')
        var _reviews: Map<number, number>  = new Map()
        const review_days = [1, 2, 4, 7, 15, 30, 90, 180]
        review_days.forEach( (d) => {
            const f = findReview(tasks, i, d)
            if (f){
                _reviews.set(d, f)
            }
        } )
        tasks.push({
            id: i,
            name: "",
            created_at: date.format("yyyy-MM-dd"),
            reviews: _reviews
        })
    }

    return tasks
}

function findReview(tasks: Task[], day: number, reviewDay: number) {
    const task = find(tasks, {"id": day - reviewDay})
    if(task){
        return task['id']
    }
    return undefined
}