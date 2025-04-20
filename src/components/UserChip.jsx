import Avatar from "./Avatar";

export default function UserChip({ user, onRemove, isRemovable = false }) {
    return (
      <span className="bg-black text-white px-3 py-2 text-sm rounded-full flex items-center gap-2">
        <Avatar user={user} size="w-6 h-6" />
        {user.username}
        {isRemovable && (
          <button onClick={() => onRemove(user.id)} className="font-bold">×</button>
        )}
      </span>
    );
  }
  