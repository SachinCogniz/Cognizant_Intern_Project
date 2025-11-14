// src/components/Auth/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);

  // Callback to switch back to login after successful registration
  const handleRegistrationSuccess = () => {
    setShowRegister(false);
  };

  return (
    <div className="container mt-5">
      {/* Conditionally render Login or Register component */}
      {showRegister ? (
        // Pass the success callback to Register
        <Register onRegistrationSuccess={handleRegistrationSuccess} />
      ) : (
        <Login />
      )}

      {/* Toggle links */}
      <div className="text-center mt-3">
        {showRegister ? (
          <p>
            Already have an account?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setShowRegister(false)}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setShowRegister(true)}
            >
              Register here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthPage;