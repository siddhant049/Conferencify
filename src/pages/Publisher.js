import { useEffect, useState } from 'react';
import storage from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CircularProgressWithLabel from '../components/ProgressBar';
import React from 'react';
import Navbar from '../components/Navbar';
import './publisher.css';
import * as pdfjsLib from 'pdfjs-dist';

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
import { useNavigate, useParams } from 'react-router';
import { isLoggedIn } from '../utils/auth';
import { plagCheck, postData } from '../axios';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
import LoadingModal from '../components/LoadingModal';
import { urlMap } from '../utils/url';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

function Publisher() {
  const navigate = useNavigate();

  // State to store uploaded file
  const [file, setFile] = useState(''); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [authorCount, setAuthorCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = useState({
    severity: MessageSeverity.info,
    message: '',
  });
  const [plagPercent, setPlagPercent] = useState(null);
  const [isPlagChecking, setIsPlagChecking] = useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    if (!file) {
      return alert('Please upload a pdf first!');
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
          setDownloadUrl(url);
        });
      }
    );
  };

  const { confId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (downloadUrl === null) {
      return alert('Upload the paper to submit!');
    }

    setIsModalOpen(true);
    const data = new FormData(event.currentTarget);

    const authorEmails = [];

    for (let i = 0; i < authorCount; i++) {
      authorEmails.push(data.get(`email${i}`));
    }

    console.log(authorEmails, confId);

    const publishingData = {
      conferenceId: confId,
      authors: authorEmails,
      title: data.get('title'),
      keywords: data.get('keywords'),
      abstract: data.get('abstract'),
      url: downloadUrl,
    };

    const responseData = await postData(urlMap.submitPaper, publishingData);

    setIsModalOpen(false);
    setCollapsibleProperties({
      severity:
        responseData.success === true
          ? MessageSeverity.success
          : MessageSeverity.error,
      message: responseData.message,
    });
    setIsCollapsibleOpen(true);
  };

  const handlePlagCheck = async (content) => {
    if (!file) {
      return alert('First upload the file to perform the plagariasm check');
    }

    setIsPlagChecking(true);

    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    const maxPages = pdf.numPages;
    let text = '';

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join('');
      text += pageText;
    }
    text = text.length >= 9998 ? text.substring(0, 9998) : text;

    console.log(text);
    const responseData = await plagCheck(text);

    console.log(responseData);
    setPlagPercent(responseData.percentPlagiarism);
    setIsPlagChecking(false);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, []);

  const handleChangeAuthorCount = (changeVal) => {
    setAuthorCount((prevCount) => {
      if (prevCount + changeVal > 5) {
        alert('Authors Cannot be more than 5');
        return prevCount;
      }

      if (prevCount + changeVal < 1) {
        alert('Atleast 1 author required');
        return prevCount;
      }

      return prevCount + changeVal;
    });
  };

  return isModalOpen ? (
    <LoadingModal open={isModalOpen} message={'Submitting.....'} />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className='form-outer'>
        <Card className='form-publisher'>
          <CardContent component='form' onSubmit={handleSubmit}>
            <Typography gutterBottom variant='h5'>
              Submit Your Paper
            </Typography>
            <CollapsibleMessage
              open={isCollapsibleOpen}
              setOpen={setIsCollapsibleOpen}
              severity={collapsibleProperties.severity}
              message={collapsibleProperties.message}
            />
            <Grid container spacing={1}>
              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <InputLabel id='demo-simple-select-label'>
                  <i>Enter your paper title *</i>
                </InputLabel>
                <TextField
                  type='text'
                  placeholder='Paper Title'
                  variant='outlined'
                  fullWidth
                  name='title'
                  required
                />
              </Grid>
              {[...Array(authorCount).keys()].map((idx) => {
                return (
                  <Grid item xs={12} style={{ paddingTop: '20px' }} key={idx}>
                    <InputLabel id='demo-simple-select-label'>
                      <i>Enter the Details of author {idx + 1} *</i>
                    </InputLabel>
                    <TextField
                      type='text'
                      placeholder='Name'
                      variant='outlined'
                      fullWidth
                      required
                      name={`author${idx}`}
                    />
                    <TextField
                      type='email'
                      style={{ paddingTop: '10px' }}
                      placeholder='Email-Id'
                      variant='outlined'
                      fullWidth
                      required
                      name={`email${idx}`}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '12px' }}>
              <Button
                onClick={handleChangeAuthorCount.bind(this, 1)}
                variant='contained'
                color='primary'
                sx={{ backgroundColor: '#243f5f' }}
              >
                Add an author
              </Button>{' '}
              <Button
                onClick={handleChangeAuthorCount.bind(this, -1)}
                variant='contained'
                color='primary'
                sx={{ backgroundColor: '#243f5f' }}
              >
                Remove an author
              </Button>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '20px' }}>
              <InputLabel id='demo-simple-select-label'>
                <i>Enter Important keywords(Related you your report) *</i>
              </InputLabel>
              <TextField
                type='text'
                placeholder='Keywords'
                variant='outlined'
                fullWidth
                required
                name='keywords'
              />
              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <InputLabel id='demo-simple-select-label'>
                  <i>Abstract * </i>
                </InputLabel>
                <TextField
                  type='text'
                  placeholder='abstract'
                  variant='outlined'
                  multiline
                  rows={8}
                  fullWidth
                  required
                  name='abstract'
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
                    <Button
                      onClick={handleUpload}
                      variant='contained'
                      color='primary'
                      sx={{ backgroundColor: '#243f5f' }}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <Typography>
                  <em>Plagariasm Check</em>
                </Typography>
                <Typography variant='caption' sx={{ marginBottom: '5px' }}>
                  Note: This Plagariasm check is for user convenience and checks
                  only first 10,000 characters. Final Plagariasm check would be
                  done later using Turnitin.
                </Typography>{' '}
                <br />
                {isPlagChecking ? (
                  <CircularProgress sx={{ color: '#0c5285' }} />
                ) : plagPercent ? (
                  <Typography variant='body1'>
                    Your plagariasm percent is {plagPercent}
                  </Typography>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ backgroundColor: '#243f5f' }}
                    onClick={handlePlagCheck}
                  >
                    Plag Check Now!
                  </Button>
                )}
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
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
export default Publisher;
