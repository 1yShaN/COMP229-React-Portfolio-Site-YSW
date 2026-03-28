import { useState, useEffect } from "react";
import { update, getOne } from "../../datasource/api-projects";
import { useNavigate, useParams } from "react-router-dom";
import ProjectModel from "../../datasource/projectModel";
import FormProject from "./FormProject";

function EditProject() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(new ProjectModel());
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        getOne(id)
            .then((res) => {
                if (res.success) {
                    setProject(new ProjectModel(
                        res.data.id,
                        res.data.title,
                        res.data.completion,
                        res.data.description));
                }
                else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            })
    }, [id, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProject((formData) => ({ ...formData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting:" + project);

        update(project, id)
            .then((res) => {
                if (res.success) {
                    alert(res.message);
                    navigate("/projects/list");
                }
                else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            })
    }

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Edit a Project Item</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <FormProject
                        project={project}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditProject;