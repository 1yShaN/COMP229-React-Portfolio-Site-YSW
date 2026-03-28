

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { update, readOne } from "../../datasource/api-projects";
import ProjectForm from "./ProjectForm";

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: "",
        completion: "",
        description: ""
    });

    useEffect(() => {
        readOne(id).then(res => {
            if (res && res.success) {
                setProject(res.data);
            }
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        update(project, id).then(res => {
            if (res && res.success) {
                navigate("/projects/list");
            } else {
                alert(res?.message || "Update failed");
            }
        });
    };

    return (
        <>
            <h1>Edit Project</h1>
            <ProjectForm
                project={project}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default EditProject;