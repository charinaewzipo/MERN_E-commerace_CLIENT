import { Announcement } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Container = styled.div`
  margin: 0;
  padding: 0;
`;
const Home = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
