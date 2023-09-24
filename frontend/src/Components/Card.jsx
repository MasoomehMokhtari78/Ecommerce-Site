import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    // flex: 1;
    margin: 3px;
    height: 50vh;
    width: 50vh;
    position: relative;
    &:hover .img{
        opacity: 50%;
    }
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0; //?
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.div`
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: 'Courier New', Courier, monospace;
`
const StyledLink  = styled(Link)`
    text-decoration: none;
    color: White;
`;

export default function Card({item}) {
    
  return (
    <Container>
        <StyledLink to={`/${item.id}`}>
        <Image className='img' src={item.img}></Image>
        <Info>
            <Title>{item.title}</Title>
            {/* <Button><StyledLink  
                        to={`products/${item.title}`}
                        state={{ category: item.title }}
                        >SHOP NOW</StyledLink></Button> */}
        </Info>
        </StyledLink>
    </Container>
  )
}
