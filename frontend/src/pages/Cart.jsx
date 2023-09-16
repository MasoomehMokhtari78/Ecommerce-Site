import { Add, Remove } from '@mui/icons-material';
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from "../redux/cartSlice"
const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    margin: 10px;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"}; //?
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const Hr = styled.hr`
    font-size: 30px;
    font-weight: 200;
`
const Summary = styled.div`
    flex: 1;
    border-radius: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`
const RemoveButton = styled.button`

    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    margin-right: 10px;
    &:hover{
        background-color: #f8f4f4;
    }
`

export default function Cart() {
    const cart = useSelector(state => state.cart).cart;
    var total = 0;
    for ( const i in cart){
        total = total + (cart[i].price * cart[i].quantity)
    }
    const dispatch = useDispatch()
    const handleRemove = (index) => {
        dispatch(removeFromCart(cart[index]))
    }
  return (
    <Container>
        <Navbar></Navbar>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton><Link to='/'>CONTINUE SHOPPING</Link> </TopButton>
                <TopTexts>
                    <TopText>Shopping Bag({cart.length})</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                
            </Top>
            <Bottom>
                <Info>
                    {
                    cart.map((item, index) => (
                        <Product>
                            <ProductDetail>
                                <Image src={item.img}></Image>
                                <Details>
                                    <ProductName>
                                        <b>Product:</b> {item.title}
                                    </ProductName>
                                    <ProductId>
                                        <b>ID:</b> {item.id}
                                    </ProductId>
                                    <ProductColor color={item.color} />
                                    <ProductSize>
                                        <b>Size:</b> {item.size}
                                    </ProductSize>
                                    <ProductSize>
                                        <b>Quantity:</b> {item.quantity}
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <RemoveButton onClick={() => handleRemove(index)}>Remove Item</RemoveButton>
                                <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                            </PriceDetail>
                            <Hr />
                        </Product>
                    ))}
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText type="total">Total</SummaryItemText>
                        <SummaryItemPrice>$ {total}</SummaryItemPrice>
                    </SummaryItem>
                    <Button>CHECKOUT NOW</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}
