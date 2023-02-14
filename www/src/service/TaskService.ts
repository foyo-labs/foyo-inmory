import { Project, Task } from "@/types/Types";

import moment from 'moment'
import { find } from 'lodash'

export const createTasksAction = (project: Project) => {
    var tasks: Task[] = []
    const start = moment(project.started_at)
    const start_seq  = 1
    var dateRange = Number(project.duration)
    var doing_date = ""
    const period_day_num = Number(project.period_day_num)
    const total = Number(project.total)
    var name = ""
    if (project.mode == 1){
        doing_date = "/　　　/"
    }else {
        dateRange = total * (1 / period_day_num)
    }

    var l = 0

    for(var i = start_seq; i <= dateRange; i++){
        name = ""
        if( project.mode == 2){
            doing_date = start.add(i-1, 'days').format("YY/MM/DD")
            for( var j = 0; j < period_day_num; j++){
                name += project.prefix + "" + (l + 1)
                if(j < period_day_num -1){
                    name += " ~ "
                }
                l ++
            }
            
        }
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
            name: name,
            created_at: doing_date,
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
