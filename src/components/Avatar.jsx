export default function Avatar({ user, size = 'w-9 h-9', textSize = 'text-sm' }) {
    const initials = user?.username?.[0]?.toUpperCase() ?? 'U';
  
    return user?.avatar ? (
      <img
        src={user.avatar}
        alt={user.username}
        className={`${size} rounded-full object-cover shadow-lg`}
      />
    ) : (
      <div
        className={`${size} rounded-full bg-black text-white font-semibold flex items-center justify-center shadow-lg ${textSize}`}
      >
        {initials}
      </div>
    );
  }
  