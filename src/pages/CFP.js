import React from 'react';
import classes from './cfp.module.css';
import Navbar from '../components/Navbar';
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem, Select } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { motion } from 'framer-motion';
import { countries, researchAreas } from '../utils/lists';
import { postData } from '../axios';
import { urlMap } from '../utils/url';
import LoadingModal from '../components/LoadingModal';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
// const handleChange = (newValue) => {
//   setValue(newValue);
// };
const CFP = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    const data = new FormData(event.currentTarget);

    const confData = {
      name: data.get('name'),
      acronym: data.get('acronym'),
      webpage: data.get('webpage'),
      venue: data.get('venue'),
      city: data.get('city'),
      country: data.get('country'),
      primaryArea: data.get('primaryArea'),
      secondaryArea: data.get('secondaryArea'),
      topics: [data.get('t1'), data.get('t2'), data.get('t3'), data.get('t4')],
    };
    const response = await postData(urlMap.createConference, confData);
    setIsModalOpen(false);
    setCollapsibleProperties({
      severity:
        response.success === true
          ? MessageSeverity.success
          : MessageSeverity.error,
      message: response.message,
    });
    setIsCollapsibleOpen(true);
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
      <div className={classes.bigContainer}>
        <div></div>
        <div className={classes.container}>
          <div>
            <Card
              className={classes.formCfp}
              style={{
                maxWidth: 1000,
                padding: '20px 5px',
                marginTop: '400px',
              }}
            >
              <CardContent>
                <Typography gutterBottom variant='h5'>
                  Create a Call for Papers
                </Typography>
                <CollapsibleMessage
                  open={isCollapsibleOpen}
                  setOpen={setIsCollapsibleOpen}
                  severity={collapsibleProperties.severity}
                  message={collapsibleProperties.message}
                />
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                >
                  Note that the information you enter will be published and used
                  to find your CFP, so please try to be accurate.
                </Typography>
                <Grid
                  container
                  spacing={1}
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* <Grid xs={12} sm={6} item style={{paddingTop:"20px"}}>
                        <InputLabel id="demo-simple-select-label" style={{color:"black"}} >CFP Type:</InputLabel>
                        
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          required
                          style={{minWidth: 250}}
                        >
                          <MenuItem  value={10}>Conference</MenuItem>
                          <MenuItem  value={20}>Book</MenuItem>
                          <MenuItem  value={30}>Journal special issue</MenuItem>
                          <MenuItem  value={40}> Journal</MenuItem>
                          <MenuItem  value={50}>Other</MenuItem>
                        </Select>
                      </Grid> */}

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <InputLabel
                      id='demo-simple-select-label'
                      style={{ color: 'black' }}
                    >
                      Name and acronym:
                    </InputLabel>
                    <InputLabel id='demo-simple-select-label'>
                      <i>Enter the Conference's Full name</i>
                    </InputLabel>
                    <TextField
                      type='text'
                      placeholder='Conference Name'
                      variant='outlined'
                      name='name'
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <InputLabel id='demo-simple-select-label'>
                      <i> Enter the Conference Acronym</i>
                    </InputLabel>
                    <TextField
                      type='text'
                      placeholder='Acronym'
                      variant='outlined'
                      name='acronym'
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <InputLabel
                      id='demo-simple-select-label'
                      style={{ color: 'black' }}
                    >
                      Conference Information :
                    </InputLabel>
                    <InputLabel id='demo-simple-select-label'>
                      <i>Enter the Conference Web Page</i>
                    </InputLabel>
                    <TextField
                      type='text'
                      placeholder='Web Page'
                      variant='outlined'
                      name='webpage'
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <InputLabel id='demo-simple-select-label'>
                      <i>Enter the Conference Location if Relevant</i>
                    </InputLabel>
                    <TextField
                      type='text'
                      placeholder='Venue'
                      variant='outlined'
                      style={{ paddingRight: '10px' }}
                      name='venue'
                    />
                    <TextField
                      type='text'
                      placeholder='City'
                      variant='outlined'
                      name='city'
                    />
                  </Grid>

                  <Grid xs={12} sm={6} item style={{ paddingTop: '20px' }}>
                    {/* <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required /> */}
                    <InputLabel id='demo-simple-select-label'>
                      Country/Region:
                    </InputLabel>

                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      style={{ minWidth: 250 }}
                      name='country'
                    >
                      {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                      {countries.map((country) => (
                        <MenuItem value={country}>{country}</MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {/* <Grid item xs={12} style={{paddingTop:"20px"}}>
                      <InputLabel id="demo-simple-select-label" style={{color:"black"}} >Dates and Deadlines :</InputLabel> 
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
                      </Grid> */}

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <InputLabel
                      id='demo-simple-select-label'
                      style={{ color: 'black' }}
                    >
                      Research Areas :
                    </InputLabel>
                    <InputLabel id='demo-simple-select-label'>
                      <i>
                        {' '}
                        Select the main research area to which your conference
                        belongs.
                      </i>
                    </InputLabel>
                    <Grid xs={12} sm={6} item style={{ paddingTop: '20px' }}>
                      {/* <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required /> */}
                      <InputLabel id='demo-simple-select-label'>
                        Primary Area
                      </InputLabel>

                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        style={{ minWidth: 250 }}
                        name='primaryArea'
                      >
                        {/* <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem> */}
                        {researchAreas.map((area) => (
                          <MenuItem value={area}>{area}</MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid xs={12} sm={6} item style={{ paddingTop: '20px' }}>
                      {/* <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required /> */}
                      <InputLabel id='demo-simple-select-label'>
                        Secondary Area:
                      </InputLabel>

                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        style={{ minWidth: 250 }}
                        name='secondaryArea'
                      >
                        {/* <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem> */}
                        {researchAreas.map((area) => (
                          <MenuItem value={area}>{area}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <InputLabel
                      id='demo-simple-select-label'
                      style={{ color: 'black' }}
                    >
                      Topics :
                    </InputLabel>
                    <InputLabel id='demo-simple-select-label'>
                      <i>
                        Enter at most four topics (categories, themes, areas).
                      </i>
                    </InputLabel>
                    <TextField
                      type='text'
                      placeholder='Topic 1'
                      variant='outlined'
                      fullWidth
                      required
                      style={{ paddingTop: '7px' }}
                      name='t1'
                    />
                    <TextField
                      type='text'
                      placeholder='Topic 2'
                      variant='outlined'
                      fullWidth
                      required
                      style={{ paddingTop: '7px' }}
                      name='t2'
                    />
                    <TextField
                      type='text'
                      placeholder='Topic 3'
                      variant='outlined'
                      fullWidth
                      required
                      style={{ paddingTop: '7px' }}
                      name='t3'
                    />
                    <TextField
                      type='text'
                      placeholder='Topic 4'
                      variant='outlined'
                      fullWidth
                      required
                      style={{ paddingTop: '7px' }}
                      name='t4'
                    />
                  </Grid>

                  <Grid item xs={12} style={{ paddingTop: '20px' }}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CFP;
