
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Settings, User, LogOut } from 'lucide-react';

interface UserProfileDropdownProps {
  user: {
    username: string;
    avatar?: string;
    teamName?: string;
  };
}

const UserProfileDropdown = ({ user }: UserProfileDropdownProps) => {
  const handleLogout = () => {
    console.log('Logout clicked');
    // In a real app, this would call your auth provider's logout method
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="cursor-pointer border-2 border-fregna-primary hover:border-fregna-secondary transition-colors">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback className="bg-gradient-to-r from-fregna-primary to-fregna-secondary text-white">
            {user.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-bold">{user.username}</span>
            {user.teamName && (
              <span className="text-xs text-muted-foreground">{user.teamName}</span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/profile" className="flex w-full items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profilo</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/profile/settings" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Impostazioni</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
