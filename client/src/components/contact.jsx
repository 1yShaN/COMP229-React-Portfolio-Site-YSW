import React, { useState } from 'react';
import MyLogo from '../assets/JeniX_removebg.png';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all fields before sending your message!');
      return;
    }

    // All fields are filled
    alert("Thank you! Message captured! Redirecting to Home...");

    // Redirect to home page using plain JS
    window.location.href = '/';

    // Optionally reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      {/* Contact Info Panel */}
      <div className="contact-info">
        <h2 id="contactHeader">Contact Information</h2>
        <p><strong>Email:</strong> ywang675@my.centennialcollege.ca</p>
        <p><strong>Location:</strong> Toronto, ON</p>
      </div>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 id="contactHeader">Send Me a Message</h2>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Contact Number" value={formData.phone} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
      <img src={MyLogo} alt="Logo" id="watermark" height="100px" width="120px" />
    </div>
  );
}
