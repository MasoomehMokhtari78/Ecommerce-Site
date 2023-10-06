import { Add, Remove } from '@mui/icons-material';
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {addToCart} from "../redux/cartSlice"
const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    flex-wrap: wrap;
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 70vh;
    height: 70vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    &:focus {
        background: red;
    }
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    margin: 5vh;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
      background-color: #f8f4f4;
    }
`

export default function Product() {
    const location = useLocation()
    const array = location.pathname.split("/"); 
    const id = array.pop();

    //find the item with id
    const product = useSelector(state => state.products.products.find(
       (item) => {
        return item.id == id;
       } 
    ));
    
    const [info, setInfo] = useState({
        "id": product.id,
        "title": product.title,
        "img": product.img,
        "color": null,
        "size": product.size['1'],
        "price": product.price,
        "quantity": 1,
    });

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(addToCart(info))
    }
    //changing one colors style and chainging back others
    const handleColor = (color) => {
        const element = document.getElementById(color)
        //changing the color value in state
        setInfo({...info, ["color"] : element.id})
        
        let sibling = element.parentNode.firstChild;

        while(sibling) {
            if(sibling.tagName==="DIV"){
                if(sibling.id === color){
                    sibling.style.padding = "5px"
                    sibling.style.opacity = "100%"
                    sibling.style.borderStyle = "solid"
                    
                }else{
                    sibling.style.padding = "0px"
                    sibling.style.opacity = "50%"
                    sibling.style.borderStyle = "none"
                }
            }
            sibling = sibling.nextSibling;
        }
    }

    const handleSelect = (value) => {
        setInfo({...info, ["size"] : value})
    }
    const handleRemove = () => {
        setInfo({...info, 
                ["quantity"] : info.quantity - 1 ,
                ["price"] : info.price - product.price
            })
    }
    const handleAdd = () => {
        setInfo({...info, 
                ["quantity"] : info.quantity + 1 ,
                ["price"] : info.price + product.price
            })
    }
  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
                    iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
                    tristique tortor pretium ut. Curabitur elit justo, consequat id
                    condimentum ac, volutpat ornare.
                </Desc>
                <Price>{`${info.price} $`}</Price>
            </InfoContainer>
            <FilterContainer>
                <Filter>
                    <FilterTitle>Color</FilterTitle>
                    {
                        Object.values(product.color).map(item => (
                            <FilterColor color={item} id={item} onClick={() =>handleColor(item)}></FilterColor>
                          ))}
                </Filter>
                <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize 
                        onChange={(e) => handleSelect(e.currentTarget.value)}>
                    {
                        Object.values(product.size).map(item => (
                    <FilterSizeOption value={item}>{item}</FilterSizeOption>
                          ))}
                    </FilterSize>
                </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                    <Remove onClick={handleRemove}/>
                    <Amount>{info.quantity}</Amount>
                    <Add onClick={handleAdd}/>
                </AmountContainer>
                {/* if color is not selected, don't allow add to cart */}
                <Button disabled={info.color === null} onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
        </Wrapper>
        <Footer></Footer>
    </Container>
  )
}

