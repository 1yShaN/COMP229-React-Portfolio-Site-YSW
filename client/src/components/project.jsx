import React, { useState, useEffect } from 'react';
import axios from "axios";
import photo01 from '../assets/project01.png';
import photo02 from '../assets/project02.png';
import photo03 from '../assets/project03.png';

export default function Project() {

  const API_URL = "http://localhost:3000/api/projects";

  // Initial projects
  const initialProjects = [
    {
      imagePath: photo01,
      title: "Crystal Village Resort Spa",
      text: 'I independently designed and developed the Crystal Village Resort Spa service website...'
    },
    {
      imagePath: photo02,
      title: 'BMR Calculator',
      text: 'I designed and developed a BMR (Basal Metabolic Rate) Calculator web application...'
    },
    {
      imagePath: photo03,
      title: 'Interactive Slideshow',
      text: 'I developed an interactive image slideshow that allows users to navigate through images...'
    }
  ];

  // State
  const [projects, setProjects] = useState(initialProjects);
  const [formProject, setFormProject] = useState({ imagePath: '', title: '', text: '' });
  const [editIndex, setEditIndex] = useState(null);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.data.length > 0) {
        setProjects(res.data.data); // use DB data
      }
    } catch (err) {
      console.log("Backend not connected, using default projects");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagePath' && files && files[0]) {
      setFormProject({ ...formProject, imagePath: URL.createObjectURL(files[0]) });
    } else {
      setFormProject({ ...formProject, [name]: value });
    }
  };

  // ✅ ADD / UPDATE (CONNECTED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editIndex !== null && projects[editIndex]._id) {
        // UPDATE
        await axios.put(`${API_URL}/${projects[editIndex]._id}`, formProject);
      } else {
        // CREATE
        await axios.post(API_URL, formProject);
      }

      fetchProjects(); // refresh from DB

    } catch (err) {
      console.error(err);
    }

    setFormProject({ imagePath: '', title: '', text: '' });
    setEditIndex(null);
  };

  // Edit project
  const handleEdit = (index) => {
    setFormProject({ ...projects[index] });
    setEditIndex(index);
  };

  // ✅ DELETE (CONNECTED)
  const handleDelete = async (index) => {
    try {
      if (projects[index]._id) {
        await axios.delete(`${API_URL}/${projects[index]._id}`);
        fetchProjects();
      } else {
        // fallback for default items
        setProjects(prev => prev.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>My Projects</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="project-form">
        <input type="file" name="imagePath" onChange={handleChange} />

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formProject.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="text"
          placeholder="Project Description"
          value={formProject.text}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editIndex !== null ? 'Update' : 'Add'} Project
        </button>
      </form>

      {/* Project List */}
      <div className="projectsBox">
        {projects.map((proj, index) => (
          <div key={proj._id || index} className="projectCard">
            <img src={proj.imagePath} alt="Project" className="projectImage" />
            <h3>{proj.title}</h3>
            <p>{proj.text}</p>

            <div className="projectActions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}