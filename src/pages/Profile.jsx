import { useEffect, useState } from "react";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("travelwise-user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!user)
    return (
      <div className="p-6 text-red-500">
        No user found. Please login again.
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
