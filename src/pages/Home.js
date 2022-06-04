// import * as React from 'react';
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFun,
  getSingleUser,
  loadUsers,
  updateUserFun,
} from "../redux/actions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usersList, user } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(loadUsers());

    // console.log(usersList);
  }, [dispatch, loadUsers]);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteUserFun(id));
      dispatch(loadUsers());
      console.log(id);
    }
  };
  const handleAdd = () => {
    navigate("/addUser");
  };
  const handleEdit = (id) => {
    navigate(`/editUser/${id}`);
    dispatch(getSingleUser(id));

    console.log(id);
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleAdd()}>
        Add User
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList &&
              usersList.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginRight: "20px" }}
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
