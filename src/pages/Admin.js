import React from 'react'
import Navbar from '../components/Navbar'
import './Admin.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Grid, TextField, Button, Card, CardContent } from '@material-ui/core';
import { InputLabel } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

  
    return (
      <>
      <div 
        role="tabpanel"
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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleChangeaccordition = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
        const [expanded, setExpanded] = React.useState(false);
  return (
    <>
        <div className="adminContainer">
            <div>

                <Navbar/>
            </div>
            <div className='contentsAdmin'>
                <div style={{textDecoration:'underline',color:'#002244'}}><h1>Conference Name</h1></div>
                <div className='roleHeading' ><h3>Role: Admin</h3></div>
            </div>
            <div>
                <Box sx={{ width: '100%' }} style={{marginTop:"50px",marginLeft:"20px"}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="All Papers" {...a11yProps(0)} />
                                <Tab label="Add Reviewer" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            

                            <div style={{marginRight:"70px",marginLeft:"30px"}}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeaccordition('panel1')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Paper ID-1
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>Paper Name - 1</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                        Authors name:<br/>
                                        Keywords:<br/>
                                        File download option<br/>
                                        Assign a Reviewer Button
                                        </Typography>
                                        </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeaccordition('panel2')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                        >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Paper ID-2</Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                        Paper Name - 2
                                        </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                        Authors name:<br/>
                                        Keywords:<br/>
                                        File download option<br/>
                                        Assign a Reviewer Button
                                        </Typography>
                                        </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChangeaccordition('panel3')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3bh-content"
                                        id="panel3bh-header"
                                        >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Paper ID-3
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                        Paper Name - 3
                                        </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                        Authors name:<br/>
                                        Keywords:<br/>
                                        File download option<br/>
                                        Assign a Reviewer Button
                                        </Typography>
                                        </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} onChange={handleChangeaccordition('panel4')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                        >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Paper ID-4</Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                        Paper Name - 4
                                        </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                        Authors name:<br/>
                                        Keywords:<br/>
                                        File download option<br/>
                                        Assign a Reviewer Button
                                        </Typography>
                                        </AccordionDetails>
                                </Accordion>
                                    </div>
                        </TabPanel>


                        <TabPanel value={value} index={1}>
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
                                            {/* <Grid item xs={12} style={{paddingTop:"10px"}}>
                                                <Button type="submit"  color="primary" >Submit</Button>
                                            </Grid> */}
                                            
                                        </Grid>
                                    </form>
                                </CardContent>

                            </Card>
                        </TabPanel>

                </Box>
            </div>
        </div>
    </>
  )
}


export default Admin