import React from 'react'
import { MdAdd } from 'react-icons/md'
import { GoHome } from 'react-icons/go'
import { AiOutlineBell } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
// import { RiUser6Line } from 'react-icons/ri'
import { BsPower } from 'react-icons/bs'

export default function Footer() {
  const navigate = useNavigate()
  const logout = () => {
    alert('Are you sure you want to logout?')
    localStorage.removeItem('accessToken')
    navigate('/')
  }
  return (
    <div className="footer">
      <GoHome className="footer_icon" onClick={() => navigate('/feed')} />
      <MdAdd className="footer_icon" onClick={() => navigate('/create-post')} />
      {/* <RiUser6Line className="footer_icon" onClick={() => navigate('')} /> */}
      <AiOutlineBell
        className="footer_icon"
        // onClick={() => navigate('')}
      />
      <BsPower
        className="footer_icon"
        onClick={logout}
        // onClick={() => navigate('/create-post')}
      />
    </div>
  )
}
