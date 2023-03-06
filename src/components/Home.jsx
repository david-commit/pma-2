import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import img from '../assets/Pair_programming.png';
import img2 from '../assets/hero-drone.webp';
import { PROJECTS } from '../assets/data';
import { useHistory } from 'react-router-dom';

const Home = ({ user, setUser, projects, setProjects }) => {
  const startBtn = user ? '#projects' : '/login';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:9292/projects`)
      .then((r) => r.json())
      .then((d) => setProjects(d));
  }, []);

  const handleDelete = (id, e) => {
    e.preventDefault();
    console.log(id);
    fetch(`http://localhost:9292/projects/${id}`, {
      method: 'DELETE',
      headers: { accept: 'application-json' },
    });
    const filteredProjects = projects.filter((project) => project.id != id);
    setProjects(filteredProjects);
  };

  // ========= CREATE
  
  const handleAddProject = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    
    setTitle('');
    setDescription('');
    history.push('/projects');
  }

  return (
    <>
      <div className='home-container' id='home'>
        <section className='home-text'>
          <h1>Let’s build from here🚀</h1>
          <p>
            Harnessed for productivity. Designed for collaboration. Celebrated
            for built-in security. Welcome to the platform developers love.
            Accelerate high-quality software development.
          </p>
          <br />
          <NavLink to={startBtn} >
            <button>Start Building</button>
          </NavLink>
        </section>
      </div>
          <img src={img2} alt="" id='floating-drone'/>
      {/* ================ */}
      <div className='projects-container' id='projects'>
        <h1>Your projects</h1>
        <div className='all-projects-container'>
          {projects ? (
          projects.map((project) => {
            return (
              <div
              className='project'
                key={project.id}
                // to={`/project/${project.id}`}
              >
                <section>
                  <h2>{project.title}</h2>
                  <details>
                    <summary>Description</summary>
                    <p>{project.description}</p>
                  </details>
                </section>
                <div className='project-icons'>
                  <i class='fa-solid fa-pen-to-square'></i>
                  <i
                    class='fa-solid fa-trash'
                    onClick={(e) => handleDelete(project.id, e)}
                  ></i>
                </div>
              </div>
            );
          })) : (
            <h2>You dont have any projects</h2>
          )}
        </div>
      </div>
      {/* ============== */}
      <div className='add-project-container' id='add-project'>
        <form onSubmit={handleAddProject} className='project-form'>
          <h1>Start a new project</h1>
          <label>Project title</label>
          <input
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Project description</label>
          <textarea
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <button type='submit'>Create Project</button>
        </form>
        <section className='add-project-img'>
          <img src={img2} alt='Develop app' />
        </section>
      </div>
    </>
  );
};

export default Home;
