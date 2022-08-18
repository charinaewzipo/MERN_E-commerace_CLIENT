import {
  Facebook,
  Instagram,
  Mail,
  MailOutline,
  Payment,
  Phone,
  Room,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../utills/responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${({ color }) => "#" + color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const ContactItem = styled.div`
  margin: 20px 0px;
`;
const PaymentImg = styled.img``;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>CHARIN</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          molestias, autem numquam optio eveniet enim a provident tenetur unde?
          Aut deserunt at tempora! Commodi, consequuntur sunt rem illum facilis
          debitis.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <YouTube />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room /> Thailand bangkok
        </ContactItem>
        <ContactItem>
          <Phone /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline /> charin@dev.co.th
        </ContactItem>
        <PaymentImg src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
