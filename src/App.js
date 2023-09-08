
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Modal from './Modal'; // Import the Modal component

function App() {
  const [inputForm, setForm] = useState({
    name: '',
    phone: '',
    age: '',
    empStatus: '',
    salary: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    age: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...errors };
  
    if (inputForm.name.trim() === '') {
      newErrors.name = 'Name is required';
      valid = false;
    } else {
      newErrors.name = '';
    }
  
    if (inputForm.phone.length !== 10) {
      newErrors.phone = 'Phone number is not correct';
      valid = false;
    } else {
      newErrors.phone = '';
    }
  
    const age = parseInt(inputForm.age, 10);
    if (isNaN(age) || age < 18 || age > 65) {
      newErrors.age = 'Please enter your age correctly (must be between 18 and 65)';
      valid = false;
    } else {
      newErrors.age = '';
    }
  
    setErrors(newErrors);
  
    if (valid) {
      setSubmissionStatus('The Form Has Been Submitted Successfully');
      setShowModal(true); // Show modal on successful submission
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...inputForm,
      [name]: value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const isSubmitDisabled =
    !inputForm.name ||
    !inputForm.phone ||
    !inputForm.age ||
    showModal ||
    errors.name ||
    errors.phone ||
    errors.age;

  return (
    <div className="App">
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Loan Application Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={inputForm.name}
              onChange={handleInputChange}
            />

            <div className="error">{errors.name}</div>
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={inputForm.phone}
              onChange={handleInputChange}
            />
            <div className="error">{errors.phone}</div>
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={inputForm.age}
              onChange={handleInputChange}
            />
            <div className="error">{errors.age}</div>
          </div>
          <div>
            <label style={{ display: "inline" }}>Employment Status:</label>
            <input
              type="checkbox"
              name="empStatus"
              value={inputForm.empStatus}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Salary Range:</label>
            <input
              type="text"
              name="salary"
              value={inputForm.salary}
              onChange={handleInputChange}
            />
          </div>
              <button type="submit" className="btn" disabled={isSubmitDisabled}>
            Submit   
          </button>
     
    
    
        </form>
     
        <Modal
          body={submissionStatus}
          isSubmitted={showModal}
          setIsSubmitted={setShowModal}
        />
      </div>
    </div>
  );
}

export default App;
