import * as React from 'react';
import { useState } from 'react';
// import { Modal,ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import { MenuItem, Select, TextField, Grid, Button } from '@mui/material';

import Navbar from '../components/Navbar';
import classesinfo from './sendemail.module.css';
import { MessageSeverity } from '../components/CollapsibleMessage';
import { postData } from '../axios';
import { urlMap } from '../utils/url';

function createData(paperId, paperTitle, status) {
  return {
    paperId,
    paperTitle,
    status,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'paperId',
    numeric: false,
    disablePadding: true,
    label: 'Paper ID',
  },
  {
    id: 'paperTitle',
    numeric: true,
    disablePadding: false,
    label: 'Paper Title',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all papers',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, filterValue, setFilterValue, rows, setRows, allRows } =
    props;

  const handleFilterChange = (event) => {
    const val = event.target.value;
    setFilterValue(val);

    if (val === 'All') {
      return setRows(allRows);
    }

    const filteredRows = allRows.filter((row) => row.status === val);
    setRows(filteredRows);
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color='inherit'
            variant='subtitle1'
            component='div'
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            Send Email
          </Typography>
        )}

        <Tooltip title='Filter list'>
          <Select
            sx={{ marginLeft: '12px' }}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Assgin a reviewer'
            value={filterValue}
            onChange={handleFilterChange}
            style={{ minWidth: 250 }}
            name='assignedReviewer'
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Unassigned'}>Unassigned</MenuItem>
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Approved'}>Approved</MenuItem>
            <MenuItem value={'Rejected'}>Rejected</MenuItem>
          </Select>
        </Tooltip>
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  papers,
  setIsModalOpen,
  setIsCollapsibleOpen,
  iconMap,
  setCollapsibleProperties,
  confId,
}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('All');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.paperId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, paperId) => {
    const selectedIndex = selected.indexOf(paperId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, paperId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const paperIds = [...selected];

    if (paperIds.length === 0) {
      return alert('Select atleast one paper to send email');
    }

    setIsModalOpen(true);

    const responseData = await postData(urlMap.sendEmails, {
      conferenceId: confId,
      paperIds,
      mailSubject: data.get('mailSubject'),
      mailBody: data.get('mailBody'),
    });
    setIsModalOpen(false);

    setCollapsibleProperties({
      severity:
        responseData.success === true
          ? MessageSeverity.success
          : MessageSeverity.error,
      message: responseData.message,
    });
    setIsCollapsibleOpen(true);
  };

  const isSelected = (paperId) => selected.indexOf(paperId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const allRows = papers.map((paper) =>
    createData(paper.paperId, paper.title, paper.status)
  );

  React.useEffect(() => {
    setRows(allRows);
  }, []);

  return (
    <>
      <div>
        <div className={classesinfo.container}>
          <div className={classesinfo.tableinfo}>
            <Box sx={{ width: '90%' }}>
              <Paper sx={{ width: '100%', mb: 2, paddingBottom: '20px' }}>
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  rows={rows}
                  setRows={setRows}
                  allRows={allRows}
                />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby='tableTitle'
                    size={dense ? 'small' : 'medium'}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {stableSort(rows, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.paperId);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) =>
                                handleClick(event, row.paperId)
                              }
                              role='checkbox'
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.paperId}
                              selected={isItemSelected}
                            >
                              <TableCell padding='checkbox'>
                                <Checkbox
                                  color='primary'
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                component='th'
                                id={labelId}
                                scope='row'
                                padding='none'
                              >
                                {row.paperId}
                              </TableCell>
                              <TableCell align='right'>
                                {row.paperTitle}
                              </TableCell>
                              <TableCell align='right'>
                                <div style={{ display: 'inline-block' }}>
                                  {iconMap[row.status]}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[20, 40, 65]}
                  component='div'
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Grid
                  className={classesinfo.emailContent}
                  component='form'
                  onSubmit={handleSendEmail}
                >
                  <p>Email Content: &nbsp;</p> <br />
                  <TextField
                    className={classesinfo.emailContentContainer}
                    sx={{ backgroundColor: 'white', marginBottom: '10px' }}
                    multiline
                    variant='outlined'
                    maxRows={15}
                    required
                    name='mailSubject'
                    placeholder='Email Subject'
                  />{' '}
                  <br />
                  <TextField
                    className={classesinfo.emailContentContainer}
                    sx={{ backgroundColor: 'white' }}
                    placeholder='Email Body'
                    multiline
                    variant='outlined'
                    rows={7}
                    maxRows={15}
                    required
                    name='mailBody'
                  />{' '}
                  <br />
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3, mb: 2, ml: 3, backgroundColor: '#243f5f' }}
                  >
                    Send Email
                  </Button>
                </Grid>
              </Paper>
              <FormControlLabel
                control={
                  <Switch checked={dense} onChange={handleChangeDense} />
                }
                label='Dense padding'
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
