import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-services";
import ServiceForm from "./ServiceForm";

const AddService = () => {
    const navigate = useNavigate();

    const [Service, setService] = useState({
        title: "",
        description: ""
    });

    // HANDLE INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // SUBMIT --> SAVE TO MONGODB
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await create(Service);

        if (res && res.success) {
            alert("Service added successfully!");

            // redirect to list --> will auto reload data
            navigate("/Services/list");
        } else {
            alert(res?.message || "Failed to add Service");
        }
    };

    return (
        <div className="page">
            <h2 className="ListTitle">Add Service</h2>

            <ServiceForm
                service={Service}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddService;