import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;

    &:hover .img{
        opacity: 50%;
    }
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media screen and (max-width: 600px) {
        height: 20vh;
    }
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
    color: Black;
    font-weight: bold;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    cursor: pointer;
    font-weight: 600;
`
const StyledLink  = styled(Link)`
    text-decoration: none;
    color: Black;
`;

export default function CategoryItem({item}) {
  return (
    <Container>
        <Image className='img' src={item.img}></Image>
        <Info>
            <Title>{item.title}</Title>
            <StyledLink  
                        to={`products/${item.title}`}
                        state={{ category: item.title }}
                        ><Button>SHOP NOW</Button>
            </StyledLink>
        </Info>
    </Container>
  )
}
