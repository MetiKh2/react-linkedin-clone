import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import LeftSide from './LeftSide'
import Main from './Main'
import RightSide from './RightSide'
import { connect } from 'react-redux'
import {Navigate}from 'react-router'
const Home = ({user}) => {
  return (
    <Container>
      {!user&&<Navigate to={'/'}/>}
        <Section>
            <h5>
                <Link to={'/'}>
                    Writing in a hurry? -
                </Link>
            </h5>
            <p>   Find talented pros in record time with Upwork and keep business
          moving.</p>
        </Section>
        <Layout>
            <LeftSide/>
            <Main/>
            <RightSide/>
        </Layout>
    </Container>
  )
}
const mapStateToProps=(state)=>{
  return{
      user:state.userState.user
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
  }
}
const Container=styled.div`
padding-top: 52px;
max-width: 100%;
`;
const Section=styled.div`
min-height: 50px;
padding: 16px 0;
text-align: center;
box-sizing: content-box;
text-decoration: underline;
display: flex;
justify-content: center;
h5{
    color: #0a66c2;
    font-size: 14px;
    a{
        font-weight: 700;
    }
}
p{
    font-size: 14px;
    font-weight: 600;
    color: #434649;
}
@media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
}
`;
const Content=styled.div`
max-width: 1128px;
margin-left: auto;
margin-right: auto;
`;
const Layout=styled.div`
display: grid;
grid-template-areas: "leftside main rightside";
grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
export default connect(mapStateToProps,mapDispatchToProps)(Home)
