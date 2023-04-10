import * as React from 'react';
import Navbar from '../components/Navbar';
import classes from './allconferences.module.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { getData } from '../axios';
import { urlMap } from '../utils/url';
import CollapsibleMessage, {
  MessageSeverity,
} from '../components/CollapsibleMessage';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Input, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingModal from '../components/LoadingModal';

const Allconferences = () => {
  const [conferencesData, setConferencesData] = React.useState(null);
  const [displayedData, setDisplayedData] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#002244',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleSearch = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const searchInput = data.get('searchInput').toLowerCase();
    console.log(searchInput);
    console.log(searchInput === '');

    if (searchInput === '') {
      setDisplayedData(conferencesData);
    } else {
      const filteredDisplayed = conferencesData.filter((data) => {
        return (
          data.name.toLowerCase().includes(searchInput) ||
          data.acronym.toLowerCase().includes(searchInput)
        );
      });
      setDisplayedData(filteredDisplayed);
    }
  };

  React.useEffect(() => {
    setIsModalOpen(true);
    getData(urlMap.getAllConferences)
      .then((data) => {
        console.log(data);
        setConferencesData(data.conferences);
        setDisplayedData(data.conferences);
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
    conferencesData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={classes.contentsAdmin}>
          <div style={{ color: '#002244' }}>
            <h1>Conferences</h1>
          </div>
        </div>
        <CollapsibleMessage
          open={isCollapsibleOpen}
          setOpen={setIsCollapsibleOpen}
          severity={collapsibleProperties.severity}
          message={collapsibleProperties.message}
        />
        <Box
          component='form'
          onSubmit={handleSearch}
          noValidate
          sx={{ mt: 1 }}
          className={classes.searchBox}
        >
          <div className={classes.innerSearchContainer}>
            <TextField
              type='text'
              placeholder='Search'
              variant='outlined'
              fullWidth
              required
              style={{ paddingTop: '7px' }}
              name='searchInput'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ backgroundColor: '#243f5f', mt: 1, width: '20px' }}
            >
              <SearchIcon />
            </Button>
          </div>
        </Box>
        <div className={classes.tableall}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Conference Name</StyledTableCell>
                  <StyledTableCell align='center'>Acronym</StyledTableCell>
                  <StyledTableCell align='right'>
                    Link to Registration Page
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    Link to Web Page
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((conference) => (
                  <StyledTableRow key={conference._id}>
                    <StyledTableCell component='th' scope='row'>
                      {conference.name}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {conference.acronym}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Link to={`/publisher/${conference._id}`}>
                        <OpenInNewIcon sx={{ color: '#243f5f' }} />
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <a href={conference.webpage}>
                        <OpenInNewIcon sx={{ color: '#243f5f' }} />
                      </a>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </motion.div>
    )
  );
};

export default Allconferences;
