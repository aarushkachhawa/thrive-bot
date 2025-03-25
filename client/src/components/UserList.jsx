function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name || 'No name'}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
