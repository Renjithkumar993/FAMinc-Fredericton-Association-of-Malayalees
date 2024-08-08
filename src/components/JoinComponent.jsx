// File: JoinComponent.jsx
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import './JoinComponent.css';
import { useNavigate } from 'react-router-dom';

const JoinComponent = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  return (
    <motion.div
      className="join-container mb-5 mt-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => controls.start({ scale: 1.05 })}
      onHoverEnd={() => controls.start({ scale: 1 })}
    >
      <div className="join-content">
        <h1 className='join-content-h1'>Join the Fredericton Association of Malayalees today!</h1>
        <p>Become a member and be part of our vibrant community.</p>
      </div>
      <motion.button
        className="join-signup-button"
        onClick={() => navigate('/joinus')}
        whileHover={{ backgroundColor: "#d43f13", color: "#fff", scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaUserPlus style={{ marginRight: '10px' }} /> Join Community
        
      </motion.button>
    </motion.div>
  );
};

export default JoinComponent;
