
import NotificationBell from "@/components/NotificationBell";

const UserInfoSection = () => {
  // Mock user and factory data - in real app this would come from auth context
  const user = { name: "John Doe", email: "john@example.com" };
  const factory = { name: "Factory Alpha" };

  return (
    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{user.name}</p>
        <p className="text-xs text-gray-400">{factory.name}</p>
      </div>
      
      {/* Notifications */}
      <NotificationBell />
    </div>
  );
};

export default UserInfoSection;
