import React, { useState, useEffect } from 'react';
import axios from "axios";

import service01 from '../assets/service01.jpg';
import service02 from '../assets/service02.jpg';
import service03 from '../assets/service03.jpg';

export default function Services() {

    const API_URL = "http://localhost:3000/api/services";

    // Initial data (NO edit/delete)
    const initialServices = [
        {
            imagePath: service01,
            title: "UI/UX Design",
            description: "Creating visually appealing and intuitive interfaces..."
        },
        {
            imagePath: service02,
            title: "Web Development",
            description: "Developing responsive, high-performing websites..."
        },
        {
            imagePath: service03,
            title: "Software Development",
            description: "Writing clean, maintainable code..."
        }
    ];

    const [backendservices, setBackendservices] = useState([]);
    const [formservice, setFormservice] = useState({
        title: "",
        description: ""
    });
    const [editId, setEditId] = useState(null);

    // FETCH
    useEffect(() => {
        fetchservices();
    }, []);

    const fetchservices = async () => {
        try {
            const res = await axios.get(API_URL);
            setBackendservices(res.data.data || []);
        } catch (err) {
            console.log("Using default services only");
            setBackendservices([]);
        }
    };

    // INPUT
    const handleChange = (e) => {
        setFormservice({
            ...formservice,
            [e.target.name]: e.target.value
        });
    };

    // ADD / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId !== null && editId !== undefined) {
                // UPDATE
                await axios.put(`${API_URL}/${editId}`, formservice);
            } else {
                // CREATE
                await axios.post(API_URL, formservice);
            }

            await fetchservices();

            setFormservice({ title: "", description: "" });
            setEditId(null);

        } catch (err) {
            console.error("Error saving service:", err);
        }
    };

    // EDIT
    const handleEdit = (serv) => {
        if (!serv._id) return;

        setFormservice({
            title: serv.title || "",
            description: serv.description || ""
        });

        setEditId(serv._id);
    };

    // DELETE
    const handleDelete = async (serv) => {
        if (!serv._id) return;

        try {
            await axios.delete(`${API_URL}/${serv._id}`);
            fetchservices();
        } catch (err) {
            console.error("Error deleting service:", err);
        }
    };

    const allservices = [...initialServices, ...backendservices];

    return (
        <>
            <h2>My Services</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="service-form">

                <input
                    type="text"
                    name="title"
                    placeholder="Service Title"
                    value={formservice.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Service Description"
                    value={formservice.description}
                    onChange={handleChange}
                    required
                />

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit">
                        {editId ? "Update" : "Add"} Service
                    </button>

                    {editId && (
                        <button type="button" onClick={() => {
                            setFormservice({ title: "", description: "" });
                            setEditId(null);
                        }}>
                            Cancel
                        </button>
                    )}
                </div>

            </form>

            {/* LIST */}
            <div className="servicesBox">
                {allservices.map((serv, index) => (
                    <div key={serv._id || index} className="serviceCard">

                        {serv.imagePath && (
                            <img
                                src={serv.imagePath}
                                alt="service"
                                className="serviceImage"
                            />
                        )}

                        <h3>{serv.title}</h3>
                        <p>{serv.description}</p>

                        {/* ✅ ONLY backend items can edit/delete */}
                        {serv._id && (
                            <div className="serviceActions">
                                <button onClick={() => handleEdit(serv)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(serv)}>
                                    Delete
                                </button>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </>
    );
}