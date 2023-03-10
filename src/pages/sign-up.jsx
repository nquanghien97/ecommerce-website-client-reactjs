import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/User/user.actions';
import { Link } from 'react-router-dom';
import { CircularProgress, Container, Grid, Typography, Box, TextField, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  wrapper: {
    backgroundColor: '#ffffff',
    padding: '24px 0',
    height: '80%',
    borderRadius: '5px',
    marginTop: '80px',
  },
  left: {
    backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    '@media (max-width:960px)' : {
      display: 'none'
    }
  },
  formContainer: {
    padding: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  signin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

function SignUp() {

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.isLoading)
  const errorMessage = useSelector(state => state.user.message_register)

  const [textErr, setTextErr] = useState();

  useEffect(() => {
    setTextErr(errorMessage)
    return () => {
      setTextErr('')
    }
  },[errorMessage])
  
  const handleSubmit = (values)=> {
    try {
      dispatch(register(values.email, values.password, values.fullName))
      // navigate('/')
    }
    catch(error) {
      console.log(error)
  }
  }

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };


  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Tr?????ng n??y l?? b???t bu???c'),
    email: Yup.string()
      .required('Tr?????ng n??y l?? b???t bu???c'),
    password: Yup.string()
      .required('Tr?????ng n??y l?? b???t bu???c'),
    confirmPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
  });

  return (
    <Container className={classes.container} maxWidth='xl'>
      <Grid container className={classes.wrapper}>
        <Grid item xs={false} md={6} className={classes.left}></Grid>
        <Grid item xs={12} md={6} className={classes.formContainer}>
          <Typography variant="h2" style={{margin: '20px 0', textAlign: 'center'}}>????ng k??</Typography>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <Box className={classes.form}>
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      name="fullName"
                      label="H??? t??n"
                      onChange={props.handleChange('fullName')}
                      helperText={props.errors.fullName}
                    />
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      type="email"
                      name="email"
                      label="Email"
                      onChange={props.handleChange('email')}
                      helperText={props.errors.email}
                    />
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      name="password"
                      type="password"
                      label="M???t kh???u"
                      onChange={props.handleChange('password')}
                      helperText={props.errors.password}
                    />
                    <Field
                      as={TextField}
                      style={{margin: '12px 0'}}
                      variant="outlined"
                      name="confirmPassword"
                      type="password"
                      label="X??c nh???n m???t kh???u"
                      onChange={props.handleChange('confirmPassword')}
                      helperText={props.errors.confirmPassword}
                    />
                  </Box>
                  {textErr ? (
                    <div style={{textAlign: 'center', marginBottom: '16px', color: 'red'}}>
                      <p>{textErr}</p>
                    </div>
                  ) : null}
                  <Box style={{margin: '20px 0'}}>
                    <Button fullWidth variant="contained" color="primary" type="submit" style={{padding: '12px', fontSize: '20px'}}>
                      {loading ? <CircularProgress color="inherit" style={{marginRight:'8px', width:'20px', height:'20px'}} /> : null}
                      ????ng k??
                    </Button>
                  </Box>
                  <Box className={classes.signin}>
                    <Typography>B???n ???? c?? t??i kho???n?</Typography>
                    <Link to='/sign-in'>
                      <Typography style={{color: 'blue', marginLeft: '8px'}}>
                        ????ng nh???p
                      </Typography>
                    </Link>
                </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignUp