import React, { useRef, useContext } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { Col, Row, Modal } from 'antd'
import { Store } from "../../Store";
import '../assets/css/HomeScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, showModal, createPosts } from '../../redux/actions'
import FileBase64 from 'react-file-base64'
import { departmentsState$, modalState$ } from '../../redux/seclectors';
import Department from '../DepartmentList/Department/index.js'
import * as actions from '../../redux/actions';

export default function IdeaBox() {
  const dispatch = useDispatch();
  const departments = useSelector(departmentsState$);
  React.useEffect(() => { dispatch(actions.getDepartments.getDepartmentsRequest()); }, [dispatch]);
  const departmentref = useRef(null)
  const { isShow } = useSelector(modalState$);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [data, setdata] = React.useState({
    title: '',
    author: '',
    content: '',
    department: '',
    categories: '',
    attachment: '',
  })
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
  const departget = (e) => {
    e.preventDefault();
    data.department = departmentref.current.value;
  }
  const holder = "what's on your mind " + userInfo.fullName + "?"
  const handleOk = React.useCallback(() => {
    dispatch(hideModal())
  }, [dispatch]);
  const viewModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  const onSubmit = React.useCallback(() => {
    dispatch(createPosts.createPostsRequest(data));
    handleOk();
  }, [data, dispatch, handleOk]);
  return (
    <div className="content-container">
      <Row id="content-style" className="content-style">
        <Col span={10}>
          <Row className="row-create">
            <Col className="icon-create">
              <img src={data.attachment} alt='logo' />
              <div className="idea-create" onClick={viewModal}>
                &nbsp; What's on your mind?
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        open={isShow}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        className="container"
      >
        <div className="wrapper">
          <section className="post">
            <header>Create Post</header>
            <form noValidate autoComplete='false' >
              <div className="content">
                <img
                  src={data.attachment}
                  alt="logo"
                />
                <div className="details">
                  <p>{userInfo.fullName}</p>
                  <div className="privacy" onClick={(e) => privacyClick(e)}>
                    <i className="fas fa-user-friends"></i>
                    <span>Departments</span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                </div>
              </div>
              <TextField required label='Title' value={data.title} onChange={(e) => setdata({ ...data, title: e.target.value, author: userInfo.fullName })} ></TextField>
              <textarea value={data.content} onChange={(e) => setdata({ ...data, content: e.target.value })}
                placeholder={holder}
                required
              />
              <div className="options">
                <ul className="list">
                  <FileBase64 accept='image/*' multiple={false} type='file' value={data.attachment} onDone={({ base64 }) => setdata({ ...data, attachment: base64 })} />
                </ul>
              </div>
              <Button variant='contained' className='button' fullWidth onClick={onSubmit}>Post</Button>
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
            <select onChange={departget} ref={departmentref} >
              <option>Select department</option>
              {departments.map((department) => (
                <option>
                  <Grid item xs={12} sm={12}>
                    <Department key={department._id} department={department} />
                  </Grid>
                </option>
              ))}
            </select>
          </section>
        </div>
      </Modal>
    </div>
  )
}