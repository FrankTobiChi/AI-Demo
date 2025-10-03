import { useState } from 'react';
import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Recent Messages:</h3>
        <div className="bg-muted p-3 rounded-lg min-h-[100px]">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">No messages yet... Try typing @AccessBot to see commands!</p>
          ) : (
            <div className="space-y-1">
              {messages.map((msg, index) => (
                <div key={index} className="text-sm p-2 bg-background rounded border">
                  {msg}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}