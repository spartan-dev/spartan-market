import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import shirt from "../../assets/pirate.jpeg";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const ProductCard = ({ name, sku, price, qty }) => {
  const classes = useStyles();

  const ImageComponent = (imagePath, alt) => {
    return <Image src={imagePath} alt={alt} />;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={ImageComponent()}
          title="Contemplative Reptile"
        />
        {/*           <Image src={shirt} alt="Picture of the author" />
         */}{" "}
        {/*  </CardMedia> */}
        {/*  <Image src={shirt} alt="" /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Nombre: {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            Identificador: {sku}
            <Typography gutterBottom variant="h5" component="p">
              precio unitario: {price}
            </Typography>
            <Typography gutterBottom variant="h5" component="p">
              Cantidad: {qty}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
