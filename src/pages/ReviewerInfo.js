import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getData } from '../axios';
import { urlMap } from '../utils/url';
import { MessageSeverity } from '../components/CollapsibleMessage';

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  {
    field: 'reviewerName',
    headerName: 'Reviewer Name',
    width: 150,
    align: 'left',
  },
  {
    field: 'email',
    headerName: 'Email Id',
    type: 'email',
    width: 190,
    align: 'left',
  },
  {
    field: 'totalAssigned',
    headerName: 'Total Papers Assigned',
    width: 160,
    align: 'center',
  },
  {
    field: 'totalCompleted',
    headerName: 'Papers Reviewed',
    width: 150,
    align: 'center',
  },
  {
    field: 'totalLeft',
    headerName: 'Papers left',
    width: 150,
    align: 'center',
  },
];

export default function DataTable({
  setIsModalOpen,
  setCollapsibleProperties,
  setIsCollapsibleOpen,
  confId,
}) {
  const [reviewerInfoList, setreviewerInfoList] = React.useState([]);
  React.useEffect(() => {
    getData(`${urlMap.getReviewersSummary}/${confId}`)
      .then((data) => {
        console.log(data);
        setreviewerInfoList(data.reviewInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: '85vh', width: '80vw', backgroundColor: 'white' }}>
      <DataGrid
        rows={reviewerInfoList}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[20]}
        sx={{ paddingLeft: '30px', paddingRight: '10px' }}
      />
    </div>
  );
}
