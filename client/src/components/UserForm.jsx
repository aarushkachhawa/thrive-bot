import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function UserForm({ onUserAdded }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form...', { name, email });
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'omit',
        body: JSON.stringify({ name, email }),
      });
      
      console.log('Response status:', response.status);
      
      // Check if response has content before trying to parse JSON
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse response:', text);
        throw new Error('Invalid response from server');
      }
      
      console.log('Response data:', data);
      
      if (response.ok) {
        // Clear form
        setName('');
        setEmail('');
        
        // Notify parent component
        if (onUserAdded) {
          onUserAdded(data);
        }
        navigate("/confirmation");
      } else {
        console.error('Server error:', data);
        alert(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Network error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert('Server error - please try again later');
    }
  };

  return (
    <div className="user-form">
      <h2>Sign Up Here:</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button className='submit' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
