import { useState } from 'react';

function UserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Clear form
        setName('');
        setEmail('');
        
        // Notify parent component
        if (onUserAdded) {
          onUserAdded(data);
        }
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="user-form">
      
      
      <div className="app-description">
        <h3>About ThriveBot</h3>
        <p>
          Welcome to ThriveBot! Our goal is to help address and maintain our users mental well-being through our powerful AI based chatbot.
          Sign-up below to get first access to our application. 
        </p>
      </div>

      <h2>Add New User</h2>
      
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
        
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;
