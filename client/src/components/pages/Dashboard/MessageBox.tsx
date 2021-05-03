import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAppSelector } from '../../../utilities/hooks';
import { MessageActions } from '../../../redux/reducers/Messages';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        height: '100%',
      },
    },
  })
);

export default (props: any) => {
  const [message, setMessage] = React.useState('');
  const [render, setRender] = React.useState(true);
  const User: any = useAppSelector((state: any) => state.User);
  const classes = useStyles();

  const handleSubmit = (event: any) => {
    if (event.key === 'Enter') {
      setRender(false);
      props.dispatch(MessageActions.Create(message, User.Token));
      setMessage('');
      setRender(true);
    }
  };

  return (
    <>
      {render && (
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onKeyPress={handleSubmit}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>
      )}
    </>
  );
};
