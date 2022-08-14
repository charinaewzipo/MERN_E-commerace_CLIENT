import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../utills/data";
import ProductItem from "./ProductItem";
import axios from "axios";
const Container = styled.div`
  padding: 20px;
  /* width: 100%; */

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `/products?category=${cat}` : `/products/random`
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setfilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setfilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else
      setfilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
  }, [sort]);
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => {
            return <ProductItem key={item.id} item={item} />;
          })
        : products.slice(0, 8).map((item) => {
            return <ProductItem key={item.id} item={item} />;
          })}
    </Container>
  );
};

export default Products;
