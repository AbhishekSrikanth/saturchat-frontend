export default function AvatarEditor({ preview, setPreview, setFile }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setFile(file);
      setPreview(URL.createObjectURL(file));
    };
  
    const handleRemove = () => {
      setFile(null);
      setPreview(null);
    };
  
    return (
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3">
          {preview ? (
            <img src={preview} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">G</div>
          )}
        </div>
  
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="group-avatar" />
        <div className="flex gap-2">
          <label htmlFor="group-avatar" className="bg-black text-white text-xs px-3 py-1 rounded-full cursor-pointer">Upload</label>
          {preview && (
            <button onClick={handleRemove} className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">Remove</button>
          )}
        </div>
      </div>
    );
  }
  