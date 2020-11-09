import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    margin: '1.25rem',
  },
  media: {
    height: 250,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    color: 'white',
  },
  desc: {
    color: 'white',
    textAlign: 'left',
  },
  buttons: {
    color: 'white',
  },
});

export default function ImageCard({ driver }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={driver.imageURL}
          title='Option'
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='h1'
            className={classes.title}
          >
            {driver.title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.desc}
          >
            {driver.desc}
          </Typography>
          <hr />
        </CardContent>
        <Button className={classes.buttons}>Hello</Button>
      </CardActionArea>
    </Card>
  );
}
