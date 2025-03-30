import { useState } from 'react';

function UserForm({ onUserAdded }) {
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
        alert('Successfully signed up!');
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
      
      
      <div className="app-description">
        <h3>About Thrive</h3>
          <p>
              Welcome to Thrive! Our goal is to help address and maintain our users mental well-being through our
              powerful AI based chatbot. <br></br><br></br>
              Looking for new resources to try, from breathing and mindfulness techniques to different kinds of
              journaling? Or would you like help finding and making an appointment with a therapist that best matches
              you? Our platform offers a wide variety of tools and resources to support your mental well-being
              goals. <br></br><br></br>
              Sign-up below to get first access to our application.
          </p>
      </div>

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
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
