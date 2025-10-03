import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "away" | "busy" | "offline";
  className?: string;
}

export default function Avatar({ 
  src, 
  alt, 
  size = "md", 
  status, 
  className 
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const statusClasses = {
    online: "bg-status-online",
    away: "bg-status-away", 
    busy: "bg-status-busy",
    offline: "bg-status-offline"
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center",
        sizeClasses[size]
      )}>
        {src ? (
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground text-xs font-medium">
            {alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {status && (
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
          statusClasses[status]
        )} />
      )}
    </div>
  );
}