import './Projects.css';
import ImageBG from '../assets/ProjectsBG.png';
import ProjectComponent from '../Components/ProjectComponent';
import SpotlightCardProject from '../Components/SpotlightCardProject';
import { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('https://api.github.com/users/prenholatochris/repos');
        const data = await response.json();
        const filteredProjects = data.filter(githubProject =>
          githubProject.description && githubProject.description.includes('<PORTFOLIO>')
        ).map(githubProject => ({
          ...githubProject,
          description: githubProject.description.replace('<PORTFOLIO>', '')
        }));

        setProjects(filteredProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div id="Projects" className="Projects bg-image">
      <div className="container">
        <h1>PROJECTS</h1>

        <div className="container">
          {projects.map(project => (
            <SpotlightCardProject
              key={project.id}
              title={project.name}
              description={project.description}
              link={project.html_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
