import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, TextField, Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import classesinfo from './sendemail.module.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 150,align:'left' },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'emailid',
    headerName: 'Email Id',
    type: 'email',
    width: 190,
    align:'left'
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
  {
    field:'totalAssigned',
    headerName:'Total Papers Assigned',
    width:160,
    align:'center'
  },
  {
    field:'totalCompleted',
    headerName:'Papers Reviewed',
    width:150,
    align:'center'
  },
  {
    field:'totalLeft',
    headerName:'Papers left',
    width:150,
    align:'center'
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', emailid: 'siddhant0009@gmail.com', totalAssigned:24 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', emailid: 'ShivamSingh000141@gmail.com' ,totalAssigned:20},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', emailid: 'jainarain@gmail.com',totalAssigned:15 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', emailid: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', emailid: null },
  { id: 6, lastName: 'Melisandre', firstName: 'null', emailid: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', emailid: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', emailid: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', emailid: 65 },
];
// const handleSendEmail = async (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   const paperIds = [...selected];

//   if (paperIds.length === 0) {
//     return alert('Select atleast one paper to send email');
//   }

//   setIsModalOpen(true);

//   const responseData = await postData(urlMap.sendEmails, {
//     conferenceId: confId,
//     paperIds,
//     mailSubject: data.get('mailSubject'),
//     mailBody: data.get('mailBody'),
//   });
//   setIsModalOpen(false);

//   setCollapsibleProperties({
//     severity:
//       responseData.success === true
//         ? MessageSeverity.success
//         : MessageSeverity.error,
//     message: responseData.message,
//   });
//   setIsCollapsibleOpen(true);
// };
export default function DataTable() {
  return (
    <div style={{ height: '85vh', width: '80vw',backgroundColor:'white' }}>



      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[20]}
        checkboxSelection
      />
      <Grid
                  
                  component='form'
                  sx={{ backgroundColor: 'white',}}
                  // onSubmit={handleSendEmail}
                >
                  <p sx={{paddingLeft:'10vw' }}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Email Content: </p> <br />
                  <TextField
                   
                    sx={{ backgroundColor: 'white', marginBottom: '10px',marginLeft:'2vw',width:'55vw' }}
                    multiline
                    variant='outlined'
                    maxRows={15}
                    required
                    name='mailSubject'
                    placeholder='Email Subject'
                  />{' '}
                  <br />
                  <TextField
                    
                    sx={{ backgroundColor: 'white',marginLeft:'2vw' ,width:'55vw'}}
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
       
    </div>
  );
}