import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Admin.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, Select } from '@mui/material';

import { Grid, TextField, Card, CardContent } from '@material-ui/core';
// import Button from '@mui/material';
import Button from '@mui/material/Button';
import { InputLabel } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Rating from '@mui/material/Rating';

import StarIcon from '@mui/icons-material/Star';
import { isLoggedIn } from '../utils/auth';
import { useNavigate, useParams } from 'react-router';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
import { getData, postData } from '../axios';
import { urlMap } from '../utils/url';
import LoadingModal from '../components/LoadingModal';

const labels = {
  1: 'Pathetic',
  2: 'Poor',
  3: 'Fair',
  4: 'Good ',
  5: 'Excellent',
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

function getLabelText(valuenew) {
  return `${valuenew} Star${valuenew !== 1 ? 's' : ''}, ${labels[valuenew]}`;
}

const Admin = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeaccordition = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(true);

  const [reviewer, setreviewer] = React.useState('');

  const handleChangeReviewer = (event) => {
    setreviewer(event.target.value);
  };

  const [valuenew, setValuenew] = React.useState(0);
  const [valuenew2, setValuenew2] = React.useState(0);
  const [valuenew3, setValuenew3] = React.useState(0);
  const [valuenew4, setValuenew4] = React.useState(0);
  const [valuenew5, setValuenew5] = React.useState(0);
  const [valuenew6, setValuenew6] = React.useState(0);

  const [hover, setHover] = React.useState(-1);
  const [hover2, setHover2] = React.useState(-1);
  const [hover3, setHover3] = React.useState(-1);
  const [hover4, setHover4] = React.useState(-1);
  const [hover5, setHover5] = React.useState(-1);
  const [hover6, setHover6] = React.useState(-1);

  const [papers, setPapers] = React.useState([]);
  const [conferenceData, setConferenceData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const { confId } = useParams();

  const handleSubmit = async (event, paperId) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsModalOpen(true);
    console.log({
      evaluation: data.get('evaluation'),
      awareness: data.get('awareness'),
      authenticity: data.get('authenticity'),
      methodological: data.get('methodological'),
      aptness: data.get('aptness'),
      grammatical: data.get('grammatical'),
      valueaddition: data.get('valueaddition'),
      quality: data.get('quality'),
      comments: data.get('comments'),
      plagiarism: data.get('plag'),
    });

    const reviewData = {
      paperId: paperId,
      verdict: data.get('evaluation'),
      review: [
        { question: 'evaluation', verdict: data.get('evaluation') },
        { question: 'awareness', verdict: data.get('awareness') },
        { question: 'authenticity', verdict: data.get('authenticity') },
        { question: 'methodological', verdict: data.get('methodological') },
        { question: 'aptness', verdict: data.get('aptness') },
        { question: 'grammatical', verdict: data.get('grammatical') },
        { question: 'valueaddition', verdict: data.get('valueaddition') },
        { question: 'quality', verdict: data.get('quality') },
        { question: 'comments', verdict: data.get('comments') },
        { question: 'plagiarism', verdict: data.get('plag') },
      ],
      plagiarismPercentage: data.get('plag'),
    };

    const responseData = await postData(urlMap.submitReview, reviewData);
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
      navigate('/');
    }

    setIsModalOpen(true);
    getData(`${urlMap.getReviewPapers}/${confId}`)
      .then((data) => {
        setPapers(data.papers);
        setConferenceData(data.conference);
        console.log(data.papers);
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
    <>
      <div className='adminContainer'>
        <div className='contentsAdmin'>
          <div style={{ color: '#002244' }}>
            <h1>Reviewer Dashboard</h1>
          </div>
          <div className='roleHeading'>
            <h3>{conferenceData.acronym}</h3>
          </div>
        </div>
        <CollapsibleMessage
          open={isCollapsibleOpen}
          setOpen={setIsCollapsibleOpen}
          severity={collapsibleProperties.severity}
          message={collapsibleProperties.message}
        />
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
                <Tab label='Assigned Papers' {...a11yProps(0)} />
                {/* <Tab label="Blank" {...a11yProps(1)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div style={{ marginRight: '70px', marginLeft: '30px' }}>
                {papers.map((paper) => {
                  return (
                    <Accordion
                      component='form'
                      onSubmit={(event) => {
                        handleSubmit(event, paper._id);
                      }}
                      expanded={expanded === 'panel1'}
                      onChange={handleChangeaccordition('panel1')}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                          Paper ID: {paper.paperId}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                          {paper.title}
                        </Typography>
                        <FormControl sx={{ marginLeft: '200px' }}>
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
                        </FormControl>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Card style={{ maxWidth: 1000, maxHeight: 5000 }}>
                            <CardContent>
                              <Typography gutterBottom variant='h6'>
                                Review the Paper
                                <br />
                              </Typography>

                              <Grid container spacing={1}>
                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>
                                      What is Your Overall Evaluation of the
                                      Paper *
                                    </i>
                                  </InputLabel>
                                  <RadioGroup
                                    aria-labelledby='demo-radio-buttons-group-label'
                                    defaultValue='female'
                                    name='evaluation'
                                  >
                                    <FormControlLabel
                                      value='accept'
                                      control={<Radio />}
                                      label='Accept'
                                    />
                                    <FormControlLabel
                                      value='reject'
                                      control={<Radio />}
                                      label='Reject'
                                    />
                                  </RadioGroup>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>
                                      Your Knowledge about the Subject Well
                                      Aware *
                                    </i>
                                  </InputLabel>
                                  <RadioGroup
                                    aria-labelledby='demo-radio-buttons-group-label'
                                    defaultValue='female'
                                    name='awareness'
                                  >
                                    <FormControlLabel
                                      value='aware'
                                      control={<Radio />}
                                      label='Aware'
                                    />
                                    <FormControlLabel
                                      value='moderatelyunaware'
                                      control={<Radio />}
                                      label='Moderately Aware'
                                    />
                                    <FormControlLabel
                                      value='unaware'
                                      control={<Radio />}
                                      label='Unaware'
                                    />
                                  </RadioGroup>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>Authenticity of The Work *</i>
                                  </InputLabel>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='authenticity'
                                      value={valuenew}
                                      // precision={1.0}
                                      getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValuenew(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                      }}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valuenew !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {
                                          labels[
                                            hover !== -1 ? hover : valuenew
                                          ]
                                        }
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>
                                      Methodological rigor of the paper(question
                                      change krna hai) *
                                    </i>
                                  </InputLabel>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='methodological'
                                      value={valuenew2}
                                      // precision={1.0}
                                      getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValuenew2(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover2(newHover);
                                      }}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valuenew2 !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {
                                          labels[
                                            hover2 !== -1 ? hover2 : valuenew2
                                          ]
                                        }
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>Aptness of The Work *</i>
                                  </InputLabel>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='aptness'
                                      value={valuenew3}
                                      // precision={1.0}
                                      getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValuenew3(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover3(newHover);
                                      }}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valuenew3 !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {
                                          labels[
                                            hover3 !== -1 ? hover3 : valuenew3
                                          ]
                                        }
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>
                                      Grammatical Accuracy and Content Clarity *
                                    </i>
                                  </InputLabel>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='grammatical'
                                      value={valuenew4}
                                      // precision={1.0}
                                      getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValuenew4(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover4(newHover);
                                      }}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valuenew4 !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {
                                          labels[
                                            hover4 !== -1 ? hover4 : valuenew4
                                          ]
                                        }
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>
                                      Value added to the existing Works in the
                                      Field *
                                    </i>
                                  </InputLabel>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='valueaddition'
                                      value={valuenew5}
                                      // precision={1.0}
                                      getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValuenew5(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover5(newHover);
                                      }}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valuenew5 !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {
                                          labels[
                                            hover5 !== -1 ? hover5 : valuenew5
                                          ]
                                        }
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>
                                      Quality of the elements inside the paper .
                                      i.e Tables , Figures and Content *
                                    </i>
                                  </InputLabel>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Rating
                                      name='quality'
                                      value={valuenew6}
                                      precision={1.0}
                                      getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValuenew6(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover6(newHover);
                                      }}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize='inherit'
                                        />
                                      }
                                    />
                                    {valuenew6 !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {
                                          labels[
                                            hover6 !== -1 ? hover6 : valuenew6
                                          ]
                                        }
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>Plagiarism Percentage *</i>
                                  </InputLabel>
                                  <TextField
                                    variant='outlined'
                                    name='plag'
                                    maxRows={10}
                                    placeholder='Plagiarism Percentage'
                                    fullWidth
                                    required
                                    type='number'
                                  ></TextField>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  style={{ paddingTop: '20px' }}
                                >
                                  <InputLabel id='demo-simple-select-label'>
                                    <i>Comments about the paper *</i>
                                  </InputLabel>
                                  <TextField
                                    variant='outlined'
                                    multiline
                                    rows={4}
                                    name='comments'
                                    maxRows={10}
                                    placeholder='Comments*'
                                    fullWidth
                                    required
                                  ></TextField>
                                </Grid>

                                <Button
                                  type='submit'
                                  variant='contained'
                                  style={{
                                    marginTop: '30px',
                                    backgroundColor: '#243f5f',
                                  }}
                                >
                                  Done{' '}
                                </Button>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Admin;
