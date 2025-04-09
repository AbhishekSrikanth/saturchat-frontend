import { useAuth } from '../context/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Profile</h2>

      <div className="space-y-4">
        <ProfileField label="Username" value={user?.username} />
        <ProfileField label="Email" value={user?.email || 'Not provided'} />
        <ProfileField label="First Name" value={user?.first_name || '—'} />
        <ProfileField label="Last Name" value={user?.last_name || '—'} />
      </div>

      <div className="mt-6">
        <button
          disabled
          className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-not-allowed"
        >
          Edit (coming soon)
        </button>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="px-3 py-2 border rounded bg-gray-100 text-gray-800">
        {value}
      </div>
    </div>
  );
}
