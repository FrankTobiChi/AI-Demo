import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Avatar from "./Avatar";
import accessEngineerAvatar from '@assets/generated_images/Access_engineer_avatar_0d77e2a8.png';
import endUserAvatar from '@assets/generated_images/End_user_avatar_6488e25c.png';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "online" | "away" | "busy" | "offline";
}

interface UserSwitcherProps {
  currentUser: User;
  onUserChange: (user: User) => void;
}

const USERS: User[] = [
  {
    id: "accessadmin",
    name: "Access Admin", 
    role: "Access Engineer",
    avatar: accessEngineerAvatar,
    status: "online"
  },
  {
    id: "alice.w",
    name: "Alice Walker",
    role: "End User",
    avatar: endUserAvatar, 
    status: "online"
  }
];

export default function UserSwitcher({ currentUser, onUserChange }: UserSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3" data-testid="button-user-switcher">
          <Avatar 
            src={currentUser.avatar}
            alt={currentUser.name}
            size="md"
            status={currentUser.status}
          />
          <div className="flex-1 text-left">
            <div className="font-medium text-sm">{currentUser.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser.role}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {USERS.map((user) => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => onUserChange(user)}
            className="flex items-center gap-3 p-3"
            data-testid={`user-option-${user.id}`}
          >
            <Avatar 
              src={user.avatar}
              alt={user.name}
              size="md"
              status={user.status}
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.role}</div>
            </div>
            {user.id === currentUser.id && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { USERS };