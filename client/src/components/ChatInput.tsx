import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const COMMANDS = [
  "show user {username}",
  "reset password {username}", 
  "token help {username}",
  "app {appname}",
  "find anomalies"
];

export default function ChatInput({ 
  onSendMessage, 
  placeholder = "Type @AccessBot to see available commands...",
  disabled = false,
  className 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (message.includes("@AccessBot")) {
      const query = message.split("@AccessBot ")[1] || "";
      const filtered = COMMANDS.filter(cmd => 
        cmd.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCommands(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCommandSelect = (command: string) => {
    setMessage(`@AccessBot ${command}`);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleAtSymbol = () => {
    const cursorPos = inputRef.current?.selectionStart || 0;
    const newMessage = message.slice(0, cursorPos) + "@AccessBot " + message.slice(cursorPos);
    setMessage(newMessage);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPos + 11, cursorPos + 11);
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className={cn("relative", className)}>
      {showSuggestions && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-popover-border rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
          <div className="p-2">
            <div className="text-xs text-muted-foreground mb-2 px-2">Available Commands:</div>
            {filteredCommands.map((command, index) => (
              <button
                key={index}
                onClick={() => handleCommandSelect(command)}
                className="w-full text-left px-2 py-1 text-sm hover-elevate rounded"
                data-testid={`suggestion-${index}`}
              >
                <code className="text-primary">@AccessBot {command}</code>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-end gap-2 p-3 bg-card border border-card-border rounded-lg">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleAtSymbol}
          data-testid="button-at-symbol"
        >
          <Plus className="w-4 h-4" />
        </Button>
        
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none border-0 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-h-[36px] max-h-32"
            style={{ 
              height: 'auto',
              lineHeight: '1.5'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
            data-testid="input-message"
          />
        </div>
        
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          data-testid="button-send"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}