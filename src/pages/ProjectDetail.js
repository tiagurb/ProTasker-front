import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { deleteProject, getProject } from "../api";

function ProjectDetail() {
  const [project, setProject] = useState();
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleGetProjectDetail() {
      const response = await getProject(projectId);
      setProject(response.data);
    }

    handleGetProjectDetail();
  }, [projectId]);

  async function handleDeleteProject() {
    await deleteProject(projectId);
    navigate("/dashboard");
  }

  return project ? (
    <>
      {console.log(project.title)}
      <h3>{project.title}</h3>
      {project.tasks.map((task) => { 
          return (
            <div key={task._id}>
              <div><Link to={`/tasks/${task._id}`}>{task.title}</Link></div>
            </div>
          );
        })}
      <div>
        <button onClick={handleDeleteProject}>Delete Project</button>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default ProjectDetail;