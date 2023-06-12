import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BiArrowBack, BiTrash } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Modal } from 'reactstrap'
function Post() {
  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const openModal = () => {
    setModal(!modal)
  }
  const openModal1 = () => {
    setModal1(!modal1)
  }
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  let { id } = useParams()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/')
    } else {
      fetch(`http://localhost:2023/posts/byId/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data))
        .catch((err) => console.log(err))

      fetch(`http://localhost:2023/comments/${id}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((err) => console.log(err))
    }
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:2023/auth/check-token`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        setUserData(response.data)
        console.log(response.data)
      })
      .catch((err) => console.log('error fetching data', err))
  }, [])

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:2023/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id
          }),
        )
      })
  }

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:2023/posts/${id}`, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then(() => navigate('/feed'))
  }
  return (
    <div className="wrapper">
      {/* {JSON.stringify(userData)} */}
      <div className="p-3 mb-5 " style={{ marginTop: 65, marginBottom: 65 }}>
        <div
          className="mb-3 d-flex justify-content-even align-items-center mb-3"
          style={{ gap: 20 }}
        >
          <BiArrowBack
            style={{ color: 'white', fontSize: 25 }}
            onClick={() => navigate(-1)}
          />{' '}
          <h5 className="app_title m-0">Post</h5>
        </div>

        {/* ///////////////////post section///////////////////// */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="username m-0 text-white">
              @{post.username}
              <span className="post_date">
                {' '}
                . {moment(post.createdAt).startOf().fromNow()}
              </span>
            </p>
          </div>
          <div>
            {userData?.username === post.username ? (
              <BiTrash
                style={{ color: 'white', fontSize: 25 }}
                onClick={() => {
                  openModal1()
                  // deletePost(post.id)
                }}
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="post_content_div mb-5">
          <p className="post_title">{post.title}</p>
          <p className="m-0 text-white">{post.postText}</p>
        </div>

        {/* ///////////////////comments section///////////////////// */}
        <h6 className="app_title">Comments</h6>
        {/* {JSON.stringify(comments)} */}
        {comments.map((item, index) => (
          <>
            <Card key={index} className="post_card mb-2 p-2">
              {/* <div key={index} className="comments_div"> */}
              <div className="d-flex justify-content-between align-items-center">
                <p className="m-0 text-white">
                  <b className="text-secondary">@{item.username}</b>
                </p>
                {userData?.username === item?.username && (
                  // {/* <BiTrash onClick={() => deleteComment(item.id)} /> */}
                  <BiTrash onClick={() => openModal()} />
                )}
              </div>
              <p className="m-0 text-white">{item.commentBody}</p>
              <span className="m-0 post_date">
                {moment(item.createdAt).startOf().fromNow()}
              </span>
              {/* </div> */}
            </Card>
            <Modal isOpen={modal} toggle={openModal}>
              <div className="modal_div p-3">
                <p className="m-0">
                  <b>Delete this comment?</b>
                </p>
                <p>{item.commentBody}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="app_primary_button"
                    onClick={() => {
                      openModal()
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="app_delete_button"
                    onClick={() => {
                      deleteComment(item.id)
                      openModal()
                    }}
                  >
                    Deleted
                  </button>
                </div>
              </div>
            </Modal>
          </>
        ))}
        {comments.length === 0 ? (
          <p className="text-secondary">No comments</p>
        ) : (
          ''
        )}

        <Modal isOpen={modal1} toggle={openModal1}>
          <div className="modal_div p-3">
            <p className="m-0">
              <b>Delete this post?</b>
            </p>
            <p>{post.title}</p>
            <div className="d-flex justify-content-between">
              <button
                className="app_primary_button"
                onClick={() => {
                  openModal1()
                }}
              >
                Cancel
              </button>
              <button
                className="app_delete_button"
                onClick={() => {
                  deletePost(post.id)
                  openModal1()
                }}
              >
                Deleted
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Post
