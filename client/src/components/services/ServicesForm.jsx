import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ProjectForm = ({ project, handleChange, handleSubmit }) => {
    const navigate = useNavigate();
    
    return (
        <form onSubmit={handleSubmit} className="form">
            <input type="hidden" name="id" value={project.id || ""} />

            <div className="form-group">
                <label htmlFor="titleTextField">Title</label>
                <input
                    id="titleTextField"
                    name="title"
                    className="form-control"
                    placeholder="Enter the title of the project"
                    value={project.title || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="CompletionTextField">Completion</label>
                <input
                    id="CompletionTextField"
                    name="completion"
                    type="date"
                    className="form-control"
                    value={project.completion ? new Date(project.completion).toISOString().split('T')[0] : ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="descriptionTextField">Description</label>
                <textarea
                    id="descriptionTextField"
                    name="description"
                    className="form-control"
                    placeholder="Enter the description of the project"
                    value={project.description || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className="btn btn-primary" type="submit">
                <i className="fas fa-edit"></i> Submit
            </button>
            &nbsp; &nbsp;
            <button className="btn btn-warning" type="button" onClick={() => navigate(-1)} >
                <i className="fas fa-undo"></i>
                Cancel
            </button>
        </form>
    );
}

export default ProjectForm;