import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { teal } from '@material-ui/core/colors';
import { UserActions } from '../../redux/reducers/User';
import { Form, Field } from 'react-final-form';
import * as yup from 'yup';
import { setIn } from 'final-form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const validateFormValues = (schema: any) => async (values: any) => {
  if (typeof schema === 'function') {
    schema = schema();
  }
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});
    return errors;
  }
};

const validate = validateFormValues(validationSchema);

export default (props: any) => {
  const classes = useStyles();
  
  const onSubmit = async (values: any) => {
    await props.dispatch(UserActions.Login(values.username, values.password));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{ username: '', password: '' }}
          validate={validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="username"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        variant="outlined"
                        fullWidth
                        label="Username"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    render={({ input }) => (
                      <TextField
                        {...input}
                        variant="outlined"
                        fullWidth
                        label="Password"
                        type="password"
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
                disabled={submitting || pristine}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link style={{ color: `${teal[500]}` }} to="/createUser">
                    Create User
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        ></Form>
      </div>
    </Container>
  );
};
