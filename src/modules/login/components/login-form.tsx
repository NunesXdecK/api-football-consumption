import React from 'react';
import { loginLabels as l } from '../labels/login-labels';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../../contexts/authContext';

interface Props {
}

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Meu Time
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginForm(props: Props) {
  const { handleLogin } = React.useContext(AuthContext)
  const [apiKey, setApiKey] = React.useState<string>("")
  const [error, setError] = React.useState<boolean>(false)
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {l.singIn}
      </Typography>
      <Box component="form" noValidate onSubmit={async (event) => {
        event.preventDefault()
        const res = await handleLogin(apiKey)
        setError(!res)
      }} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id={l.apiKey}
          label={l.apiKey}
          name={l.apiKey}
          autoComplete={l.apiKey}
          autoFocus
          value={apiKey}
          helperText={error ? l.apiKeyInvalid : ''}
          error={error}
          onChange={(event) => setApiKey(event?.target?.value)}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {l.singIn}
        </Button>
        <Link target='_blank' href="https://dashboard.api-football.com/register" variant="body2">
          {l.createAccount}
        </Link>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}