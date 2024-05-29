import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

ProfileIcon.propTypes = {
  size: PropTypes.number.isRequired,
};

export default function ProfileIcon({ size }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="user"
        src="/assets/settings/user-solid.svg"
        sx={{ width: size, height: size }}
      />
    </Stack>
  );
}
