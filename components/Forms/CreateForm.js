import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../pages/api/products";
const useStyles = makeStyles((theme) => ({
  inputSpace: {
    margin: "10px 10px",
  },
  input: {
    display: "none",
  },
}));

const CreateProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    alertType: "",
  });
  const classes = useStyles();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      const form = new FormData();
      for (let item in values) {
        form.append(item, values[item]);
      }

      const response = await createProduct(form);
      console.log(response);
      if (response.product) {
        setOpenSnack({
          open: true,
          message: response.message,
          alertType: "success",
        });
      }
      if (response.errors) {
        let toShow = Object.values(response.errors).filter(
          (message) => !message == ""
        );
        toShow.map((error) => {
          return setOpenSnack({
            open: true,
            message: error,
            alertType: "error",
          });
        });
      }
    },
  });
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSnack({ open: false, mesage: "" });
      return;
    }
    setOpenSnack({ open: false, mesage: "" });
  };
  return (
    <Container
      maxWidth="xl"
      component="div"
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid>
        <form action="" onSubmit={formik.handleSubmit}>
          <FormControl
            className={classes.inputSpace}
            variant="outlined"
            error={formik.errors.name}
          >
            <InputLabel>Nombre</InputLabel>
            <OutlinedInput
              id="name"
              label="Nombre"
              type="text"
              variant="outlined"
              name="name"
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <FormHelperText id="component-error-text" error>
                Nombre es requerido
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            className={classes.inputSpace}
            variant="outlined"
            error={formik.errors.price}
          >
            <InputLabel>Precio</InputLabel>
            <OutlinedInput
              id="price"
              label="Precio"
              type="text"
              variant="outlined"
              name="price"
              onChange={formik.handleChange}
            />
            {formik.errors.price ? (
              <FormHelperText id="component-error-text" error>
                El precio es requerido
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            className={classes.inputSpace}
            variant="outlined"
            error={formik.errors.sku}
          >
            <InputLabel>SKU</InputLabel>
            <OutlinedInput
              id="sku"
              label="SKU"
              type="text"
              variant="outlined"
              name="sku"
              onChange={formik.handleChange}
            />
            {formik.errors.sku ? (
              <FormHelperText id="component-error-text" error>
                El SKU es requerido
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            className={classes.inputSpace}
            variant="outlined"
            error={formik.errors.qty}
          >
            <InputLabel>Cantidad</InputLabel>
            <OutlinedInput
              id="qty"
              label="Cantidad"
              type="text"
              variant="outlined"
              name="qty"
              onChange={formik.handleChange}
            />
            {formik.errors.qty ? (
              <FormHelperText id="component-error-text" error>
                La Cantidad debe ser numerica
              </FormHelperText>
            ) : null}
          </FormControl>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            name="image"
            type="file"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Grid container justify="center" alignItems="center">
            <Button variant="contained" color="primary" type="submit">
              Crear producto
            </Button>
          </Grid>
        </form>
      </Grid>
      <Snackbar
        open={openSnack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={openSnack.alertType}>
          {openSnack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateProductForm;

const initialValues = (params) => {
  return {
    name: "",
    sku: "",
    price: "",
    qty: 0,
    image: null,
  };
};

const validationSchema = {
  name: Yup.string().required(true),
  sku: Yup.string().required(true),
  price: Yup.string().required(true),
  qty: Yup.number().required(true),
  image: Yup.mixed(),
};
