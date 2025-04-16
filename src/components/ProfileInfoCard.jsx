import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

export default function ProfileInfoCard({ form, setForm, handleChange }) {
  const [preview, setPreview] = useState(form.avatar || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, avatarFile: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setForm({ ...form, avatar: null, avatarFile: null });
    setPreview(null);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Profile Info</h3>

      {/* Avatar Block */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3">
          {preview ? (
            <img src={preview} alt="avatar" className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
              {form.username?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>

        {/* Hidden input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Conditional buttons */}
        {!preview && !form.avatar ? (
          <button
            type="button"
            onClick={openFileDialog}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800"
          >
            <FontAwesomeIcon icon="fa-upload" />
            Upload
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openFileDialog}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs hover:bg-gray-800"
            >
              <FontAwesomeIcon icon="fa-pen" />
            </button>
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
            >
              <FontAwesomeIcon icon="fa-trash" />
            </button>
          </div>
        )}
      </div>

      <ProfileInput label="Username" name="username" value={form.username} readOnly />
      <ProfileInput label="First Name" name="first_name" value={form.first_name} onChange={handleChange} />
      <ProfileInput label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} />
      <ProfileInput label="Bio" name="bio" value={form.bio} onChange={handleChange} />
    </div>
  );
}

function ProfileInput({ label, name, value, onChange, readOnly = false }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value || ''}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full px-3 py-2 border rounded bg-gray-100 text-sm"
        type="text"
      />
    </div>
  );
}
