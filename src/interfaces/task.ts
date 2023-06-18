interface TaskInterface{
  id:number,
  title:string,
  description:string,
  projectId: number,
  userId: number,
  sectionId: number,
  dueDate: Date,
  priorityId:number,
}

export default TaskInterface;
