import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    idCard: null,
    selfieVideo: null,
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Replace the URL with your backend endpoint later
    fetch("https://your-backend-api.com/api/signup", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Signup submitted successfully.");
      })
      .catch((err) => {
        console.error(err);
        alert("There was an error submitting your signup.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center">Jyfa SurveyBot Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <label className="block">
          <span>Upload Valid ID Card:</span>
          <input
            type="file"
            name="idCard"
            accept="image/*,application/pdf"
            onChange={handleChange}
            required
            className="w-full mt-1"
          />
        </label>

        <label className="block">
          <span>Upload Selfie Video:</span>
          <input
            type="file"
            name="selfieVideo"
            accept="video/*"
            onChange={handleChange}
            required
            className="w-full mt-1"
          />
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
          />
          <span>I agree to the terms and conditions.</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
