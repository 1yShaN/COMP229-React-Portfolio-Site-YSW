import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { update, readOne } from "../../datasource/api-projects";
import ProjectForm from "./ProjectForm";
import ProjectModel from "../../datasource/projectModel";

const EditProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(new ProjectModel());
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        readOne(id)
            .then((res) => {
                if (res.success) {
                    setProject(new ProjectModel(
                        res.data.id,
                        res.data.title,
                        res.data.completion,
                        res.data.description,
                    ))
                } else {
                    setErrorMsg(res.message);
                }
            })
            .catch((err) => {
                setErrorMsg(err.message);
                console.log(err);
            })
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProject((formData) => ({ ...formData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting project: " + project);

        update(project, id)
            .then((res) => {
                if (res.success) {
                    alert(res.message);
                    navigate("/project/list");
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
                    <h1>Edit a Project</h1>
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

export default EditProject;