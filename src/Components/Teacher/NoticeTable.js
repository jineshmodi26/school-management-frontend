import React, { useState } from "react";

import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Box,
} from "@material-ui/core";

export default function CustomTeacherNoticeTableComponents(props) {
  const [Notice, setNotice] = useState([
    {
      no: 1,
      noticeTitle: "Event Arrengement",
      noticeDetails:
        "hi we annousement event to akcn kas sow wwddd dowdwd oa aakms asmd ede oemdem odm cdncc cjdf iew eq ededn ifef icdd dcicnwie qide id ddi ssmq qk qednd e ekd ekede d kda adkccqi ei",
      class: [1, 5, 3, 2],
    },
  ]);
  const [page, setPage] = useState(0);
  const [row, setRow] = useState(2);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Notice Title</TableCell>
              <TableCell>Notice Details</TableCell>
              <TableCell>Class</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Notice.slice(page * row, page * row + row).map((item) => (
              <TableRow>
                <TableCell>{item.no}</TableCell>
                <TableCell>{item.noticeTitle}</TableCell>
                <TableCell>{item.noticeDetails}</TableCell>
                <TableCell>
                  {item.class.reduce(
                    (previousElement, currentElement) =>
                      previousElement + " , " + currentElement
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10]}
          count={Notice.length}
          rowsPerPage={row}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => setRow(event.target.value)}
        />
      </TableContainer>
    </>
  );
}
