import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const foundUser = users.find((u) => u.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);
      setEditForm(foundUser);
    }
  }, [id, users]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateUser(editForm));
    setUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-xl mb-4">User not found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-8">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <Link to="/" className="text-sm rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 hover:bg-gray-100">
            ← Back to List
          </Link>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Website</label>
              <input
                type="text"
                value={editForm.website}
                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="rounded-lg bg-green-600 px-6 py-2 text-white shadow hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-gray-500 px-6 py-2 text-white shadow hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Name:</span> {user.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {user.phone}
            </div>
            <div>
              <span className="font-semibold">Website:</span>{' '}
              <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline-offset-4 hover:underline">
                {user.website}
              </a>
            </div>
            <div>
              <span className="font-semibold">Company:</span> {user.company.name}
            </div>
            <div>
              <span className="font-semibold">Address:</span>{' '}
              {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </div>
            <button
              onClick={handleEdit}
              className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white shadow hover:bg-blue-700"
            >
              Edit User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;