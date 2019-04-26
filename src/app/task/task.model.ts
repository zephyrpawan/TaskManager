export class Task {
  public id: string;
  public parentId: string;
  public taskName: string;
  public startDate: string;
  public endDate: string;
  public priority: number;

  constructor(id: string, parentId: string, taskName: string, startDate: string, endDate: string, priority: number) {
    this.id = id;
    this.parentId = parentId;
    this.taskName = taskName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
  }
}
