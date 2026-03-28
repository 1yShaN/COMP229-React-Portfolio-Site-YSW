import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reference() {

  const [References, setReferences] = useState([]);
  const [formReference, setFormReference] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:3000/api/references";

  // Fetch References from backend
  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await axios.get(API_URL);
      const backendReferences = response.data.data || [];
      setReferences(backendReferences); // ONLY backend data
    } catch (error) {
      console.error("Error fetching References:", error);
    }
  };

  const handleChange = (e) => {
    setFormReference({ ...formReference, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formReference);
      } else {
        await axios.post(API_URL, formReference);
      }

      setFormReference({ name: "", email: "", role: "" });
      setEditId(null);
      fetchReferences();
    } catch (error) {
      console.error("Error saving Reference:", error);
    }
  };

  const handleEdit = (ref) => {
    setFormReference({ name: ref.name, email: ref.email, role: ref.role });
    setEditId(ref._id); // Must exist
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchReferences();
    } catch (error) {
      console.error("Error deleting Reference:", error);
    }
  };

  return (
    <>
      <h2>References</h2>

      <form onSubmit={handleSubmit} className="project-form">
        <input type="text" name="name" placeholder="Full Name" value={formReference.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formReference.email} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" value={formReference.role} onChange={handleChange} required />
        <button type="submit">{editId ? "Update" : "Add"} Reference</button>
      </form>

      <div className="servicesBox">
        {References.map((ref) => (
          <div key={ref._id} className="projectCard">
            <h3>{ref.name}</h3>
            <p>{ref.email}</p>
            <p><strong>{ref.role}</strong></p>
            <div className="projectActions">
              <button onClick={() => handleEdit(ref)}>Edit</button>
              <button onClick={() => handleDelete(ref._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}