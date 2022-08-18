import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../utills/data";
import { mobile } from "../utills/responsive";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: oldlace; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${({ slideIndex }) => slideIndex * -100}vw);
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => `#` + bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  /* left: ${(props) => props.direction === "left" && "10px"}; */
  left: ${({ direction }) => direction === "left" && "10px"};
  right: ${({ direction }) => direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 80px;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  // console.log(sliderItems.length);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((slide) => {
          return (
            <Slide bg={slide.bg} key={slide.id}>
              <ImgContainer>
                <Image src={slide.img} />
              </ImgContainer>

              <InfoContainer>
                <Title>{slide.title}</Title>
                <Desc>{slide.desc}</Desc>

                <Button>SHOW MORE</Button>
              </InfoContainer>
            </Slide>
          );
        })}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
