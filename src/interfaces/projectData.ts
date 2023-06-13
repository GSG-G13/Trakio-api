interface ProjectData {
  title: string;
  description: string;
}
interface projectDataDetails {
  id:number,
  title: string;
  description: string;
  created_at: Date;
}

interface ProjectDetailsInterface extends ProjectData {
  id:number,
  created_at: Date
}

export { ProjectData, ProjectDetailsInterface, projectDataDetails };
