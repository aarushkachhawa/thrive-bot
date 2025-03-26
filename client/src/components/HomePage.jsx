import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle when a new user is added
  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="home-page">
      <h1>Thrive</h1>

      <UserForm onUserAdded={handleUserAdded} />

    </div>
  );
}

export default HomePage;