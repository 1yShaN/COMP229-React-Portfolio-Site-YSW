import React, { useState } from 'react';
import service01 from '../assets/service01.jpg';
import service02 from '../assets/service02.jpg';
import service03 from '../assets/service03.jpg';

export default function Services() {

    // Initial data
    const initialServices = [
        {
            imagePath: service01,
            title: "UI/UX Design",
            text: "Creating visually appealing and intuitive interfaces..."
        },
        {
            imagePath: service02,
            title: "Web Development",
            text: "Developing responsive, high-performing websites..."
        },
        {
            imagePath: service03,
            title: "Software Development",
            text: "Writing clean, maintainable code..."
        }
    ];

    // State
    const [services, setServices] = useState(initialServices);
    const [formService, setFormService] = useState({
        imagePath: '',
        title: '',
        text: ''
    });
    const [editIndex, setEditIndex] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imagePath" && files && files[0]) {
            setFormService({
                ...formService,
                imagePath: URL.createObjectURL(files[0])
            });
        } else {
            setFormService({
                ...formService,
                [name]: value
            });
        }
    };

    // Add or Update
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            const updated = [...services];
            updated[editIndex] = formService;
            setServices(updated);
            setEditIndex(null);
        } else {
            setServices([...services, formService]);
        }

        setFormService({ imagePath: '', title: '', text: '' });
    };

    // Edit
    const handleEdit = (index) => {
        setFormService(services[index]);
        setEditIndex(index);
    };

    // Delete
    const handleDelete = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };

    return (
        <>
            <h2>My Services</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="project-form">
                <input type="file" name="imagePath" onChange={handleChange} />

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
                    name="text"
                    placeholder="Service Description"
                    value={formService.text}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editIndex !== null ? 'Update' : 'Add'} Service
                </button>
            </form>

            {/* LIST */}
            <div className="servicesBox">
                {services.map((service, index) => (
                    <div key={index} className="projectCard">
                        <img
                            src={service.imagePath}
                            alt={service.title}
                            className="projectImage"
                        />
                        <h3>{service.title}</h3>
                        <p>{service.text}</p>

                        <div className="projectActions">
                            <button onClick={() => handleEdit(index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}