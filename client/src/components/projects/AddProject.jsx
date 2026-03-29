import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-projects";
import ProjectForm from "./ProjectForm";

const AddProject = () => {
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: "",
        completion: "",
        description: ""
    });

    // HANDLE INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // SUBMIT --> SAVE TO MONGODB
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await create(project);

        if (res && res.success) {
            alert("Project added successfully!");

            // redirect to list --> will auto reload data
            navigate("/projects/list");
        } else {
            alert(res?.message || "Failed to add project");
        }
    };

    return (
        <div className="page">
            <h2 className="ListTitle">Add Project</h2>

            <ProjectForm
                project={project}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddProject;