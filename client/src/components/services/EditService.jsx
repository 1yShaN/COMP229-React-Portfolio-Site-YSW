import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { update, readOne } from "../../datasource/api-services";
import ServiceForm from "./ServiceForm";

const Editservice = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setservice] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        readOne(id).then(res => {
            if (res && res.success) {
                setservice(res.data);
            }
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setservice(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        update(service, id).then(res => {
            if (res && res.success) {
                navigate("/services/list");
            } else {
                alert(res?.message || "Update failed");
            }
        });
    };

    return (
        <>
            <h1>Edit service</h1>
            <ServiceForm
                service={service}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default Editservice;