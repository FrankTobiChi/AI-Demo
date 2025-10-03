import ChatMessage from '../ChatMessage';
import accessEngineerAvatar from '@assets/generated_images/Access_engineer_avatar_0d77e2a8.png';
import endUserAvatar from '@assets/generated_images/End_user_avatar_6488e25c.png';

export default function ChatMessageExample() {
  const now = new Date();
  
  return (
    <div className="p-4 space-y-2 max-w-2xl">
      <ChatMessage 
        id="1"
        sender={{
          id: "alice.w",
          name: "Alice Walker",
          avatar: endUserAvatar
        }}
        content="@AccessBot show user alice.w"
        timestamp={new Date(now.getTime() - 60000)}
        isOwnMessage={true}
      />
      
      <ChatMessage 
        id="2"
        sender={{
          id: "accessbot",
          name: "AccessBot",
          isBot: true
        }}
        content="Here's the user information for alice.w:"
        timestamp={new Date(now.getTime() - 30000)}
      />
      
      <ChatMessage 
        id="3"
        sender={{
          id: "accessadmin",
          name: "Access Admin",
          avatar: accessEngineerAvatar
        }}
        content="Thanks for the quick lookup!"
        timestamp={now}
      />
    </div>
  );
}