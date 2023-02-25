import React from 'react'
import "./cfp.css"
import Navbar from '../components/Navbar'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { InputLabel } from '@mui/material';
import {  MenuItem, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
const CFP = () => {
  return (
    <>
    <div className='big-container'>
        <div>
          <Navbar/>
        </div>
        <div className='container'>
          <div >
              <Card className='form-cfp' style={{ maxWidth: 1000, padding: "20px 5px", marginTop: "400px"  }}>
                <CardContent >
                  <Typography gutterBottom variant="h5">
                  Create a Call for Papers
                </Typography> 
                  <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                  Note that the information you enter will be published and used to find your CFP, so please try to be accurate.
                </Typography> 
                  <form>
                    <Grid container spacing={1}>
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
                      
                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                      <InputLabel id="demo-simple-select-label" style={{color:"black"}} >Name and acronym:</InputLabel>
                      <InputLabel id="demo-simple-select-label"  ><i>Enter the Conference's Full name</i></InputLabel>
                        <TextField type="text" placeholder="Conference Name"  variant="outlined" fullWidth required />
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                      <InputLabel id="demo-simple-select-label"  ><i> Enter the Conference Acronym</i></InputLabel>
                        <TextField type="text" placeholder="Acronym" variant="outlined" fullWidth required />
                      </Grid>


                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                      <InputLabel id="demo-simple-select-label" style={{color:"black"}} >Conference Information :</InputLabel> 
                      <InputLabel id="demo-simple-select-label"  ><i>Enter the Conference Web Page</i></InputLabel>
                        <TextField type="text" placeholder="Web Page" variant="outlined"  fullWidth required/>
                      </Grid>


                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                      <InputLabel id="demo-simple-select-label"  ><i>Enter the Conference Location if Relevant</i></InputLabel>
                        <TextField type="text" placeholder="Venue" variant="outlined"  style={{paddingRight:"10px"}}/>
                        <TextField type="text" placeholder="City" variant="outlined"  />
                      </Grid>

                      <Grid xs={12} sm={6} item style={{paddingTop:"20px"}}>
                        {/* <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required /> */}
                        <InputLabel id="demo-simple-select-label"  >Country/Region:</InputLabel>
                        
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          style={{minWidth: 250}}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
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

                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                          <InputLabel id="demo-simple-select-label" style={{color:"black"}} >Research Areas :</InputLabel> 
                          <InputLabel id="demo-simple-select-label"  ><i>  Select the main research area to which your conference belongs.</i></InputLabel>
                          <Grid xs={12} sm={6} item style={{paddingTop:"20px"}}>
                        {/* <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required /> */}
                        <InputLabel id="demo-simple-select-label"  >Primary Area</InputLabel>
                        
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          style={{minWidth: 250}}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </Grid>
                      
                      <Grid xs={12} sm={6} item style={{paddingTop:"20px"}}>
                        {/* <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required /> */}
                        <InputLabel id="demo-simple-select-label"  >Secondary Area:</InputLabel>
                        
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          
                          style={{minWidth: 250}}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </Grid>
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                      <InputLabel id="demo-simple-select-label" style={{color:"black"}} >Topics :</InputLabel> 
                      <InputLabel id="demo-simple-select-label"  ><i>Enter at most four topics (categories, themes, areas).</i></InputLabel>
                        <TextField type="text" placeholder="Topic 1" variant="outlined"  fullWidth required style={{paddingTop:"7px"}}/>
                        <TextField type="text" placeholder="Topic 2" variant="outlined"  fullWidth required style={{paddingTop:"7px"}}/>
                        <TextField type="text" placeholder="Topic 3" variant="outlined"  fullWidth required style={{paddingTop:"7px"}}/>
                        <TextField type="text" placeholder="Topic 4" variant="outlined"  fullWidth required style={{paddingTop:"7px"}}/>

                      </Grid>


                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </div>
        </div>
    </div>
    </>
  )
}

export default CFP