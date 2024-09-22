import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState } from "react";
import { VerifyUser } from "../../Controller/UserController";
import { profiles} from "../../MocData/login";
import { profile } from "console";
import { LoggedinContext } from "../../index";
import { useContext } from "react";
import {useNavigate, Link} from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();  
  //lite style
  const paperStyle = {
    padding: 20,
    //height: "50vh",
    width: 380,
    margin: "20px auto",
  };

  const btnstyle = { margin: "10px 3px" };
  const userlblstyle = { margin: "10px 3px" };
  const titleSpacing = { marginTop: "5px" };

  //För att hantera Username
  const [username, SetUsername] = useState("");
  //för att hantera password
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState("");
  
  //Globalt tillstånd för huruvida användare är inloggad
  const {loggedin, setLoggedin} = useContext(LoggedinContext); 

  //Ifall användaren trycker på knappen "Enter " efter att ha fyllt i password
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  

  //Funktion för att hantera Login och kollar på att errors som kan uppstå
  const handleLogin = () => {
    SetError("");
    const validUser: boolean = VerifyUser(username, password); 
    if(validUser){
      alert("Login successful"); 
      setLoggedin(true); 
    } 
    else {
      SetError("Invalid username/password combination"); 
    }
    //Kolla Genom Mock listan för att se ifall username och password hittar en match
    /*const match = profiles.find(
      (profile) =>
        profile.username === username && profile.password === password
    );
    //Kollar ifall det finns en matchande användarnamn men att lösenordet är fel
    const wrongPassword = profiles.find(
      (profile) =>
        profile.username === username && profile.password !== password
    );
    if (match) {
      alert("Login successful!");
      setLoggedin(true); 
    } else if (wrongPassword) {
      SetError("Wrong password!");
      SetPassword("");
      return;
    } else {
      SetError("No such a user!");
      return;
    }*/

    SetPassword("");
    SetUsername("");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={10} style={paperStyle}>
        {/* Title with logo */}
        <Grid container direction="row" alignItems="center">
          <ApartmentIcon />
          <h1>HOTEL 404</h1>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          style={titleSpacing}
        >
          <h2>Sign in</h2>
        </Grid>

        <TextField
          label="Username"
          placeholder="User123"
          fullWidth
          required
          style={userlblstyle}
          onChange={(e) => SetUsername(e.target.value)}
          value={username}
        />
        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          fullWidth
          required
          id="outlined-password-input"
          style={userlblstyle}
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          onKeyPress={handleKeyDown}
        />
        {/*Om det finns en  error, kommer följande att visas upp */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          onClick={handleLogin}
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          <Typography sx={{ mt: 1 }}>
            <b>Sign in</b>
          </Typography>
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Do you want to create an account?&nbsp;
          <Link to={"signup"}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
