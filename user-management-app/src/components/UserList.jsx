import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUsers, setLoading, setError, deleteUser } from '../store/userSlice';

function UserList() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

   

    useEffect(() => {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
        dispatch(setUsers(JSON.parse(cachedUsers)));
    } else {
        fetchUsers();
    }
}, []);


  

    const fetchUsers = async () => {
    dispatch(setLoading(true));
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        dispatch(setUsers(data));
        localStorage.setItem('users', JSON.stringify(data)); 
    } catch (err) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoading(false));
    }
};


    const openDeleteModal = (id) => {
        setUserToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete != null) {
            dispatch(deleteUser(userToDelete));
        }
        setIsModalOpen(false);
        setUserToDelete(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUserToDelete(null);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key].toLowerCase();
        const bValue = b[sortConfig.key].toLowerCase();

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (loading) return (
      <div className="flex items-center justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
    if (error) return (
      <div className="text-center py-16">
        <p className="inline-block rounded-lg bg-red-50 px-4 py-2 text-red-700">Error: {error}</p>
      </div>
    );

    return (
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <Link to="/add-user" className="hidden sm:inline-block rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
              Add User
            </Link>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none">Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none">Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.company.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Link to={`/user/${user.id}`} className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-700 hover:bg-blue-100">
                            View
                          </Link>
                          <button onClick={() => openDeleteModal(user.id)} className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-red-700 hover:bg-red-100">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
              <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Delete user?</h2>
                <p className="mt-2 text-sm text-gray-600">This action cannot be undone. Are you sure you want to delete this user?</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={closeModal} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button onClick={confirmDelete} className="rounded-lg bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
    );
}

export default UserList;