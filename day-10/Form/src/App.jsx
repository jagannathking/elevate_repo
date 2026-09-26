import React, { useState } from "react";
import './App.css'


const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: [],
  });

  const [errors, setErrors] = useState({});

  // Input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Checkbox handler
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, value] });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.includes("@")) newErrors.email = "Email is invalid";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.skills.length === 0)
      newErrors.skills = "Select at least one skill";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleInput}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleInput}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter password"
            onChange={handleInput}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>
            <input type="checkbox" value="HTML" onChange={handleCheckbox} />{" "}
            HTML
          </label>
          <label>
            <input type="checkbox" value="CSS" onChange={handleCheckbox} /> CSS
          </label>
          <label>
            <input
              type="checkbox"
              value="JavaScript"
              onChange={handleCheckbox}
            />{" "}
            JavaScript
          </label>
          <label>
            <input type="checkbox" value="React" onChange={handleCheckbox} />{" "}
            React
          </label>
          {errors.skills && <p style={{ color: "red" }}>{errors.skills}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>


      {/* <div>
        <h3>Preview:</h3>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Password:</strong> {formData.password}
        </p>
        <p>
          <strong>Skills:</strong> {formData.skills.join(", ")}
        </p>
      </div> */}
    </div>
  );
};

export default App;
