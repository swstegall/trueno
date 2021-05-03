import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { UserActions } from '../../../redux/reducers/User';
import MessagesList from './MessagesList';
import MessageBox from './MessageBox';
import { useAppSelector } from '../../../utilities/hooks';
import ChangePasswordDialog from './ChangePasswordDialog';
import BanUserDialog from './BanUserDialog';
import { NotificationActions } from '../../../redux/reducers/Notification';
import UnbanUserDialog from './UnbanUserDialog';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  bannedUser: {
    color: 'red',
  },
  adminUser: {
    color: 'aqua',
  },
}));

export default (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const Messages: any = useAppSelector((state: any) => state.Messages);
  const User: any = useAppSelector((state: any) => state.User);
  const Users: any = useAppSelector((state: any) => state.Users);
  const render = Messages.Loaded && Users.Loaded;
  const [passwordDialogOpen, setPasswordDialogOpen] = React.useState(false);
  const [banUserDialogOpen, setBanUserDialogOpen] = React.useState(false);
  const [unbanUserDialogOpen, setUnbanUserDialogOpen] = React.useState(false);
  const [targetUser, setTargetUser] = React.useState(undefined);

  const handlePasswordDialogOpen = () => {
    setPasswordDialogOpen(true);
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
  };

  const handleBanUserDialogOpen = (user: any) => {
    if (User.Admin) {
      if (User.ID !== user.id) {
        if (user.deletedAt === null) {
          setTargetUser(user);
          setBanUserDialogOpen(true);
        } else {
          setTargetUser(user);
          setUnbanUserDialogOpen(true);
        }
      } else {
        props.dispatch(
          NotificationActions.Open({
            Message: 'You cannot ban yourself.',
            Severity: 'warning',
          })
        );
      }
    }
  };

  const handleBanUserDialogClose = () => {
    setBanUserDialogOpen(false);
  };

  const handleUnbanUserDialogClose = () => {
    setUnbanUserDialogOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ChangePasswordDialog
        dispatch={props.dispatch}
        passwordDialogOpen={passwordDialogOpen}
        handlePasswordDialogClose={handlePasswordDialogClose}
      />
      <BanUserDialog
        dispatch={props.dispatch}
        banUserDialogOpen={banUserDialogOpen}
        handleBanUserDialogClose={handleBanUserDialogClose}
        targetUser={targetUser}
        setTargetUser={setTargetUser}
      />
      <UnbanUserDialog
        dispatch={props.dispatch}
        unbanUserDialogOpen={unbanUserDialogOpen}
        handleUnbanUserDialogClose={handleUnbanUserDialogClose}
        targetUser={targetUser}
        setTargetUser={setTargetUser}
      />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Messages
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {render &&
            Users.Active.map((user: any) => {
              if (user.admin) {
                return (
                  <ListItem
                    button={User.Admin}
                    key={`user_${user.username}`}
                    onClick={() => handleBanUserDialogOpen(user)}
                  >
                    <ListItemIcon>
                      <PersonIcon className={classes.adminUser} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.adminUser}
                        >{`${user.username}`}</Typography>
                      }
                    />
                  </ListItem>
                );
              } else if (User.Admin && user.deletedAt !== null) {
                return (
                  <ListItem
                    button={User.Admin}
                    key={`user_${user.username}`}
                    onClick={() => handleBanUserDialogOpen(user)}
                  >
                    <ListItemIcon>
                      <PersonIcon className={classes.bannedUser} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          className={classes.bannedUser}
                        >{`${user.username}`}</Typography>
                      }
                    />
                  </ListItem>
                );
              } else if (
                (!User.Admin && user.deletedAt === null) ||
                User.Admin
              ) {
                return (
                  <ListItem
                    button={User.Admin}
                    key={`user_${user.username}`}
                    onClick={() => handleBanUserDialogOpen(user)}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography>{`${user.username}`}</Typography>}
                    />
                  </ListItem>
                );
              }
              return <></>;
            })}
          <ListItem
            button
            key={'Change Password'}
            onClick={handlePasswordDialogOpen}
          >
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary={'Change Password'} />
          </ListItem>
          <ListItem
            button
            key={'Logout'}
            onClick={() => {
              props.dispatch(UserActions.Reset());
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MessagesList dispatch={props.dispatch} />
        <MessageBox dispatch={props.dispatch} />
      </main>
    </div>
  );
};
