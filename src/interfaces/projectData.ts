interface ProjectData {
  title: string;
  description: string;
}

interface ProjectDetailsInterface extends ProjectData {
  id:number,
  created_at: Date
}

export { ProjectData, ProjectDetailsInterface };
