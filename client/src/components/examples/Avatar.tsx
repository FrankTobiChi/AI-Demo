import Avatar from '../Avatar';
import accessEngineerAvatar from '@assets/generated_images/Access_engineer_avatar_0d77e2a8.png';
import endUserAvatar from '@assets/generated_images/End_user_avatar_6488e25c.png';

export default function AvatarExample() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Avatar 
          src={accessEngineerAvatar}
          alt="Access Engineer"
          size="sm"
          status="online"
        />
        <Avatar 
          src={accessEngineerAvatar}
          alt="Access Engineer" 
          size="md"
          status="online"
        />
        <Avatar 
          src={accessEngineerAvatar}
          alt="Access Engineer"
          size="lg" 
          status="online"
        />
      </div>
      <div className="flex items-center gap-4">
        <Avatar 
          src={endUserAvatar}
          alt="Alice Walker"
          size="md"
          status="away"
        />
        <Avatar 
          alt="Bot"
          size="md"
          status="online"
        />
      </div>
    </div>
  );
}