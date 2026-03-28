import { useNavigate } from "react-router-dom";

const ServiceForm = ({ service, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="service-form">

            {/* TITLE */}
            <input
                name="title"
                placeholder="Enter service title"
                value={service.title || ""}
                onChange={handleChange}
                required
            />

            {/* DESCRIPTION */}
            <textarea
                name="description"
                placeholder="Enter service description"
                value={service.description || ""}
                onChange={handleChange}
                required
            />

            {/* BUTTONS */}
            <div className="service-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </form>
    );
};

export default ServiceForm;