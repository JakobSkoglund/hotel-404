import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState } from "react";
import { profiles, IProfile } from "../../MocData/login";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Signup = () => {
  //styles
  const paperStyle = {
    padding: 20,
    //height: "65vh",
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
  //hanterar firstname
  const [firstname, SetFirstName] = useState("");
  //hanterar lastname
  const [lastname, SetLastName] = useState("");
  //hanterar age
  const [age, SetAge] = useState("");
  //hanterar error
  const [error, SetErrorMsg] = useState("");

  //Ifall användaren tycker "Enter" i den efter att ha fyllt i password
  const handKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };
  //Den här funktionen hanterar nya användare
  const handleSignUp = () => {
    //kolla ifall den redan finns med i listan
    const match = profiles.find(
      (profile) => profile.name === firstname && profile.lastname === lastname
    );
    //Kollar ifall användarnamnet är taget av en annan användare
    const usernameTaken = profiles.find(
      (profile) => profile.username === username
    );
    //Ser till att användaren har fyllt i alla textfields
    if (!firstname || !lastname || !age || !username || !password) {
      SetErrorMsg("All fields are required!");
      return;
    } else if (!match) {
      if (usernameTaken) {
        SetErrorMsg("Username is taken, try another one!");
        return;
      }
      //kommer att skapa en ny profile och lägga den i MOCK listan
      const newProfile: IProfile = {
        name: firstname,
        lastname: lastname,
        age: age,
        username: username,
        password: password,
        key: (profiles.length + 1).toString(),
      };
      profiles.push(newProfile);
      alert("Sign up successful!");
    } else {
      alert("User already have an account, try to Sign in!");
    }
    //lägger den nya profilen i MOCK listan

    //Sätter alla textFields tomma igen
    SetFirstName("");
    SetLastName("");
    SetAge("");
    SetUsername("");
    SetPassword("");
    SetErrorMsg("");

    console.log(profiles);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid container direction="row" alignItems="center">
          <ApartmentIcon />
          <h1>HOTEL 404</h1>
        </Grid>
        <Grid item direction="row" alignItems="center" style={titleSpacing}>
          <h2>Sign Up</h2>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First name"
              placeholder="Amanda"
              fullWidth
              required
              style={userlblstyle}
              onChange={(e) => SetFirstName(e.target.value)}
              value={firstname}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              placeholder="Nyander"
              fullWidth
              required
              style={userlblstyle}
              onChange={(e) => SetLastName(e.target.value)}
              value={lastname}
            />
          </Grid>
        </Grid>
        <TextField
          label="Age"
          placeholder="18+"
          type="number"
          fullWidth
          required
          style={userlblstyle}
          value={age}
          onChange={(e) => SetAge(e.target.value)}
        />
        <TextField
          label="Username"
          placeholder="George1233"
          type="text"
          fullWidth
          required
          style={userlblstyle}
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
        />

        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          fullWidth
          required
          id="password_lbl"
          style={userlblstyle}
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          onKeyPress={handKeyDown}
        />
        {/*Innebär, när errorMsg inträffar så kommer det andra att ske
            Error hantering */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSignUp}
        >
          <Typography sx={{ mt: 1 }}>
            <b>Sign in</b>
          </Typography>
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?&nbsp;
          <Link href="#">Sign in</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
