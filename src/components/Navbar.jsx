import { Badge } from "@material-ui/core";
import {
  AddAPhoto,
  AddAPhotoOutlined,
  CardTravel,
  Home,
  HomeOutlined,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
import { mobile } from "../utills/responsive.js";
const Container = styled.div`
  height: 60px;
  z-index: 1;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "5px" })}
`;

const Input = styled.input`
  border: none;
  cursor: not-allowed;
  ${mobile({ width: "30px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 40%;
  ${mobile({ marginLeft: "0%", padding: "5px", fontSize: "10px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 3, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const LogoutButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-left: 10px;
  ${mobile({ padding: "5px 5px", marginLeft: "5px" })}
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () => {
    dispatch(logout());
    await axios.get(`${process.env.REACT_APP_API}/auths/logout`, {
      withCredentials: true,
    });
    navigate("/login");
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Logo>
                <HomeOutlined style={{ fontSize: 30 }} />
                HomePage
              </Logo>
            </Link>
          </Center>
          <Right>
            {currentUser ? (
              <>
                <AddAPhotoOutlined
                  onClick={() => setOpen(true)}
                  style={{ fontSize: 30, margin: "10px" }}
                />
                {currentUser.username}
                <LogoutButton onClick={handlelogout}>Logout</LogoutButton>
              </>
            ) : (
              <>
                <Link to="/register">
                  <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem>SIGN IN</MenuItem>
                </Link>
              </>
            )}
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
