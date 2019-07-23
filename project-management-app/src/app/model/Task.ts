export class Task{
    constructor(public taskId: number, public task: string, public priority: number, 
        public parentId: number, public stStartDate: Date, public stEndDate: Date,
        public taskStatus: number, public userId: number, public projectId: number){

    }
}