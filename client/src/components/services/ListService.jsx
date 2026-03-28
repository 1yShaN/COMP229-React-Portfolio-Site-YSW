
import { useEffect, useState } from "react";
import { list, create, update, remove } from "../../datasource/api-services";
import { data } from "../services";
import { Link } from "react-router-dom";

const Listservice = () => {
    const [services, setservices] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        description: ""
    });

    const loadservices = async () => {
        const res = await list();

        if (res && res.success) {
            if (res.data.length === 0) {
                for (let item of data) {
                    await create({
                        title:
                            typeof item.title === "string"
                                ? item.title
                                : "Imported service",
                        description: item.text
                    });
                }

                const newRes = await list();
                setservices(newRes.data);
            } else {
                setservices(res.data);
            }
        }
    };

    useEffect(() => {
        loadservices();
    }, []);

    const handleEdit = (p) => {
        setEditId(p.id);
        setEditData({
            title: p.title,
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
            loadservices();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this service?")) {
            const res = await remove(id);
            if (res && res.success) loadservices();
        }
    };

    return (
        <div className="page">
            <h2 className="ListTitle">Service List</h2>

            <div className="table-actions">
                <Link to="/services/add">
                    <button className="add-btn">Add Service</button>
                </Link>
            </div>

            <table className="serviceTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map(p => (
                        <tr key={p.id}>
                            <td>
                                {editId === p.id ? (
                                    <input name="title" value={editData.title} onChange={handleChange} />
                                ) : p.title}
                            </td>

                            <td>
                                {editId === p.id ? (
                                    <textarea name="description" value={editData.description} onChange={handleChange} />
                                ) : p.description}
                            </td>

                            <td>
                                {editId === p.id ? (
                                    <button onClick={() => handleSave(p.id)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(p)}>Edit</button>
                                )}

                                <button onClick={() => handleDelete(p.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listservice;