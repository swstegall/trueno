import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { useAppSelector } from '../../../utilities/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    paper: {
      width: '100%',
    },
  })
);

export default () => {
  const classes = useStyles();
  const Messages: any = useAppSelector((state: any) => state.Messages);
  const Users: any = useAppSelector((state: any) => state.Users);
  
  return (
    <List className={classes.root}>
      {Messages.Active.map((current: any, i: number) => {
        const currentUser = Users.find((u: any) => u.id === current.userId);
        return (
          <Paper key={`message_${current.id}`} className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar>{currentUser.username[0]}</Avatar>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography>{currentUser.username}</Typography>
                <Typography>{current.message}</Typography>
              </Grid>
              <Grid item>{`${moment(current.updatedAt).format('LT L')}`}</Grid>
            </Grid>
          </Paper>
        );
      })}
    </List>
  );
};
