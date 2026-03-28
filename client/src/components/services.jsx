import React, { useState, useEffect } from 'react';
import axios from "axios";

import service01 from '../assets/service01.jpg';
import service02 from '../assets/service02.jpg';
import service03 from '../assets/service03.jpg';

export default function Services() {

    const API_URL = "http://localhost:3000/api/services";

    // DEFAULT SERVICES (NO EDIT / DELETE)
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

    const [backendServices, setBackendServices] = useState([]);
    const [formService, setFormService] = useState({
        title: "",
        description: ""
    });
    const [editId, setEditId] = useState(null);

    // FETCH
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get(API_URL);
            setBackendServices(res.data.data || []);
        } catch (err) {
            console.log("Using default services only");
        }
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        setFormService({
            ...formService,
            [e.target.name]: e.target.value
        });
    };

    // ADD / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                // UPDATE
                await axios.put(`${API_URL}/${editId}`, formService);
            } else {
                // CREATE
                await axios.post(API_URL, formService);
            }

            setFormService({
                title: "",
                description: ""
            });

            setEditId(null);
            fetchServices();

        } catch (err) {
            console.error("Error saving service:", err);
        }
    };

    // EDIT
    const handleEdit = (serv) => {
        setFormService({
            title: serv.title || "",
            description: serv.description || ""
        });

        setEditId(serv.id); // ✅ FIXED (use id)
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchServices();
        } catch (err) {
            console.error("Error deleting service:", err);
        }
    };

    const allServices = [...initialServices, ...backendServices];

    return (
        <>
            <h2>My Services</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="service-form">

                <input
                    type="text"
                    name="title"
                    placeholder="Service Title"
                    value={formService.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Service Description"
                    value={formService.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editId ? "Update" : "Add"} Service
                </button>

            </form>

            {/* SERVICES LIST */}
            <div className="servicesBox">
                {allServices.map((serv, index) => (
                    <div key={serv.id || index} className="serviceCard">

                        {serv.imagePath && (
                            <img
                                src={serv.imagePath}
                                alt="service"
                                className="serviceImage"
                            />
                        )}

                        <h3>{serv.title}</h3>
                        <p>{serv.description}</p>

                        {/* ONLY BACKEND SERVICES HAVE BUTTONS */}
                        {backendServices.includes(serv) && (
                            <div className="serviceActions">
                                <button onClick={() => handleEdit(serv)}>Edit</button>
                                <button onClick={() => handleDelete(serv.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}