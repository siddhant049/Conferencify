import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Admin.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, Select } from '@mui/material';

import { Grid, TextField, Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { InputLabel } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Sendemail from './Sendemail';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';
import { getData } from '../axios';
import { urlMap } from '../utils/url';
import { useLocation, useNavigate, useParams } from 'react-router';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
import LoadingModal from '../components/LoadingModal';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { isLoggedIn } from '../utils/auth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Admin = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [conferenceData, setConferenceData] = useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const href = window.location.href;
  const linkArr = href.split('/');
  const baseUrl = linkArr[0] + '//' + linkArr[2];
  const publishingLink = `${baseUrl}/publisher/${conferenceData?._id}`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeaccordition = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const [reviewer, setreviewer] = React.useState('');

  const handleChangeReviewer = (event) => {
    setreviewer(event.target.value);
  };

  const handleCopy = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(publishingLink);
    } else {
      document.execCommand('copy', true, publishingLink);
    }
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 1500);
  };

  const { confId } = useParams();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }

    setIsModalOpen(true);
    getData(`${urlMap.getSingleConference}/${confId}`)
      .then((data) => {
        setConferenceData(data.conference);
        setIsModalOpen(false);
      })
      .catch((err) => {
        setIsModalOpen(false);
        console.log(err);
        setCollapsibleProperties({
          severity: MessageSeverity.error,
          message: err.message,
        });
        setIsCollapsibleOpen(true);
      });
  }, []);

  return isModalOpen ? (
    <LoadingModal open={isModalOpen} message={'Loading.....'} />
  ) : (
    conferenceData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className='adminContainer'>
          <div className='contentsAdmin'>
            <div style={{ color: '#002244', fontWeight: 'bold' }}>
              <h1>Admin Dashboard</h1>
            </div>
            <div className='roleHeading'>
              <h3>Confernce: {conferenceData.acronym}</h3>{' '}
            </div>

            <div className='outerUrlContainer'>
              <h4 className='urlHeading'>CFP Link: </h4>
              <div className='copyUrlContainer'>
                <p className='urlLink'>{`${publishingLink}`} </p>{' '}
                {!isLinkCopied ? (
                  <ContentCopyIcon className='urlLogo' onClick={handleCopy} />
                ) : (
                  <ContentCopyTwoToneIcon className='urlLogo' />
                )}
              </div>
            </div>
            <CollapsibleMessage
              open={isCollapsibleOpen}
              setOpen={setIsCollapsibleOpen}
              severity={collapsibleProperties.severity}
              message={collapsibleProperties.message}
            />
          </div>
          <div>
            <Box
              sx={{ width: '100%' }}
              style={{ marginTop: '50px', marginLeft: '20px' }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='All Papers' {...a11yProps(0)} />
                  <Tab label='Add Reviewer' {...a11yProps(1)} />
                  <Tab label='Send Email' {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div style={{ marginRight: '70px', marginLeft: '30px' }}>
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChangeaccordition('panel1')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1bh-content'
                      id='panel1bh-header'
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Paper ID-1
                      </Typography>
                      <Typography
                        sx={{ color: 'text.secondary', width: '62%' }}
                      >
                        Paper Name - 1
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <h5>Authors name:</h5> Siddhant Srivastava
                        <br />
                        <h5>Keywords:</h5> Machine learning, Web Development,
                        React <br></br>
                        <br></br>
                        <FormControl>
                          <InputLabel
                            id='demo-simple-select-label'
                            sx={{ marginLeft: '12px' }}
                          >
                            Assign a Reviewer
                          </InputLabel>
                          <Select
                            sx={{ marginLeft: '12px' }}
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='Assgin a reviewer'
                            value={reviewer}
                            onChange={handleChangeReviewer}
                            style={{ minWidth: 250 }}
                          >
                            <MenuItem value={10}>Reviewer 1</MenuItem>
                            <MenuItem value={20}>Reviewer 2</MenuItem>
                            <MenuItem value={30}>Reviewer 3</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <Button
                            variant='contained'
                            style={{ marginLeft: '100px', marginTop: '10px' }}
                          >
                            Download Paper{' '}
                          </Button>
                          {/* <button type="button">Click Me!</button> */}
                        </FormControl>
                        <br />
                        <Button
                          variant='contained'
                          style={{ marginLeft: '30px', marginTop: '20px' }}
                        >
                          Save{' '}
                        </Button>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChangeaccordition('panel2')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel2bh-content'
                      id='panel2bh-header'
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Paper ID-2
                      </Typography>
                      <Typography
                        sx={{ color: 'text.secondary', width: '62%' }}
                      >
                        Paper Name - 2
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        <CancelIcon sx={{ color: '#800000' }} />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Authors name:
                        <br />
                        Keywords:
                        <br />
                        File download option
                        <br />
                        Assign a Reviewer Button
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChangeaccordition('panel3')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel3bh-content'
                      id='panel3bh-header'
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Paper ID-3
                      </Typography>
                      <Typography
                        sx={{ color: 'text.secondary', width: '62%' }}
                      >
                        Paper Name - 3
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        <PendingIcon />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Authors name:
                        <br />
                        Keywords:
                        <br />
                        File download option
                        <br />
                        Assign a Reviewer Button
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel4'}
                    onChange={handleChangeaccordition('panel4')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel4bh-content'
                      id='panel4bh-header'
                    >
                      <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Paper ID-4
                      </Typography>
                      <Typography
                        sx={{ color: 'text.secondary', width: '62%' }}
                      >
                        Paper Name - 4
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Authors name:
                        <br />
                        Keywords:
                        <br />
                        File download option
                        <br />
                        Assign a Reviewer Button
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Card
                  className=''
                  style={{
                    maxWidth: 1000,
                    padding: '20px 5px',
                    margin: '0 auto',
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant='h5'>
                      Add a New Reviewer
                    </Typography>

                    <form>
                      <Grid container spacing={1}>
                        <Grid item xs={12} style={{ paddingTop: '20px' }}>
                          <InputLabel id='demo-simple-select-label'>
                            <i>Enter the Details of the new Reviewer *</i>
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
                          <TextField
                            type='text'
                            style={{ paddingTop: '10px' }}
                            placeholder='Alias'
                            variant='outlined'
                            fullWidth
                            required
                          />
                          <Button
                            variant='contained'
                            style={{ marginLeft: '30px', marginTop: '30px' }}
                          >
                            Save{' '}
                          </Button>
                        </Grid>
                        {/* <Grid item xs={12} style={{paddingTop:"10px"}}>
                                                <Button type="submit"  color="primary" >Submit</Button>
                                            </Grid> */}
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Sendemail />
              </TabPanel>
            </Box>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Admin;
