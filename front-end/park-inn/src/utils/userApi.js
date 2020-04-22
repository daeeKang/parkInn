import React from 'react';

import { useAuth0 } from '../react-auth0-spa';

export const UserData = () => {
  const { user } = useAuth0();
  return user;
};

export default UserData;
