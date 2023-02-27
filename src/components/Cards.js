import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Cards.css'
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '1px', transform: 'scale(0.8)' }}
  >
    •
  </Box>

  
);

export default function BasicCard() {
  return (
    <>
    <div className='HomeCards'>
        <div>
            <Card sx={{ maxWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                    Plagirism Check
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="black" gutterBottom>
                    First in class Plagirism Check.Hassle Free Process.Easily check papers for any plagirism
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
        </div>
        <div>
                <Card sx={{ maxWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                    Easy Conference Management 
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="black" gutterBottom>
                    Manage Your Conferences at a single place , long gone are the days where conference management was difficult
                    <br></br>
                    <br></br>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
        </div>
        <div>
            <Card sx={{ maxWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                    Information Download On the Go 
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="black" gutterBottom>
                    Download Information anywhere anytime , information easily available at a click of the buttom
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
        </div>

        <div>
            <Card sx={{ maxWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                    Call For Papers
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="black" gutterBottom>
                    Call for papers , One of the Key Features of This Website . Bringing all conference related solutions under one roof
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>
        </div>
    </div>
    </>
    


  );
}