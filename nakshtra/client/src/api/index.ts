export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/api/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
