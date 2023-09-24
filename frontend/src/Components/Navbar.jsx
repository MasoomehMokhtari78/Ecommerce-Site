import React, { useState} from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from '@mui/icons-material';
  import Badge from '@mui/material/Badge';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
const Container = styled.div`
    height: 80px;
    background-color: black;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:  space-between;
    color:white;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    /* color: white; */

    @media screen and (max-width: 600px) {
        display: none;
      }
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    padding: 5px;
    margin-left: 25px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    @media screen and (max-width: 600px) {
        display: none;
      }

`
const Input = styled.input`
    border: none;
    border-radius: 5px;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin: 12px;
    @media screen and (max-width: 600px) {
        display: none;
      }

`
const StyledLink  = styled(Link)`
    text-decoration: none;
    color: White;
`;

export default function Navbar() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    //get the number of items in cart
    const cartCount = Object.keys(useSelector(state => state.cart)).length
    const favCount = useSelector(state => state.user.favoriteProducts).length
    console.log(favCount)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const handleLogout = useCallback(
        () => {
            
            dispatch(logout())
        },[isLoggedIn]
  )
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search"></Input>
                        <SearchOutlined/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo><StyledLink  to='/'>SHOP</StyledLink></Logo>
                </Center>
                <Right>
                    { isLoggedIn ? null: <MenuItem><StyledLink to='/register'>REGISTER</StyledLink></MenuItem>}
                    { isLoggedIn ? null: <MenuItem><StyledLink to='/login'>LOGIN</StyledLink></MenuItem>}
                    { isLoggedIn ? <MenuItem onClick={handleLogout}><StyledLink>LOGOUT</StyledLink></MenuItem>: null}
                    <MenuItem>
                        <Badge badgeContent={cartCount + 1} color="primary">
                            <StyledLink  to='/cart'>
                                <ShoppingCartOutlined />
                            </StyledLink>
                        </Badge>
                        
                    </MenuItem>
                    <MenuItem>
                        <Badge badgeContent={favCount} color="primary">
                            <StyledLink  to='/cart'>
                            <FavoriteBorderOutlined />
                            </StyledLink>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
