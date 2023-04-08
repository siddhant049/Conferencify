import React from 'react';
import Navbar from '../components/Navbar';
import './Admin.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, MenuItem, Select } from '@mui/material';

import { Grid, TextField, Card, CardContent } from '@mui/material';
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

  return (
    <>
      <div className='adminContainer'>
        <div>
          <Navbar />
        </div>
        <div className='contentsAdmin'>
          <div style={{ textDecoration: 'underline', color: '#002244' }}>
            <h1>Conference Name</h1>
          </div>
          <div className='roleHeading'>
            <h3>Role: Reviewer</h3>
          </div>
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
                <Tab label='Assigned Papers' {...a11yProps(0)} />
                {/* <Tab label="Blank" {...a11yProps(1)} /> */}
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
                    <Typography sx={{ color: 'text.secondary' }}>
                      Paper Name - 1
                    </Typography>
                    <FormControl sx={{ marginLeft: '200px' }}>
                      <Button
                        variant='contained'
                        style={{ marginLeft: '100px', maxHeight: '28px' }}
                        onClick={() => {
                          console.log('clicked');
                        }}
                      >
                        Download{' '}
                      </Button>
                      {/* <button type="button">Click Me!</button> */}
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
                          <form>
                            <Grid container spacing={1}>
                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                                <InputLabel id='demo-simple-select-label'>
                                  <i>
                                    What is Your Overall Evaluation of the Paper
                                    *
                                  </i>
                                </InputLabel>
                                <RadioGroup
                                  aria-labelledby='demo-radio-buttons-group-label'
                                  defaultValue='female'
                                  name='radio-buttons-group'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                                <InputLabel id='demo-simple-select-label'>
                                  <i>
                                    Your Knowledge about the Subject Well Aware
                                    *
                                  </i>
                                </InputLabel>
                                <RadioGroup
                                  aria-labelledby='demo-radio-buttons-group-label'
                                  defaultValue='female'
                                  name='radio-buttons-group'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
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
                                    name='hover-feedback1'
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
                                      {labels[hover !== -1 ? hover : valuenew]}
                                    </Box>
                                  )}
                                </Box>
                              </Grid>

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
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
                                    name='hover-feedback2'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
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
                                    name='hover-feedback3'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
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
                                    name='hover-feedback4'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
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
                                    name='hover-feedback5'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
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
                                    name='hover-feedback6'
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

                              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                                <InputLabel id='demo-simple-select-label'>
                                  <i>Comments about the paper *</i>
                                </InputLabel>
                                <TextField
                                  variant='outlined'
                                  multiline
                                  rows={4}
                                  maxRows={10}
                                  placeholder='Comments*'
                                  fullWidth
                                  required
                                ></TextField>
                              </Grid>

                              <Button
                                variant='contained'
                                style={{ marginLeft: '30px' }}
                              >
                                Done{' '}
                              </Button>
                            </Grid>
                          </form>
                        </CardContent>
                      </Card>
                      <FormControl></FormControl>
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
                    <Typography sx={{ color: 'text.secondary' }}>
                      Paper Name - 2
                    </Typography>
                    <FormControl sx={{ marginLeft: '200px' }}>
                      <Button
                        variant='contained'
                        style={{ marginLeft: '100px', maxHeight: '28px' }}
                        onClick={() => {
                          console.log('clicked');
                        }}
                      >
                        Download{' '}
                      </Button>
                      {/* <button type="button">Click Me!</button> */}
                    </FormControl>
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
                    sx={{ display: 'flex' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel3bh-content'
                    id='panel3bh-header'
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Paper ID-3
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Paper Name - 3
                    </Typography>
                    <FormControl sx={{ marginLeft: '200px' }}>
                      <Button
                        variant='contained'
                        style={{ marginLeft: '100px', maxHeight: '28px' }}
                        onClick={() => {
                          console.log('clicked');
                        }}
                      >
                        Download{' '}
                      </Button>
                      {/* <button type="button">Click Me!</button> */}
                    </FormControl>
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
                    <Typography sx={{ color: 'text.secondary' }}>
                      Paper Name - 4
                    </Typography>
                    <FormControl sx={{ marginLeft: '200px' }}>
                      <Button
                        variant='contained'
                        style={{ marginLeft: '100px', maxHeight: '28px' }}
                        onClick={() => {
                          console.log('clicked');
                        }}
                      >
                        {' '}
                        Download
                      </Button>
                      {/* <button type="button">Click Me!</button> */}
                    </FormControl>
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

            {/* <TabPanel value={value} index={1}>
                            <Card className='' style={{ maxWidth: 1000, padding: "20px 5px", margin: "0 auto" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                         Add a New Reviewer
                                    </Typography> 
                                     
                                    <form>
                                        <Grid container spacing={1}>

                                            <Grid item xs={12} style={{paddingTop:"20px"}}> 
                                                <InputLabel id="demo-simple-select-label"   ><i>Enter the Details of the new Reviewer *</i></InputLabel>
                                                    <TextField type="text" placeholder="Name" variant="outlined"  fullWidth required/>
                                                    <TextField type="email" style={{paddingTop:"10px"}} placeholder="Email-Id" variant="outlined"  fullWidth required/>
                                                    <TextField type="text" style={{paddingTop:"10px"}} placeholder="Alias" variant="outlined"  fullWidth required/>
                                       
                                            </Grid>
                                            
                                            
                                        </Grid>
                                    </form>
                                </CardContent>

                            </Card>
                        </TabPanel> */}
          </Box>
        </div>
      </div>
    </>
  );
};

export default Admin;
