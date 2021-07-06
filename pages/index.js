import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { loginUser } from "../pages/api/user";

//validaciones
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const router = useRouter();
  const { login, auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    alertType: "",
  });
  /*   useEffect(() => {
    if (auth) {
      router.push("/dashboard");
    }
  }); */
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginUser(formData);

      if (response.jwt) {
        setOpenSnack({
          open: true,
          message: "Usuario Autenticado con exito",
          alertType: "success",
        });
        login(response.jwt, response.user, response.role);

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
    if (reason === "clickaway") {
      setOpenSnack({ open: false, mesage: "" });
      return;
    }
    setOpenSnack({ open: false, mesage: "" });
  };
  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <div className={styles.signbox}>
          <section className={styles.logsection}>
            <article className={styles.articlebox}>
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
              <h2>Spartan Market Place</h2>
            </article>
            <article className={styles.articlebox}>
              <form
                className={styles.form}
                action=""
                onSubmit={formik.handleSubmit}
              >
                <FormControl variant="outlined" error={formik.errors.email}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    id="email"
                    label="Email"
                    type="text"
                    variant="outlined"
                    name="email"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <FormHelperText id="component-error-text" error>
                      Email is required
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl variant="outlined" error={formik.errors.password}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <FormHelperText id="component-error-text" error>
                      Password is required
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <div className={styles.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    Login
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={styles.buttonProgress}
                    />
                  )}
                </div>
              </form>
            </article>
          </section>
        </div>
      </div>
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
    </section>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

const validationSchema = {
  email: Yup.string().email(true).required(true),
  password: Yup.string().required(true),
};
