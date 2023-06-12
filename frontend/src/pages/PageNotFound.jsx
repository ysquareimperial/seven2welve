import React from 'react'
import { useNavigate } from 'react-router-dom'
function PageNotFound() {
  const navigate = useNavigate()

  return (
    <div className="wrapper">
      <div
        className="p-3"
        style={{
          //   marginTop: 65,
          //   marginBottom: 65,
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <h4 className="m-0 nameee">Page Not Found</h4>
          <p className="text-white">
            Go to the home{' '}
            <b
              style={{ color: 'rgb(21, 148, 117)' }}
              onClick={() => navigate('/feed')}
            >
              page
            </b>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
