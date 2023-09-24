import React from 'react'
import Navbar from '../Components/Navbar'
import NewProducts from '../Components/NewProducts'
import Categories from '../Components/Categories'
import Footer from "../Components/Footer";
import styled from "styled-components";
import Slider from '../Components/Slider';
const Container = styled.div`
  overflow: hidden;
`
const Section = styled.h2`
  /* font-family: 'Courier New', Courier, monospace; */
  margin: 10px;
`
const Hr = styled.hr`
  border: 1px solid;
  margin: 10px;
`
function Home() {
  return (
    <Container>
        <Navbar></Navbar>
        {/* <Slider></Slider> */}
        <Section>Categories</Section>
        <Hr></Hr>
        <Categories></Categories>
        <Section>New Products</Section>
        <Hr></Hr>
        <NewProducts></NewProducts>
        <Footer></Footer>
    </Container>
  )
}

export default Home