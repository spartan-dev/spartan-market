import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Container, makeStyles, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ProductCard } from "../Card";
import { getAllProducts } from "../../pages/api/products";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3rem",
  },
}));
const Products = () => {
  const [allproducts, setProducts] = useState();
  useEffect(() => {
    (async function () {
      const products = await getAllProducts();
      console.log(products.allProducts);
      setProducts(products.allProducts);
    })();
  }, []);
  const classes = useStyles();
  console.log(allproducts);
  return (
    <Container
      maxWidth="xl"
      component="div"
      direction="row"
      justify="center"
      alignItems="center"
    >
      <h1>Todos tus productos</h1>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container item xl={12} spacing={8}>
          {allproducts?.map((item) => {
            return (
              <Grid
                direction="row"
                justify="center"
                alignItems="center"
                key={item._id}
                xl={12}
                item
                spacing={8}
              >
                <ProductCard
                  name={item.name}
                  sku={item.sku}
                  price={item.price}
                  qty={item.qty}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;

/* export function getStaticProps(context) {
  const response = getAllProducts();

  return {
    props: { products: response },
  };
} */
