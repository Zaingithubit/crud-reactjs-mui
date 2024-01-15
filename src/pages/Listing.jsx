import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "id", label: "ID", minWidth: 60 },
  { id: "name", label: "Make", minWidth: 100 },
  { id: "age", label: "Model", minWidth: 100 },
  { id: "age", label: "Vehicle Identification No", minWidth: 170 },
  { id: "age", label: "Engine No", minWidth: 100 },
  { id: "age", label: "Vehicle Body Type", minWidth: 150 },
  { id: "age", label: "Manufactured Year", minWidth: 150 },
  { id: "age", label: "Transmission", minWidth: 100 },
  { id: "age", label: "Odometer Reading", minWidth: 150 },
  { id: "age", label: "Reg Expiry", minWidth: 100 },
  { id: "age", label: "License Plate", minWidth: 100 },
  { id: "age", label: "Wheelers", minWidth: 100 },
  // Add more columns as needed
];

const Listing = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage or use default data
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      setTableData(storedData);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Editing row with ID: ${id}`);
    navigate(`/addvehicle/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteDialogOpen(true);
    setSelectedDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting row with ID: ${selectedDeleteId}`);
    const updatedData = tableData.filter(
      (item, index) => index + 1 !== selectedDeleteId
    );
    setTableData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedDeleteId(null);
  };

  return (
    <div>
      <Container>
        <Typography
          variant="h4"
          sx={{ my: 3 }}
          align="center"
          fontWeight="bold"
        >
          Vehicles List
        </Typography>
        <Paper>
          <TableContainer
            component={Paper}
            style={{ minHeight: 400, overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        background: "black",
                        color: "white",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      background: "black",
                      color: "white",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    const rowNumber = index + 1 + page * rowsPerPage;
                    return (
                      <TableRow key={rowNumber}>
                        <TableCell>{rowNumber}</TableCell>
                        <TableCell>{item.make}</TableCell>
                        <TableCell>{item.model}</TableCell>
                        <TableCell>{item.vehicleIdentificationNo}</TableCell>
                        <TableCell>{item.engineNo}</TableCell>
                        <TableCell>{item.vehicleBodyType}</TableCell>
                        <TableCell>{item.manufacturedYear}</TableCell>
                        <TableCell>{item.transmission}</TableCell>
                        <TableCell>{item.odometerReading}</TableCell>
                        <TableCell>{item.regExpiry}</TableCell>
                        <TableCell>{item.licensePlate}</TableCell>
                        <TableCell>{item.wheeler}</TableCell>

                        <TableCell style={{ display: "flex" }}>
                          <IconButton
                            onClick={() =>
                              handleEdit(page * rowsPerPage + index + 1)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleDeleteClick(page * rowsPerPage + index + 1)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Listing;
