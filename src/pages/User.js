import ProfileHeader from '../components/ProfileHeader';
import CallMadeIcon from '@mui/icons-material/CallMade';
import React, { Component, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { getData } from '../axios';
import { urlMap } from '../utils/url';
import LoadingModal from '../components/LoadingModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const getConferenceRow = (confArr, role, route) => {
    return confArr.map((conf) => (
      <TableRow
        key={conf.acronym}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row'>
          {conf.acronym}
        </TableCell>
        <TableCell align='right'>{role}</TableCell>
        <TableCell align='right'>
          <Link to={`/${route}/${conf._id}`}>
            <OpenInNewIcon sx={{ color: '#243f5f' }} />
          </Link>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }

    setIsModalOpen(true);
    getData(urlMap.userProfile)
      .then((data) => {
        console.log(data.user);
        setUserData(data.user);
        setIsModalOpen(false);
      })
      .catch((err) => {
        setIsModalOpen(false);
      });
  }, []);
  return isModalOpen ? (
    <LoadingModal open={isModalOpen} message={'Loading.....'} />
  ) : (
    userData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <br />
        <ProfileHeader userData={userData} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h3 style={{ marginTop: '20px', textDecoration: 'underline' }}>
            Your Conferences
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
                {/* {rows.map((row) => (
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
                ))} */}
                {getConferenceRow(userData.conferenceAdmin, 'Admin', 'admin')}
                {getConferenceRow(
                  userData.conferenceReviewer,
                  'Reviewer',
                  'reviewer'
                )}
                {getConferenceRow(
                  userData.paperSubmissions,
                  'Author',
                  'publisher'
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </motion.div>
    )
  );
};

export default User;
