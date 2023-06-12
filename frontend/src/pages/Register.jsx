import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
function Register() {
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)
  const initialValues = {
    email: '',
    username: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().min(3).required('Email is required'),
    username: Yup.string().min(3).max(15).required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  const onSubmit = (data) => {
    fetch('http://localhost:2023/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          navigate('/feed')
        }
        console.log('Sent', data)
      })
      .catch((error) => {
        console.error('Error posting data:', error)
      })
    console.log(data)
  }

  return (
    <div className="wrapper">
      <div
        className="p-3"
        style={
          {
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // height:'100vh'
            // width:'100%'
          }
        }
      >
        <div className="text-center mt-5 mb-5">
          <h1 className="m-0 nameee">seven2welve</h1>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <h3 className="app_title m-0">Register</h3>
            <span className="app_label">
              Already have an account?{' '}
              <b
                style={{ fontWeight: 'bold', color: 'rgb(21, 148, 117)' }}
                onClick={() => navigate('/')}
              >
                Login here
              </b>
            </span>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <label className="app_label">Email</label>
              <div>
                <Field
                  className="post_input"
                  autoComplete="off"
                  id="inputCreatePost"
                  name="email"
                />
                <div>
                  <ErrorMessage name="email" component="span" />
                </div>
              </div>
              <label className="app_label">Username</label>
              <div>
                <Field
                  className="post_input"
                  autoComplete="off"
                  id="inputCreatePost"
                  name="username"
                />
                <div>
                  <ErrorMessage name="username" component="span" />
                </div>
              </div>
              <label className="app_label">Password</label>
              <div>
                <Field
                  className="post_input"
                  autoComplete="off"
                  id="inputCreatePost"
                  name="password"
                  type="password"
                />
                <div>
                  <ErrorMessage name="password" component="span" />
                </div>
              </div>
              <button
                type="submit"
                className="app_primary_button mt-3"
                style={{ width: '100%' }}
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Register
