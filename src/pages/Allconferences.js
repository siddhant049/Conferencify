import * as React from 'react';
import Navbar from '../components/Navbar'
import classes from "./allconferences.module.css"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Allconferences = () => {
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
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Conference Name 1', 'Acronym 1', 'Link', 'Link ' ),
        createData('Conference Name 2', 'Acronym 2', 'Link','Link ' ),
        createData('Conference Name 3', 'Acronym 3', 'Link', 'Link '),
        createData('Conference Name 4', 'Acronym 4', 'Link', 'Link '),
        createData('Conference Name 5', 'Acronym 5', 'Link', 'Link '),
      ];
  return (
    <>
    <Navbar />
    <div className={classes.contentsAdmin}>
            <div style={{textDecoration:'underline',color:'#002244'}}><h1>All Conferences</h1></div>
            
        </div>
    <div className={classes.tableall}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell >Conference Name</StyledTableCell>
                <StyledTableCell align="center">Acronym</StyledTableCell>
                <StyledTableCell align="right">Link to Registration Page</StyledTableCell>
                <StyledTableCell align="right">Link to Web Page</StyledTableCell>

            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>

                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>

    </>
    
  )
}

export default Allconferences