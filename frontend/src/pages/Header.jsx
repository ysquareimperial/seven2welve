import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiUser6Line } from 'react-icons/ri'
import axios from 'axios'
export default function Header() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:2023/auth/check-token`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        setUserData(response.data)
        // console.log(response.data)
      })
      .catch((err) => console.log('error fetching data', err))
  }, [])
  return (
    <div className="header">
      <div>
        <h4 className="m-0 nameee">seven2welve</h4>
      </div>
      <div
        onClick={() => {
          navigate(`/profile/${userData.id}`)
          window.location.reload()
        }}
      >
        <p className="username m-0">
          {/* {JSON.stringify(userData)} */}
          {userData?.username}{' '}
          <RiUser6Line
            className="footer_icon"
            //   onClick={logout}
            // onClick={() => navigate('/create-post')}
          />
        </p>
      </div>
    </div>
  )
}
