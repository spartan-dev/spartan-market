import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupUser } from "./api/user";
const CreateVendor = () => {
  const router = useRouter();
  const { login, auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    alertType: "",
  });
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (formData) => {
      console.log(formData);
      setLoading(true);
      const response = await signupUser(formData);

      if (response.jwt) {
        setOpenSnack({
          open: true,
          message: "Usuario Autenticado con exito",
          alertType: "success",
        });
        login(response.jwt, response.user, response.role);
        setOpen(false);
        router.push("/dashboard");
      } else {
        if (response?.errors.email === "") {
          setOpenSnack({
            open: true,
            message: response.errors.password,
            alertType: "error",
          });
        } else {
          setOpenSnack({
            open: true,
            message: response?.errors.email,
            alertType: "error",
          });
        }
      }
      setLoading(false);
    },
  });
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const handleCloseSnack = (params) => {
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
      <Grid
        item
        container
        lg={8}
        xl={8}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <FormControl
            variant="outlined"
            error={formik.errors.email}
            fullWidth
            style={{ margin: "10px 0 10px 0" }}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              error={formik.touched.email && Boolean(formik.errors.email)}
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              name="email"
              fullWidth
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.email}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            variant="outlined"
            error={formik.errors.password}
            fullWidth
            style={{ margin: "10px 0 10px 0" }}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              fullWidth
              onChange={formik.handleChange}
            />

            {formik.errors.password ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            variant="outlined"
            error={formik.errors.confirmPassword}
            fullWidth
            style={{ margin: "10px 0 10px 0" }}
          >
            <InputLabel htmlFor="confirmPassword">ConfirmPassword</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              label="ConfirmPassword"
              type="password"
              variant="outlined"
              name="confirmPassword"
              fullWidth
              onChange={formik.handleChange}
            />

            {formik.errors.confirmPassword ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.confirmPassword}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button color="primary">Crear Vendedor</Button>
        </form>
        <Snackbar
          open={openSnack.open}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={openSnack.alertType}>
            {openSnack.message}
          </Alert>
        </Snackbar>
      </Grid>
    </Container>
  );
};

export default CreateVendor;

function initialValues() {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
}

const validationSchema = {
  email: Yup.string().email("No es un email Valido").required(true),
  password: Yup.string().required("El password es requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Los Passwords no coinciden")
    .required("Los Passwords no coinciden"),
};
