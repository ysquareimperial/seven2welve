import React from 'react'
import { useEffect, useState } from 'react'
import { Card, Modal } from 'reactstrap'
import moment from 'moment/moment'
import { CiCircleMore } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { BiHeart, BiMessageRounded } from 'react-icons/bi'
import axios from 'axios'

function Home() {
  const navigate = useNavigate()
  const [listOfPosts, setlistOfPosts] = useState([])
  // const [comments, setComments] = useState([])
  const [singlePostData, setSinglePostData] = useState([])
  const [modal, setModal] = useState(false)
  const [likedPosts, setLikedPosts] = useState([])
  const initialValues = {
    commentBody: '',
  }
  const [form, setForm] = useState(initialValues)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const openModal = () => {
    setModal(!modal)
    setForm(initialValues)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:2023/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        commentBody: form.commentBody,
        PostId: singlePostData.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else if (data) {
          openModal()
          console.log('Sent', data)
        }
      })
      .catch((error) => {
        console.error('Error posting data:', error)
      })
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/')
    } else {
      fetch(`http://localhost:2023/posts`, {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
        .then((response) => response.json())
        .then((data) => {
          setlistOfPosts(data.listOfPosts)
          setLikedPosts(
            data.likedPosts.map((like) => {
              return like.PostId
            }),
          )
        })
        .catch((err) => console.log(err))
    }
  }, [])

  // const fetchComments = (id) => {
  //   fetch(`http://localhost:2023/comments/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setComments(data))
  //     .catch((err) => console.log(err))
  // }

  // useEffect(() => {
  //   fetchComments(2)
  // }, [])

  const likePost = (postId) => {
    axios
      .post(
        `http://localhost:2023/likes/`,
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem('accessToken') } },
      )
      .then((response) => {
        setlistOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] }
              } else {
                const likeArray = post.Likes
                likeArray.pop()
                return { ...post, Likes: likeArray }
              }
            } else {
              return post
            }
          }),
        )
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId
            }),
          )
        } else {
          setLikedPosts([...likedPosts, postId])
        }
      })
    // console.log('dddddd')
  }
  return (
    <div className="wrapper">
      <div className="p-3" style={{ marginTop: 65, marginBottom: 65 }}>
        {/* {JSON.stringify(comments)} */}
        {listOfPosts.map((item, index) => {
          return (
            <Card key={index} className="post_card mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="username m-0" onClick={()=>navigate(`/profile/${item.UserId}`)}>
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
              <div className="mt-3">
                <BiMessageRounded
                  style={{ fontSize: 20 }}
                  onClick={() => {
                    openModal()
                    setSinglePostData(item)
                  }}
                />

                <BiHeart
                  style={{ fontSize: 20, marginLeft: 10 }}
                  onClick={() => {
                    likePost(item.id)
                  }}
                  className={
                    likedPosts.includes(item.id) ? 'liked_btn' : 'un-liked_btn'
                  }
                />
                {item.Likes.length === 0 ? (
                  <span
                    className="text-white"
                    style={{ marginLeft: 5, display: 'none' }}
                  >
                    {item.Likes?.length}
                  </span>
                ) : (
                  <span className="text-white" style={{ marginLeft: 5 }}>
                    {item.Likes?.length}
                  </span>
                )}
              </div>
            </Card>
          )
        })}
      </div>
      <Modal isOpen={modal} toggle={openModal}>
        <div className="modal_div p-2">
          <form onSubmit={onSubmit}>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="username m-0">
                  {singlePostData.username}
                  <span className="post_date">
                    {' '}
                    . {moment(singlePostData.createdAt).startOf().fromNow()}
                  </span>
                </p>
              </div>
              <div className="post_content_div">
                <p className="post_title">{singlePostData.title}</p>
                <p className="m-0">{singlePostData.postText}</p>
              </div>
            </div>
            <div className="mt-3">
              <textarea
                className="post_input"
                placeholder="Write your comment!"
                autoComplete="off"
                id="inputCreatePost"
                name="commentBody"
                value={form.commentBody}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="app_primary_button mt-3"
              style={{ width: '100%' }}
            >
              Comment
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Home
