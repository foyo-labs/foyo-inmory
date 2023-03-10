export type ISO8601Time = string;
export type ReviewDayType = number;



export type Task = {
    id: number;
    name: string;
    created_at: ISO8601Time;
    reviews: Map<number, number>
};


export type Project = {
    name: string;
    started_at: string;
    mode: number;
    duration: number | null;
    period_day_num: number;
    prefix: string | null;
    total: number;
}

