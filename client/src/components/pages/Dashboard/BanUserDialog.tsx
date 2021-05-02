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
    props.handleBanUserDialogClose();
  };

  const submit = () => {
    props.dispatch(UsersActions.Ban(props.targetUser.id, User.Token));
    clearAndClose();
  };

  return (
    <div>
      <Dialog
        open={props.banUserDialogOpen}
        onClose={clearAndClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle id="form-dialog-title">Ban User</DialogTitle>
        <DialogContent>
          <DialogContentText id="form-dialog-description">
            Are you sure you want to ban this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Ban User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
