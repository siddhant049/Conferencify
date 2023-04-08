import ProfileHeader from '../components/ProfileHeader';
import CallMadeIcon from '@mui/icons-material/CallMade';
import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';

const User = () => {
  function createData(name, role, link) {
    return { name, role, link };
  }

  const rows = [
    createData('Name 1 ', 'Admin', <CallMadeIcon />),
    createData('Name 2', 'Reviewer', <CallMadeIcon />),
    createData('Name 3', 'User', <CallMadeIcon />),
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <br />
      <ProfileHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3 style={{ marginTop: '20px', textDecoration: 'underline' }}>
          Your Past Conferences
        </h3>
      </div>
      <div style={{ margin: '20px 120px ' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name of Conference</TableCell>
                <TableCell align='right'>Role</TableCell>
                <TableCell align='right'>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.role}</TableCell>
                  <TableCell align='right'>{row.link}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </motion.div>
  );
};

export default User;
