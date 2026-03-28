import React, { useState, useEffect } from "react";
import axios from "axios";

export default function reference() {

    // Initial references (always keep them)
    const initialreferences = [
        { name: "Prof. Mahsa Sadat Emami Taba", email: "memamita@my.centennialcollege.ca", role: "Professor" },
        { name: "Prof. Vijayalakshmi Tiruchengode Angamuthu", email: "vtiruche@my.centennialcollege.ca", role: "Professor" },
        { name: "Prof. Yuri Vanegas", email: "yvanega1@my.centennialcollege.ca", role: "Professor" }
    ];

    const [backendreferences, setBackendreferences] = useState([]);
    const [formreference, setFormreference] = useState({ name: "", email: "", role: "" });
    const [editId, setEditId] = useState(null);

    const API_URL = "http://localhost:3000/api/references";

    // Fetch backend references from MongoDB
    useEffect(() => {
        fetchreferences();
    }, []);

    const fetchreferences = async () => {
        try {
            const response = await axios.get(API_URL);
            const references = response.data.data || [];
            setBackendreferences(references);
        } catch (error) {
            console.error("Error fetching references:", error);
            setBackendreferences([]);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormreference({ ...formreference, [e.target.name]: e.target.value });
    };

    // Add or update backend reference
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, formreference);
            } else {
                await axios.post(API_URL, formreference);
            }
            setFormreference({ name: "", email: "", role: "" });
            setEditId(null);
            fetchreferences();
        } catch (error) {
            console.error("Error saving reference:", error);
        }
    };

    // Edit backend reference
    const handleEdit = (reference) => {
        setFormreference({ name: reference.name, email: reference.email, role: reference.role });
        setEditId(reference.id); // Only backend references have _id
    };

    // Delete backend reference
    const handleDelete = async (id) => {
        if (!id) {
            alert("Cannot delete default reference");
            return;
        }
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchreferences();
        } catch (error) {
            console.error("Error deleting reference:", error);
        }
    };

    // Merge initial + backend references
    const displayedreferences = [...initialreferences, ...backendreferences];

    return (
        <>
            <h2>References</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="project-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formreference.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formreference.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formreference.role}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editId ? "Update" : "Add"} reference</button>
            </form>

            {/* referenceS LIST */}
            <div className="referenceBox">
                {displayedreferences.map((reference, index) => (
                    <div key={reference.id || index} className="referenceCard">

                        <h3>{reference.name}</h3>
                        <p>{reference.email}</p>
                        <p className="referenceRole">{reference.role}</p>

                        {backendreferences.includes(reference) && (
                            <div className="referenceActions">
                                <button onClick={() => handleEdit(reference)}>Edit</button>

                                {reference.role !== "Admin" && (
                                    <button onClick={() => handleDelete(reference.id)}>Delete</button>
                                )}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </>
    );
}