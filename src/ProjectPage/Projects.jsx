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
          <SpotlightCardProject
            badgeText="FEATURED THESIS PROJECT (TCC)"
            title="copycat-merge-tcc"
            description="Research, development, and optimization of machine learning model merging techniques. Features automated Python scripts designed to synthesize and evaluate neural weights, exploring advanced methodologies in Deep Learning."
            tags={["Artificial Intelligence", "Machine Learning", "Python", "Neural Networks"]}
            link="https://github.com/PrenholatoChris/copycat-merge-tcc"
          />
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
