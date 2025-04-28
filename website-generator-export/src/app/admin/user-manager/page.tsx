"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/components/auth/AuthContext';

// Mock data for development
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    name: 'Admin User',
    roles: ['admin'],
    created_at: '2025-04-27T10:00:00Z'
  },
  {
    id: 2,
    email: 'client1@example.com',
    name: 'Client One',
    roles: ['client'],
    created_at: '2025-04-27T10:05:00Z'
  },
  {
    id: 3,
    email: 'client2@example.com',
    name: 'Client Two',
    roles: ['client'],
    created_at: '2025-04-27T10:10:00Z'
  }
];

export default function AdminUserManager() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);

  // In a real application, fetch users from the API
  useEffect(() => {
    // Fetch users logic here
  }, []);

  const handleRoleChange = (userId: number, newRole: string) => {
    // In a real application, call API to update role
    console.log(`Changing role for user ${userId} to ${newRole}`);
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, roles: [newRole] } : user
      )
    );
  };

  const handleDeleteUser = (userId: number) => {
    // In a real application, call API to delete user
    console.log(`Deleting user ${userId}`);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin User Management</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={user.roles[0]} // Assuming single role for simplicity
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border rounded px-2 py-1"
                      disabled={user.email === 'admin@example.com'} // Don't allow changing the main admin role
                    >
                      <option value="admin">Admin</option>
                      <option value="client">Client</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={user.email === 'admin@example.com'} // Don't allow deleting the main admin
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Invite User functionality here later */}
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Invite New User
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
