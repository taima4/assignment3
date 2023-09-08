import React from 'react';
import './App.css';

function Modal({ body, isSubmitted, setIsSubmitted }) {
  function closeModal() {
    setIsSubmitted(false);
  }

  return (
    <div className={`modal ${isSubmitted ? 'open' : ''}`}>
      <p>{body}</p>
      <br />
      <button className="btn" onClick={closeModal}>
        Close
      </button>
    </div>
  );}
  export default Modal;