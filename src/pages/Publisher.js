import React from 'react'
import Navbar from '../components/Navbar'
import './publisher.css'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { InputLabel } from '@mui/material';
import {  MenuItem, Select } from '@mui/material';

const Publisher = () => {
  return (
    <>
        <Navbar/>
        <div>
        <Card className='form-publisher' style={{ maxWidth: 1000, padding: "20px 5px", margin: "0 auto" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                  Submit Your Paper
                </Typography> 
                  <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                  Enter Author Details
                </Typography> 
                  <form>
                    <Grid container spacing={1}>

                      <Grid item xs={12} style={{paddingTop:"20px"}}> 
                      <InputLabel id="demo-simple-select-label"   ><i>Enter the First Author's Details *</i></InputLabel>
                        <TextField type="text" placeholder="Name" variant="outlined"  fullWidth required/>
                        <TextField type="email" style={{paddingTop:"10px"}} placeholder="Email-Id" variant="outlined"  fullWidth required/>
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}> 
                      <InputLabel id="demo-simple-select-label"  ><i>Enter the Second Author's Details</i></InputLabel>
                        <TextField type="text" placeholder="Name" variant="outlined"  fullWidth />
                        <TextField type="email" style={{paddingTop:"10px"}} placeholder="Email-Id" variant="outlined"  fullWidth />
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}> 
                      <InputLabel id="demo-simple-select-label"  ><i>Enter the Third Author's Details</i></InputLabel>
                        <TextField type="text" placeholder="Name" variant="outlined"  fullWidth />
                        <TextField type="email" style={{paddingTop:"10px"}} placeholder="Email-Id" variant="outlined"  fullWidth />
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}> 
                      <InputLabel id="demo-simple-select-label"  ><i>Enter the Fourth Author's Details</i></InputLabel>
                        <TextField type="text" placeholder="Name" variant="outlined"  fullWidth />
                        <TextField type="email" style={{paddingTop:"10px"}} placeholder="Email-Id" variant="outlined"  fullWidth />
                        
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}> 
                      <InputLabel id="demo-simple-select-label"  ><i>Enter Important keywords(Related you your report)</i></InputLabel>
                        <TextField type="text" placeholder="Keywords" variant="outlined"  fullWidth />
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}> 
                      <InputLabel id="demo-simple-select-label"  ><i>Abstract: </i></InputLabel>
                        <TextField type="text" placeholder="abstract" variant="outlined"  fullWidth />
                      </Grid>

                      <Grid item xs={12} style={{paddingTop:"20px"}}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
        </div>
    </>

  )
}

export default Publisher