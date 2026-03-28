import React, { useState, useEffect } from "react";
import axios from "axios";
import MyLogo from "../assets/JeniX_removebg.png";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:3000/api/contact";

  // Fetch contacts from backend on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Contacts from backend:", response.data);
      setContacts(response.data.data); // ✅ Use data array from backend
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editId !== null && editId !== undefined) {
      // ✅ Update
      await axios.put(`${API_URL}/${editId}`, formData);
    } else {
      // ✅ Create
      await axios.post(API_URL, formData);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });

    setEditId(null);
    fetchContacts();

  } catch (error) {
    console.error("Error saving contact:", error);
  }
};

const handleEdit = (contact) => {
  setFormData({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    message: contact.message,
  });

  setEditId(contact._id); // must exist now
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts(); // Refresh list
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="contact-container">
      {/* INFO */}
      <div className="contact-info">
        <h2 id="contactHeader">Contact Information</h2>
        <p>
          <strong>Email:</strong> ywang675@my.centennialcollege.ca
        </p>
        <p>
          <strong>Location:</strong> Toronto, ON
        </p>
      </div>

      {/* FORM */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 id="contactHeader">Send Me a Message</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Send"} Message</button>
      </form>

      {/* CONTACT LIST */}
      <div className="contactList">
        {contacts.map((c) => (
          <div key={c._id} className="contactCard">
            <h3>
              {c.firstName} {c.lastName}
            </h3>
            <p>{c.email}</p>
            <p>{c.phone}</p>
            <p>{c.message}</p>
            <div className="contactActions">
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <img
        src={MyLogo}
        alt="Logo"
        id="watermark"
        height="100px"
        width="120px"
      />
    </div>
  );
}