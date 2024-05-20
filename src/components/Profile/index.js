import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ProfileIcon() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="user"
        src="/assets/settings/user-solid.svg"
        sx={{ width: 82, height: 82 }}
      />
    </Stack>
  );
}
