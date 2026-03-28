import React, { useState, useEffect } from 'react';
import axios from "axios";
import photo01 from '../assets/project01.png';
import photo02 from '../assets/project02.png';
import photo03 from '../assets/project03.png';

// Fix date format
function formatDate(value) {
     if (!value) return "";
     const date = new Date(value);
     if (isNaN(date)) return "";
     return date.toISOString().split("T")[0];
}

export default function Project() {

     const API_URL = "http://localhost:3000/api/projects";

     // ✅ DEFAULT PROJECTS (NO EDIT / DELETE)
     const initialProjects = [
          {
               imagePath: photo01,
               title: "Crystal Village Resort Spa",
               completion: "2025-08-31",
               description: "I independently designed and developed the Crystal Village Resort Spa website."
          },
          {
               imagePath: photo02,
               title: "BMR Calculator",
               completion: "2025-11-30",
               description: "A web app to calculate daily calorie requirements."
          },
          {
               imagePath: photo03,
               title: "Interactive Slideshow",
               completion: "2025-12-07",
               description: "An image slideshow with controls and auto-play."
          }
     ];

     const [backendProjects, setBackendProjects] = useState([]);
     const [formProject, setFormProject] = useState({
          title: "",
          completion: "",
          description: ""
     });
     const [editId, setEditId] = useState(null);

     // FETCH
     useEffect(() => {
          fetchProjects();
     }, []);

     const fetchProjects = async () => {
          try {
               const res = await axios.get(API_URL);
               setBackendProjects(res.data.data || []);
          } catch (err) {
               console.log("Using default projects only");
          }
     };

     // INPUT CHANGE
     const handleChange = (e) => {
          setFormProject({
               ...formProject,
               [e.target.name]: e.target.value
          });
     };

     // ADD / UPDATE
     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               if (editId) {
                    // UPDATE
                    await axios.put(`${API_URL}/${editId}`, formProject);
               } else {
                    // CREATE
                    await axios.post(API_URL, formProject);
               }

               setFormProject({
                    title: "",
                    completion: "",
                    description: ""
               });

               setEditId(null);
               fetchProjects();

          } catch (err) {
               console.error("Error saving project:", err);
          }
     };

     // EDIT
     const handleEdit = (proj) => {
          setFormProject({
               title: proj.title,
               completion: proj.completion
                ? new Date(proj.completion).toISOString().split("T")[0]
                : "",
               description: proj.description
          });

          setEditId(proj._id);
     };

     // DELETE
     const handleDelete = async (id) => {
          try {
               await axios.delete(`${API_URL}/${id}`);
               fetchProjects();
          } catch (err) {
               console.error("Error deleting project:", err);
          }
     };

     const allProjects = [...initialProjects, ...backendProjects];

     return (
          <>
               <h2>My Projects</h2>

               {/* FORM */}
               <form onSubmit={handleSubmit} className="project-form">

                    <input
                         type="text"
                         name="title"
                         placeholder="Project Title"
                         value={formProject.title}
                         onChange={handleChange}
                         required
                    />

                    {/* ✅ DATE PICKER */}
                    <input
                         type="date"
                         name="completion"
                         value={formProject.completion}
                         onChange={handleChange}
                         required
                    />

                    <input
                         type="text"
                         name="description"
                         placeholder="Project Description"
                         value={formProject.description}
                         onChange={handleChange}
                         required
                    />

                    <button type="submit">
                         {editId ? "Update" : "Add"} Project
                    </button>

               </form>

               {/* PROJECT LIST */}
               <div className="projectsBox">
                    {allProjects.map((proj, index) => (
                         <div key={proj._id || index} className="projectCard">

                              {/* DEFAULT IMAGES ONLY */}
                              {proj.imagePath && (
                                   <img
                                        src={proj.imagePath}
                                        alt="Project"
                                        className="projectImage"
                                   />
                              )}

                              <h3>{proj.title}</h3>

                              <p>
                                   <strong>Completion:</strong>{" "}
                                   {proj.completion
                                        ? new Date(proj.completion).toLocaleDateString()
                                        : "N/A"}
                              </p>

                              <p>{proj.description}</p>

                              {/* ✅ ONLY BACKEND PROJECTS HAVE BUTTONS */}
                              {backendProjects.includes(proj) && (
                                   <div className="projectActions">
                                        <button onClick={() => handleEdit(proj)}>Edit</button>
                                        <button onClick={() => handleDelete(proj._id)}>Delete</button>
                                   </div>
                              )}
                         </div>
                    ))}
               </div>
          </>
     );
}