export class Project{
    constructor(public projectId: number, public project: string, public priority: number, 
        public stStartDate: Date, public stEndDate: Date, public userId: number, public taskCount: number,
        public completedTaskCount: number){

    }
}