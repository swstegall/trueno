import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { newMessage } from '../../../utilities/ajax';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
  })
);

export default (props: any) => {
  const [message, setMessage] = React.useState('');
  const [render, setRender] = React.useState(true);
  const User: any = useSelector((state: any) => state.User);
  const classes = useStyles();

  const handleSubmit = (event: any) => {
    if (event.key === 'Enter') {
      setRender(false);
      newMessage(message, User.Token, props.dispatch);
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
