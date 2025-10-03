import { useState } from 'react';
import UserSwitcher, { USERS, type User } from '../UserSwitcher';

export default function UserSwitcherExample() {
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]);

  return (
    <div className="p-4 max-w-sm">
      <h3 className="text-sm font-medium mb-3">Current User: {currentUser.name}</h3>
      <UserSwitcher 
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />
    </div>
  );
}