import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { useAuth } from "../../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//validaciones
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });
  console.log(auth);
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
                <div>
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </article>
          </section>
        </div>
      </div>
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
