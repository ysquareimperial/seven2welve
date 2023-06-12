import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
function Login() {
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)
  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  const onSubmit = (data) => {
    fetch('http://localhost:2023/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          localStorage.setItem('accessToken', data)
          navigate('/feed')
        }
        console.log(data)
      })
      .catch((error) => {
        console.error('Error posting data:', error)
      })
    // console.log(data)
  }

  return (
    <div className="wrapper">
      {/* {JSON.stringify()} */}
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
            <h3 className="app_title m-0">Login</h3>
            <span className="app_label">
              Don't have an account?{' '}
              <b
                style={{ fontWeight: 'bold', color: 'rgb(21, 148, 117)' }}
                onClick={() => navigate('/register')}
              >
                Register here
              </b>
            </span>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
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
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
