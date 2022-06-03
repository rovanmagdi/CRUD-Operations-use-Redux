import { React, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { addUserFun, loadUsers } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });
  const { name, email, address, contact } = state;
  const [error, setError] = useState("");
  const handleBack = () => {
    navigate("/");
  };
  const handLeInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      setError("please unput all input filed ");
    }else{
        dispatch(addUserFun(state))
        dispatch(loadUsers())
        
        navigate("/")
        setState('')
    }
   
  };
  return (
    <div
     
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleBack()}
      >
        Go Back
      </Button>
      <br />
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          type="text"
          name="name"
          onChange={handLeInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          name="email"
          type="email"
          onChange={handLeInputChange}

        />
        <br />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          value={address}
          type="address"
          onChange={handLeInputChange}

          name="address"
        />
        <br />

        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          value={contact}
          type="number"
          name="contact"
          onChange={handLeInputChange}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
