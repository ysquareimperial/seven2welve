import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
function PostCreate() {
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)
  const initialValues = {
    title: '',
    postText: '',
    // username: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    postText: Yup.string().required('Content is required'),
    // username: Yup.string().min(3).max(15).required('Username is required'),
  })

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/')
    }
  }, [])

  const onSubmit = (data) => {
    fetch('http://localhost:2023/posts', {
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
      <div className="p-3" style={{ marginTop: 65, marginBottom: 65 }}>
        <h3 className="app_title">Create Post</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label className="app_label">Title</label>
            <div>
              <Field
                className="post_input"
                autoComplete="off"
                id="inputCreatePost"
                name="title"
              />
              <div>
                <ErrorMessage name="title" component="span" />
              </div>
            </div>

            <label className="app_label">Content</label>
            <div>
              <Field
                className="post_input"
                autoComplete="off"
                id="inputCreatePost"
                name="postText"
              />
              <div>
                <ErrorMessage name="postText" component="span" />
              </div>
            </div>

            {/* <label className="app_label">Username</label>
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
            </div> */}

            <button
              type="submit"
              className="app_primary_button mt-3"
              style={{ width: '100%' }}
            >
              Create post
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default PostCreate
