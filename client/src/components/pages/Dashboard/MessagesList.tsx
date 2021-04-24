import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

export default () => {
  const classes = useStyles();
  const Messages: any = useSelector((state: any) => state.Messages);
  const Users: any = useSelector((state: any) => state.Users);
  return (
    <List className={classes.root}>
      {Messages.map((current: any, i: number) => {
        const currentUser = Users.find((u: any) => u.id === current.userId);
        return (
          <>
            <ListItem key={`messsage_${current.id}`} alignItems="flex-start">
              <ListItemText
                primary={`${currentUser.username}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {`${current.message}`}
                    </Typography>
                    {` - ${moment(current.updatedAt).format('LT L')}`}
                  </>
                }
              />
            </ListItem>
            {i !== Messages.length - 1 ? (
              <Divider variant="inset" component="li" />
            ) : null}
          </>
        );
      })}
    </List>
  );
};
