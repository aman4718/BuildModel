import React, { useState } from "react";

const BuildModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", dob: "", phone: "" });
  const [errors, setErrors] = useState({});

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setFormData({ username: "", email: "", dob: "", phone: "" });
    setErrors({});
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!formData.email.includes("@")){
        alert("Invalid email. Please check your email address.");  
    }
    
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)){
        alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    else if (new Date(formData.dob) > new Date()){
        alert("Invalid date of birth. Please enter a past date.");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()){
        toggleModal();
    }
  };

  return (
    <div className="app">
      <button onClick={toggleModal}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" type="text" value={formData.username} 
                     onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              {errors.username && <p>{errors.username}</p>}
              
              <label>Email:</label>
              <input id="email" type="email" value={formData.email} 
                     onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              {errors.email && <p>{errors.email}</p>}
              
              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} 
                     onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
              {errors.dob && <p>{errors.dob}</p>}
              
              <label>Phone Number:</label>
              <input id="phone" type="text" value={formData.phone} 
                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              {errors.phone && <p>{errors.phone}</p>}
              
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildModel;