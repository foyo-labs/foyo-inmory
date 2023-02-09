export type ISO8601Time = string;
export type ReviewDayType = number;

export type TasksType = Task[] | null;

export type Task = {
    id: number;
    name: string;
    review_at : ReviewDayType;
    created_at: ISO8601Time;
    reviews: TasksType
};


export type Project = {
    name: string;
    started_at: string;
    period_day_num: number;
    total: number;
}

