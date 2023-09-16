import React, { useState} from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
// import {Badge} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
const Container = styled.div`
    height: 80px;
    background-color: black;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
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
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    padding: 5px;
    margin-left: 25px;
    display: flex;
    align-items: center;
    border-radius: 5px;

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
    margin-left: 25px;

`
const StyledLink  = styled(Link)`
    text-decoration: none;
    color: White;
`;

export default function Navbar() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
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
                        <SearchOutlinedIcon/>
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
                        {/* <Badge badgeContent={4} color="primary"></Badge> */}
                        <StyledLink  to='/cart'><ShoppingCartOutlinedIcon /></StyledLink>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
