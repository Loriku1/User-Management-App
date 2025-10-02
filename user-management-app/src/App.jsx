import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import AddUser from './components/AddUser';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;