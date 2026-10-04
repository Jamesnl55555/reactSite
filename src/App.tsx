import SubmitName from './components/SubmitName.tsx';
import api from './api/axios.ts';
import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/get-users");
      setUsers(response.data.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        This is the header
      </div>

      <div>
        This is the Body or main content
        <SubmitName onUserAdded={fetchUsers} />
      </div>

      <div>
        This is the footer
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;