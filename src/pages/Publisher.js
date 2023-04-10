import { useEffect, useState } from 'react';
import storage from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CircularProgressWithLabel from '../components/ProgressBar';
import React from 'react';
import Navbar from '../components/Navbar';
import './publisher.css';

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import { InputLabel } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { isLoggedIn } from '../utils/auth';

function Publisher() {
  const navigate = useNavigate();

  // State to store uploaded file
  const [file, setFile] = useState(''); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    if (!file) {
      alert('Please upload a pdf first!');
    }
    const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Card
          className='form-publisher'
          style={{ maxWidth: 1000, padding: '20px 5px', margin: '0 auto' }}
        >
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Submit Your Paper
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              gutterBottom
            >
              Enter Author Details
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    <i>Enter the First Author's Details *</i>
                  </InputLabel>
                  <TextField
                    type='text'
                    placeholder='Name'
                    variant='outlined'
                    fullWidth
                    required
                  />
                  <TextField
                    type='email'
                    style={{ paddingTop: '10px' }}
                    placeholder='Email-Id'
                    variant='outlined'
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    <i>Enter the Second Author's Details</i>
                  </InputLabel>
                  <TextField
                    type='text'
                    placeholder='Name'
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    type='email'
                    style={{ paddingTop: '10px' }}
                    placeholder='Email-Id'
                    variant='outlined'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    <i>Enter the Third Author's Details</i>
                  </InputLabel>
                  <TextField
                    type='text'
                    placeholder='Name'
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    type='email'
                    style={{ paddingTop: '10px' }}
                    placeholder='Email-Id'
                    variant='outlined'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    <i>Enter the Fourth Author's Details</i>
                  </InputLabel>
                  <TextField
                    type='text'
                    placeholder='Name'
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    type='email'
                    style={{ paddingTop: '10px' }}
                    placeholder='Email-Id'
                    variant='outlined'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    <i>Enter Important keywords(Related you your report)</i>
                  </InputLabel>
                  <TextField
                    type='text'
                    placeholder='Keywords'
                    variant='outlined'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <InputLabel id='demo-simple-select-label'>
                    <i>Abstract: </i>
                  </InputLabel>
                  <TextField
                    type='text'
                    placeholder='abstract'
                    variant='outlined'
                    multiline
                    rows={8}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} style={{ paddingTop: '20px' }}>
                  <div className='progressBar'>
                    <div className='progressBar-2'>
                      <input
                        style={{ marginRight: '30px' }}
                        type='file'
                        onChange={handleChange}
                        accept='application/pdf'
                      />
                      <CircularProgressWithLabel value={percent} />
                    </div>
                                
                    <div>
                                  {' '}
                      <Button
                        onClick={handleUpload}
                        variant='contained'
                        color='primary'
                        fullWidth
                        sx={{ backgroundColor: '#243f5f' }}
                      >
                        Upload
                      </Button>
                    </div>
                                         {' '}
                  </div>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: '20px' }}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    sx={{ backgroundColor: '#243f5f' }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
export default Publisher;
