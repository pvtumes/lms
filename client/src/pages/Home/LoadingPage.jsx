import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Home from './Home'; // Assuming Home is in the same directory

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isLoading) {
    return <Home />;
  }

  return (
    <div 
      style={{ 
        backgroundColor: 'lightblue', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column'
      }}
    >
      <motion.div
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `conic-gradient(#007bff ${progress * 3.6}deg, #e0e0e0 ${progress * 3.6}deg)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div 
          style={{
            backgroundColor: 'white', 
            width: 160, 
            height: 160, 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'absolute'
          }}
        >
          <h2>{progress}%</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;