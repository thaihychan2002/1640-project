import React from 'react'
import { Container } from '@material-ui/core'
import Header from '../component/header'
import PostList from '../component/PostList'
import Navigation from '../component/Navigation/Navigation'
import { Grid } from '@material-ui/core'
import Accountmanage from'../component/Account/AccountSwitch';
export default function HomePage() {
  return (
    <Container maxWidth='100vw' className='{}'>
      <Header></Header>
      <Grid container spacing={2} alignItems='stretch'>
        <Grid item xs={2} sm={2}>
          <Navigation></Navigation>
        </Grid>
        <Grid item xs={7} sm={7}>
          <PostList></PostList>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Accountmanage></Accountmanage>
        </Grid>
      </Grid>
    </Container>
  )
}
