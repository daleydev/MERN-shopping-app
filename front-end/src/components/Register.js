import React from "react";
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    width: "500px",
    margin: "auto",
    marginTop: "100px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
       margin: 'auto',
       marginTop: '20px',
       marginBottom: '40px',
  },
  registerLink: {
     marginTop: '30px'
  }

});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <CardHeader title='Register'></CardHeader>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          <TextField
            
            label='Username'
            type='text'
            autoComplete='current-username'
          />
        </Typography>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          <TextField
            
            label='Email'
            type='text'
            autoComplete='current-email'
          />
        </Typography>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          <TextField
            
            label='Password'
            type='password'
            autoComplete='current-password'
          />
        </Typography>
        
        <Typography className={classes.registerLink}  variant="body2" component="p">
          <Link to='/login' >Please login if you registered.</Link>
        </Typography>
      </CardContent>
      <CardActions >
        <Button className={classes.button} variant='contained' color='primary'>
          Login
        </Button>
      </CardActions>
    </Card>
  );
}
