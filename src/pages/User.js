import React, { Component } from "react";
import UserProfile from "react-user-profile";
import Navbar from '../components/Navbar'
import './User.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



import CallMadeIcon from '@mui/icons-material/CallMade';

function createData(name, role, link) {
  return { name, role,link };
}

const rows = [
  createData('Name 1 ', 'Admin', <CallMadeIcon/> ),
  createData('Name 2', 'Reviewer', <CallMadeIcon/> ),
  createData('Name 3', 'User', <CallMadeIcon/> )

];
class App extends Component {
  render() {
    const photo =
      "https://image.tmdb.org/t/p/w185/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg";
    const userName = "Harvey Specter";
    const location = "New York, USA";

    const comments = [
      {
        id: "1",
        photo:
          "https://image.tmdb.org/t/p/w185/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        userName: "Mike Ross",
        content:
          "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. ",
        createdAt: 1543858000000
      }
    ];
    return (
      <>
      <div className="UserProfileContainer">
        <div>
          <Navbar/>
        </div>
        <div style={{marginTop:"50px"}}>
            <div style={{ margin: "0 auto", width: "100%" }}>
              <UserProfile
                photo={photo}
                userName={userName}
                location={location}
                initialLikesCount={121}
                initialFollowingCount={723}
                initialFollowersCount={4433}
                
                paperPublished={120}

                />
            </div>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <h3 style={{marginTop:"20px",textDecoration:"underline"}}>Your Past Conferences</h3>
        </div>
        <div style={{margin:"20px 120px "}}>
              <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>

                  <TableCell >Name of Conference</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Link</TableCell>
 
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">{row.link}</TableCell>

                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      </>

    );
  }
}

export default App;
