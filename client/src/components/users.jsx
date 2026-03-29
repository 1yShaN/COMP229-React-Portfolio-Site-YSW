import React, { useState, useEffect } from "react";
import axios from "axios";

export default function User() {

    // Initial users (always keep them)
    const initialUsers = [
        { name: "Jennifer Wang", email: "jennifer@email.com", role: "Admin" }
        // { name: "John Doe", email: "john@email.com", role: "User" }
    ];

    const [backendUsers, setBackendUsers] = useState([]);
    const [formUser, setFormUser] = useState({ name: "", email: "", role: "" });
    const [editId, setEditId] = useState(null);

    const API_URL = "https://jenix-expressapp.onrender.com/api/users";

    // Fetch backend users from MongoDB
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            const users = response.data.data || [];
            setBackendUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            setBackendUsers([]);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormUser({ ...formUser, [e.target.name]: e.target.value });
    };

    // Add or update backend user
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, formUser);
            } else {
                await axios.post(API_URL, formUser);
            }
            setFormUser({ name: "", email: "", role: "" });
            setEditId(null);
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    // Edit backend user
    const handleEdit = (user) => {
        setFormUser({ name: user.name, email: user.email, role: user.role });
        setEditId(user.id); // Only backend users have _id
    };

    // Delete backend user
    const handleDelete = async (id) => {
        if (!id) {
            alert("Cannot delete default user");
            return;
        }
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Merge initial + backend users
    const displayedUsers = [...initialUsers, ...backendUsers];

    return (
        <>
            <h2>Users</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="project-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formUser.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formUser.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role (Admin/User)"
                    value={formUser.role}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editId ? "Update" : "Add"} User</button>
            </form>

            {/* USERS LIST */}
            <div className="userBox">
                {displayedUsers.map((user, index) => (
                    <div key={user.id || index} className="userCard">

                        <h3>{user.name}</h3>
                        <p>{user.email}</p>

                        <span className="userRole">{user.role}</span>

                        {user.id && (
                            <div className="userActions">
                                <button onClick={() => handleEdit(user)}>Edit</button>

                                {user.role !== "Admin" && (
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                )}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </>
    );
}