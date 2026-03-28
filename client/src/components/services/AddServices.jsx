import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-projects";
import ProjectForm from "./ProjectForm";
import ProjectModel from "../../datasource/projectModel";

const AddProject = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState(new ProjectModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProject((formData) => ({ ...formData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting project: " + project);

        create(project)
            .then((res) => {
                if (res.success) {
                    alert(res.message + " Id:" + res.data.id);
                    navigate("/projects");
                }
                else {
                    setErrorMsg(res.message);
                }
            })
            .catch((err) => {
                setErrorMsg(err.message);
                console.log(err);
            })
    }

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add a Project</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <ProjectForm
                        project={project}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddProject;