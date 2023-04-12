import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Admin.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, Select, Tooltip } from '@mui/material';

import { Grid, TextField, Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { InputLabel } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Sendemail from './Sendemail';
import ExportExcel from '../components/ExcelExport';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';
import { getData, postData } from '../axios';
import { urlMap } from '../utils/url';
import { useLocation, useNavigate, useParams } from 'react-router';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
import LoadingModal from '../components/LoadingModal';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { isLoggedIn } from '../utils/auth';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const iconMap = {
  Unassigned: (
    <Tooltip title='No reviewer assigned'>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        Unassigned
        <PersonAddAltIcon sx={{ color: 'blue', marginLeft: '5px' }} />
      </p>
    </Tooltip>
  ),
  Pending: (
    <Tooltip title='Review Pending'>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        Pending
        <PendingIcon sx={{ color: 'grey', marginLeft: '5px' }} />
      </p>
    </Tooltip>
  ),
  Approved: (
    <Tooltip title='Approved'>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        Approved
        <CheckCircleOutlineIcon sx={{ color: 'green', marginLeft: '5px' }} />
      </p>
    </Tooltip>
  ),
  Rejected: (
    <Tooltip title='Rejected'>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        Rejected
        <CancelIcon sx={{ color: 'red', marginLeft: '5px' }} />
      </p>
    </Tooltip>
  ),
};

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
  const [papers, setPapers] = useState(null);
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

  const ExcelExportData = papers
    ? papers.map((paper) => {
        const authors = paper.authors.map((author) => author.name).join(', ');
        const authorEmails = paper.authors
          .map((author) => author.email)
          .join(', ');
        return {
          'Paper ID': paper.paperId,
          Title: paper.title,
          Keywords: paper.keywords,
          Abstract: paper.abstract,
          Authors: authors,
          'Author Emails': authorEmails,
          'Plagariasm %': paper.plagiarismPercentage,
          'Review Status': paper.status,
          'Review Comment': paper.review[8] ? paper.review[8].verdict : 'N/A',
        };
      })
    : [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeaccordition = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const [reviewer, setreviewer] = React.useState('');

  const handleChangeReviewer = (event) => {
    console.log(reviewer);
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

  const handleAddReviewer = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsModalOpen(true);

    const responseData = await postData(urlMap.addReviewer, {
      conferenceId: confId,
      reviewerEmail: data.get('reviewerEmail'),
      alias: data.get('reviewerAlias'),
    });
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

  const handlerAssignReviewer = async (event, paperId) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsModalOpen(true);

    const responseData = await postData(urlMap.assignReviewer, {
      conferenceId: confId,
      reviewerId: data.get('assignedReviewer'),
      paperId: paperId,
    });
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

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }

    setIsModalOpen(true);
    getData(`${urlMap.getSingleConference}/${confId}`)
      .then((data) => {
        setPapers(data.conference.submissions);
        console.log(data.conference.submissions);
        console.log(data.conference);
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
              <h3>Conference: {conferenceData.acronym}</h3>{' '}
            </div>

            <div className='outerUrlContainer'>
              <h4 className='urlHeading'>CFP Link: </h4>
              <div className='copyUrlContainer'>
                <p className='urlLink'>{`${publishingLink}`} </p>{' '}
                <Tooltip title={isLinkCopied ? 'Copied!' : 'Copy Link'}>
                  {!isLinkCopied ? (
                    <ContentCopyIcon className='urlLogo' onClick={handleCopy} />
                  ) : (
                    <ContentCopyTwoToneIcon className='urlLogo' />
                  )}
                </Tooltip>
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
                  <ExportExcel
                    excelData={ExcelExportData}
                    fileName={'Conference Report'}
                  />
                  {papers.map((paper) => {
                    return (
                      <Accordion
                        expanded={expanded === paper._id}
                        onChange={handleChangeaccordition(paper._id)}
                        key={paper._id}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1bh-content'
                          id='panel1bh-header'
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {paper.paperId}
                          </Typography>
                          <Typography
                            sx={{ color: 'text.secondary', width: '62%' }}
                          >
                            {paper.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {iconMap[paper.status]}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            component='form'
                            onSubmit={(event) => {
                              handlerAssignReviewer(event, paper._id);
                            }}
                          >
                            <h5>Authors name:</h5>
                            {paper.authors.map((author) => (
                              <div>{author.name}</div>
                            ))}
                            <br />
                            <h5>Keywords:</h5> {paper.keywords} <br></br>
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
                                value={
                                  reviewer === '' ? paper.reviewer : reviewer
                                }
                                onChange={handleChangeReviewer}
                                style={{ minWidth: 250 }}
                                name='assignedReviewer'
                              >
                                {conferenceData.reviewers.map((reviewer) => (
                                  <MenuItem value={reviewer.userId}>
                                    {reviewer.alias}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <FormControl>
                              <a
                                href={paper.url}
                                target='_blank'
                                rel='noreferrer'
                                style={{ textDecoration: 'none' }}
                              >
                                <Button
                                  variant='contained'
                                  style={{
                                    marginLeft: '100px',
                                    marginTop: '10px',
                                    backgroundColor: '#243f5f',
                                  }}
                                >
                                  Download Paper{' '}
                                </Button>
                              </a>
                              {/* <button type="button">Click Me!</button> */}
                            </FormControl>
                            <br />
                            <Button
                              variant='contained'
                              style={{
                                marginLeft: '30px',
                                marginTop: '20px',
                                backgroundColor: '#243f5f',
                              }}
                              type='submit'
                            >
                              Save{' '}
                            </Button>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
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

                    <Grid
                      container
                      spacing={1}
                      component='form'
                      onSubmit={handleAddReviewer}
                    >
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
                          name='reviewerName'
                        />
                        <TextField
                          type='email'
                          style={{ paddingTop: '10px' }}
                          placeholder='Email-Id'
                          variant='outlined'
                          fullWidth
                          required
                          name='reviewerEmail'
                        />
                        <TextField
                          type='text'
                          style={{ paddingTop: '10px' }}
                          placeholder='Alias'
                          variant='outlined'
                          fullWidth
                          required
                          name='reviewerAlias'
                        />
                        <Button
                          variant='contained'
                          style={{
                            marginLeft: '30px',
                            marginTop: '30px',
                            backgroundColor: '#243f5f',
                          }}
                          type='submit'
                        >
                          Save{' '}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Sendemail
                  papers={papers}
                  setIsModalOpen={setIsModalOpen}
                  setIsCollapsibleOpen={setIsCollapsibleOpen}
                  iconMap={iconMap}
                  setCollapsibleProperties={setCollapsibleProperties}
                  confId={confId}
                />
              </TabPanel>
            </Box>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Admin;
