import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BiCalendar, BiHeart, BiMessageRounded } from 'react-icons/bi'
import { CiCircleMore } from 'react-icons/ci'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from 'reactstrap'

export default function Profile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [userData, setUserData] = useState('')
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
    fetch(`http://localhost:2023/auth/basic-info/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data)
        console.log(data)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:2023/posts/byUserId/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserPosts(data)
        console.log(data)
      })
  }, [])
  return (
    <div className="wrapper">
      {/* {JSON.stringify(userPosts)} */}
      <div className="p-3" style={{ marginTop: 65, marginBottom: 65 }}>
        {/* <h3 className="app_title">Profile</h3> */}
        <div className="user_data_div">
          <p className="email">{userData.email}</p>
          <p className="username_">@{userData.username}</p>

          <p className="joined">
            <BiCalendar size="1.5rem" /> Joined{' '}
            {moment(userData.createdAt).format('MMMM, YYYY')}
          </p>
        </div>

        {userPosts.map((item, index) => {
          return (
            <Card key={index} className="post_card mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="username m-0">
                  @{item.username}
                  <span className="post_date">
                    {' '}
                    . {moment(item.createdAt).startOf().fromNow()}
                  </span>
                </p>
                <CiCircleMore
                  className="footer_icon"
                  style={{ fontSize: 30 }}
                  onClick={() => navigate(`/post/${item.id}`)}
                />
              </div>
              <div className="post_content_div">
                <p className="post_title">{item.title}</p>
                <p className="m-0">{item.postText}</p>
              </div>
            </Card>
          )
        })}
        {userPosts.length === 0 ? (
          <p className="text-secondary text-center mt-5">No post created yet.</p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
