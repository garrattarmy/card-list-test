import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" gutterBottom align="center">
        Product List
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.imageUrl}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {product.description}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    container
                    direction="column"
                    alignItems="flex-end"
                  >
                    <Typography variant="h5" color="text.primary">
                      ${product.price}
                    </Typography>
                    <IconButton onClick={() => handleDelete(product.id)}>
                      <DeleteIcon
                        color="error"
                        aria-label="Delete"
                        style={{
                          fontSize: 30,
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
