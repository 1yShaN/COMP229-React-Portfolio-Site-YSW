import React, { useState, useEffect } from "react";
import axios from "axios";

export default function User() {

  // Initial users
  const initialUsers = [
    { name: "Jennifer Wang", email: "jennifer@email.com", role: "Admin" },
    { name: "John Doe", email: "john@email.com", role: "User" }
  ];

  const [users, setUsers] = useState(initialUsers);

    const [formUser, setFormUser] = useState({
        name: "",
        email: "",
        role: ""
    });

  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:3000/api/users";

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Users:", response.data);

      const backendUsers = response.data.data || [];

      // ✅ Merge initial + backend users
      setUsers([...initialUsers, ...backendUsers]);

    } catch (error) {
      console.error("Error fetching users:", error);
      // Keep initialUsers if API fails
      setUsers(initialUsers);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    });
  };

  // Add / Update
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

  // Edit
  const handleEdit = (user) => {
    setFormUser(user);
    setEditId(user._id);
  };

  // Delete
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

        <button type="submit">
          {editId ? "Update" : "Add"} User
        </button>
      </form>

      {/* USER LIST */}
      <div className="servicesBox">
        {users.map((user, index) => (
          <div key={user._id || index} className="projectCard">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p><strong>{user.role}</strong></p>

            <div className="projectActions">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}