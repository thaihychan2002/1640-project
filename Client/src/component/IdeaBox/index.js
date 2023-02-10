import React, { useState } from 'react'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme, Col, Row, Avatar, Button, Modal } from 'antd'
import '../assets/css/HomeScreen.css'
import { FileImageOutlined } from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout

export default function IdeaBox() {
  const privacyClick = (e) => {
    e.preventDefault()
    const container = document.querySelector('.container')
    const privacy = document.querySelector('.container .post .privacy')
    privacy.addEventListener('click', () => {
      container.classList.add('active')
    })
  }
  const arrowBackClick = (e) => {
    e.preventDefault()

    const container = document.querySelector('.container')
    const arrowBack = document.querySelector('.container .audience .arrow-back')
    arrowBack.addEventListener('click', () => {
      container.classList.remove('active')
    })
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    console.log('show')
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="content-container">
      <Row id="content-style" className="content-style">
        <Col span={10}>
          <Row className="row-create">
            <Col className="icon-create">
              <img src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/324846632_1180845109493400_1898232937473416056_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OeRAxQ4TIwAAX9kMi_3&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfABN2MSyBQf_bS8VD9vrPkVj9p52E3jYqfc_GZ-1gzKlg&oe=63DDAD4F" />
              <div className="idea-create" onClick={showModal}>
                &nbsp; What's on your mind?
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="container"
      >
        <div className="wrapper">
          <section className="post">
            <header>Create Post</header>
            <form action="#">
              <div className="content">
                <img
                  src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/324846632_1180845109493400_1898232937473416056_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OeRAxQ4TIwAAX9kMi_3&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfABN2MSyBQf_bS8VD9vrPkVj9p52E3jYqfc_GZ-1gzKlg&oe=63DDAD4F"
                  alt="logo"
                />
                <div className="details">
                  <p>Phat</p>
                  <div className="privacy" onClick={(e) => privacyClick(e)}>
                    <i className="fas fa-user-friends"></i>
                    <span>Departments</span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                </div>
              </div>
              <textarea
                placeholder="What's on your mind, Phat?"
                required
              ></textarea>

              <div className="options">
                <p>Add to Your Post</p>
                <ul className="list">
                  <li>
                    <FileImageOutlined />
                  </li>
                </ul>
              </div>
              <button>Post</button>
            </form>
          </section>
          <section className="audience">
            <header>
              <div className="arrow-back" onClick={(e) => arrowBackClick(e)}>
                <i className="fas fa-arrow-left"></i>
              </div>
              <p>Select Department</p>
            </header>
            <div className="content">
              <span>
                Your post will show up in News Feed, on your profile and in
                search results.
              </span>
            </div>
            <ul className="list">
              <li>
                <div className="column">
                  <div className="icon">
                    <i className="fas fa-globe-asia"></i>
                  </div>
                  <div className="details">
                    <p>Department 1</p>
                  </div>
                </div>
                <div className="radio"></div>
              </li>

              <li className="active">
                <div className="column">
                  <div className="icon">
                    <i className="fas fa-user-friends"></i>
                  </div>
                  <div className="details">
                    <p>Department 2</p>
                  </div>
                </div>
                <div className="radio"></div>
              </li>

              <li>
                <div className="column">
                  <div className="icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="details">
                    <p>Department 3</p>
                  </div>
                </div>
                <div className="radio"></div>
              </li>
              <li>
                <div className="column">
                  <div className="icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="details">
                    <p>Department 4</p>
                  </div>
                </div>
                <div className="radio"></div>
              </li>
            </ul>
          </section>
        </div>
      </Modal>
    </div>
  )
}