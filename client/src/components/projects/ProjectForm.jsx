import { useNavigate } from "react-router-dom";

const ProjectForm = ({ project, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="project-form">
            
            {/* TITLE */}
            <input
                name="title"
                placeholder="Enter project title"
                value={project.title || ""}
                onChange={handleChange}
                required
            />

            {/* COMPLETION DATE */}
            <input
                name="completion"
                type="date"
                value={
                    project.completion
                        ? new Date(project.completion).toISOString().split("T")[0]
                        : ""
                }
                onChange={handleChange}
            />

            {/* DESCRIPTION */}
            <textarea
                name="description"
                placeholder="Enter project description"
                value={project.description || ""}
                onChange={handleChange}
                required
            />

            {/* BUTTONS */}
            <div className="form-buttons">
                <button type="submit">Save</button>

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;