import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import { useAppSelector } from '../../../utilities/hooks';
import { MessageActions } from '../../../redux/reducers/Messages';

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
    margin: {
      margin: theme.spacing(1),
    },
    buttonRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    bannedMessage: {
      color: 'red',
    },
  })
);

export default (props: any) => {
  const classes = useStyles();
  const Messages: any = useAppSelector((state: any) => state.Messages);
  const Users: any = useAppSelector((state: any) => state.Users);
  const User: any = useAppSelector((state: any) => state.User);
  const render = Messages.Loaded && Users.Loaded;

  const removeMessage = (message: any) => {
    if (User.Admin) {
      props.dispatch(MessageActions.Remove(message.id, User.Token));
    }
  };

  const restoreMessage = (message: any) => {
    props.dispatch(MessageActions.Restore(message.id, User.Token));
  };

  return (
    <>
      {render && (
        <List className={classes.root}>
          {Messages.Active.map((current: any, i: number) => {
            const currentUser = Users.Active.find(
              (u: any) => u.id === current.userId
            );
            if (current.deletedAt === null) {
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
                    <Grid item>
                      <div>{`${moment(current.updatedAt).format('LT L')}`}</div>
                      {User.Admin && (
                        <div className={classes.buttonRow}>
                          <IconButton
                            onClick={() => removeMessage(current)}
                            aria-label="delete"
                            size="small"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              );
            } else if (User.Admin && current.deletedAt !== null) {
              return (
                <Paper key={`message_${current.id}`} className={classes.paper}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar>
                        {currentUser.username[0]}
                      </Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography className={classes.bannedMessage}>
                        {currentUser.username}
                      </Typography>
                      <Typography className={classes.bannedMessage}>
                        {current.message}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <div className={classes.bannedMessage}>{`${moment(
                        current.updatedAt
                      ).format('LT L')}`}</div>
                      {User.Admin && (
                        <div className={classes.buttonRow}>
                          <IconButton
                            onClick={() => restoreMessage(current)}
                            aria-label="delete"
                            size="small"
                          >
                            <ReplayIcon
                              className={classes.bannedMessage}
                              fontSize="inherit"
                            />
                          </IconButton>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              );
            }
            return <></>;
          })}
        </List>
      )}
    </>
  );
};
