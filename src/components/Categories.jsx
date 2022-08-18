import React from "react";
import styled from "styled-components";
import { categories } from "../utills/data";
import { mobile } from "../utills/responsive";
import CategoryItem from "./CategoryItem";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0", flexDirection: "column" })}
`;
const Categories = () => {
  return (
    <Container>
      {categories.map((item) => {
        return <CategoryItem key={item.id} item={item} />;
      })}
    </Container>
  );
};

export default Categories;
