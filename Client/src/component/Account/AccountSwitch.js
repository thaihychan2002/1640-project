import React from 'react'
import { Row, Col } from 'antd'
import '../assets/css/AccountSwitch.css'
export default function AccountSwitch() {
  return (
    <Col className="account-switch">
      <Row>
        <Col lg={24} md={18}>
          <Row>
            <Col lg={10} md={6} className="img-switch">
              <img src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/324846632_1180845109493400_1898232937473416056_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OeRAxQ4TIwAAX9kMi_3&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfABN2MSyBQf_bS8VD9vrPkVj9p52E3jYqfc_GZ-1gzKlg&oe=63DDAD4F" />
            </Col>
            <div className="info-switch">
              <Col lg={10} md={10} className="account-info">
                <span>Phat</span>
              </Col>
              <Col lg={4} md={2}>
                <span className="switch">Switch</span>
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}
