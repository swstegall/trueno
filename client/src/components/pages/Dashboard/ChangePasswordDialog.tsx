import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NotificationActions } from '../../../redux/reducers/Notification';
import { UserActions } from '../../../redux/reducers/User';
import { useAppSelector } from '../../../utilities/hooks';

export default (props: any) => {
  const User: any = useAppSelector((state: any) => state.User);
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const clearAndClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    props.handlePasswordDialogClose();
  };

  const submit = () => {
    if (newPassword === '' || confirmPassword === '') {
      props.dispatch(
        NotificationActions.Open({
          Message: 'Both password fields need to be filled.',
          Severity: 'error',
        })
      );
    } else if (newPassword !== confirmPassword) {
      props.dispatch(
        NotificationActions.Open({
          Message: 'Both fields need to contain the same password.',
          Severity: 'error',
        })
      );
    } else {
      props.dispatch(UserActions.ChangePassword(newPassword, User.Token));
    }
  };

  return (
    <div>
      <Dialog
        open={props.passwordDialogOpen}
        onClose={clearAndClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-description">
            Enter and confirm a new password to change the password for your
            account. You will be logged out, and must login with your new
            password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
