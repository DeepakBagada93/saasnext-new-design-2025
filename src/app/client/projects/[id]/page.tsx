
import ProjectDetails from './project-details';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  return <ProjectDetails id={params.id} />;
}
