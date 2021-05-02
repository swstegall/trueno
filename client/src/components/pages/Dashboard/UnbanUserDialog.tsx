import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UsersActions } from '../../../redux/reducers/Users';
import { useAppSelector } from '../../../utilities/hooks';

export default (props: any) => {
  const User: any = useAppSelector((state: any) => state.User);

  const clearAndClose = () => {
    props.setTargetUser(undefined);
    props.handleUnbanUserDialogClose();
  };

  const submit = () => {
    props.dispatch(UsersActions.Unban(props.targetUser.id, User.Token));
    clearAndClose();
  };

  return (
    <div>
      <Dialog
        open={props.unbanUserDialogOpen}
        onClose={clearAndClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle id="form-dialog-title">Unban User</DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-description">
            Are you sure you want to unban this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Unban User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
