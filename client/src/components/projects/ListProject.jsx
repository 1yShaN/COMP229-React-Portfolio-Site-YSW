
import { useEffect, useState } from "react";
import { list, create, update, remove } from "../../datasource/api-projects";
import { data } from "../project";
import { Link } from "react-router-dom";
import { isAdmin } from "../auth/auth-helper";

const ListProject = () => {
    const admin = isAdmin();
    const [projects, setProjects] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        completion: "",
        description: ""
    });

    const loadProjects = async () => {
        const res = await list();

        if (res && res.success) {
            if (res.data.length === 0 && admin) {
                for (let item of data) {
                    await create({
                        title:
                            typeof item.title === "string"
                                ? item.title
                                : "Imported Project",
                        completion: new Date(),
                        description: item.text
                    });
                }

                const newRes = await list();
                setProjects(newRes.data);
            } else {
                setProjects(res.data);
            }
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleEdit = (p) => {
        setEditId(p.id);
        setEditData({
            title: p.title,
            completion: p.completion?.split("T")[0] || "",
            description: p.description
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (id) => {
        const res = await update(editData, id);
        if (res && res.success) {
            setEditId(null);
            loadProjects();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this project?")) {
            const res = await remove(id);
            if (res && res.success) loadProjects();
        }
    };

    return (
        <div className="page">
            <h2 className="ListTitle">Project List</h2>

            {admin && (
                <div className="table-actions">
                    <Link to="/projects/add">
                        <button className="add-btn">Add Project</button>
                    </Link>
                </div>
            )}

            <table className="projectTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completion</th>
                        <th>Description</th>
                        <th>{admin ? "Actions" : "Access"}</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map(p => (
                        <tr key={p.id}>
                            <td>
                                {editId === p.id ? (
                                    <input name="title" value={editData.title} onChange={handleChange} />
                                ) : p.title}
                            </td>

                            <td>
                                {editId === p.id ? (
                                    <input type="date" name="completion" value={editData.completion} onChange={handleChange} />
                                ) : p.completion ? new Date(p.completion).toLocaleDateString() : ""}
                            </td>

                            <td>
                                {editId === p.id ? (
                                    <textarea name="description" value={editData.description} onChange={handleChange} />
                                ) : p.description}
                            </td>

                            <td>
                                {!admin ? (
                                    <span>Admin only</span>
                                ) : (
                                    <>
                                        {editId === p.id ? (
                                            <button onClick={() => handleSave(p.id)}>Save</button>
                                        ) : (
                                            <button onClick={() => handleEdit(p)}>Edit</button>
                                        )}

                                        <button onClick={() => handleDelete(p.id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProject;