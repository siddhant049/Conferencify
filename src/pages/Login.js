import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../axios';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
import LoadingModal from '../components/LoadingModal';
import { useNavigate } from 'react-router-dom';

// import {Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        SJS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsModalOpen(true);

    const responseData = await login({
      email: data.get('email'),
      password: data.get('password'),
    });
    setIsModalOpen(false);
    if (responseData.success === true) {
      console.log(responseData);
      navigate('/', { replace: true });
    }

    setCollapsibleProperties({
      severity:
        responseData.success === true
          ? MessageSeverity.success
          : MessageSeverity.error,
      message: responseData.message,
    });
    setIsCollapsibleOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {isModalOpen ? (
        <LoadingModal open={isModalOpen} message={'Logging in.....'} />
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
              <Box
                sx={{
                  marginTop: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#0c5285' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign in into Conferencify
                </Typography>
                <CollapsibleMessage
                  open={isCollapsibleOpen}
                  setOpen={setIsCollapsibleOpen}
                  severity={collapsibleProperties.severity}
                  message={collapsibleProperties.message}
                />
                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2, backgroundColor: '#243f5f' }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2' sx={{ color: '#243f5f' }}>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href='/signup'
                        variant='body2'
                        sx={{ color: '#243f5f' }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </>
      )}
    </motion.div>
  );
}
