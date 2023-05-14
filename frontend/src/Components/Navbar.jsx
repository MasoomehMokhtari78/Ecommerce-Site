import React from 'react'
import styled from 'styled-components'
// import {Badge} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
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

export default function Navbar() {
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
                    <Logo>SHOP</Logo>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <MenuItem>
                        {/* <Badge badgeContent={4} color="primary"></Badge> */}
                        <ShoppingCartOutlinedIcon />
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
