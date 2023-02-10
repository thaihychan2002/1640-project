import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import '../assets/css/Navigation.css'
import { Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
const { Header, Content, Footer, Sider } = Layout

export default function Navigation() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider
      className="sider-style"
      breakpoint="lg"
      collapsedWidth="80"
      onBreakpoint={(broken) => {
        console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type)
      }}
    >
      <Menu
        className="menu-style"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[
          UserOutlined,
          VideoCameraOutlined,
          UploadOutlined,
          UserOutlined,
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: `nav ${index + 1}`,
        }))}
      />
    </Sider>
  )
}
