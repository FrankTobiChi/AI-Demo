import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import { format } from "date-fns";

interface ChatMessageProps {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isBot?: boolean;
  };
  content: string;
  timestamp: Date;
  isOwnMessage?: boolean;
  className?: string;
}

export default function ChatMessage({
  sender,
  content,
  timestamp,
  isOwnMessage = false,
  className
}: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 p-3 hover-elevate rounded-lg group",
      isOwnMessage ? "flex-row-reverse" : "flex-row",
      className
    )}>
      <Avatar 
        src={sender.avatar}
        alt={sender.name}
        size="md"
        status="online"
      />
      <div className={cn(
        "flex-1 min-w-0",
        isOwnMessage ? "text-right" : "text-left"
      )}>
        <div className={cn(
          "flex items-baseline gap-2 mb-1",
          isOwnMessage ? "justify-end" : "justify-start"
        )}>
          <span className="font-medium text-foreground text-sm">
            {sender.name}
          </span>
          {sender.isBot && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
              BOT
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {format(timestamp, 'HH:mm')}
          </span>
        </div>
        <div className={cn(
          "inline-block max-w-lg p-3 rounded-lg text-sm",
          isOwnMessage 
            ? "bg-primary text-primary-foreground" 
            : "bg-card text-card-foreground border border-card-border"
        )}>
          {content}
        </div>
      </div>
    </div>
  );
}