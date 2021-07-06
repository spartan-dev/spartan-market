import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { Container, makeStyles, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProducLand from "../assets/kriger.jpeg";
import TextField from "@material-ui/core/TextField";
import { FormModal } from "../components/Modal";
import { CreateForm } from "../components/Forms";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3rem",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonera: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "2em",
    padding: "0 2em",
  },
}));
const CreateProducts = () => {
  const classes = useStyles();
  return (
    <Container
      maxWidth="xl"
      component="div"
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Typography
        component="div"
        style={{ backgroundColor: "#cfe8fc", height: "80vh" }}
      >
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xl={8} xs={12} sm={8} style={{ paddingTop: "5em" }}>
              <Paper className={classes.paper}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <article>
                    <Image
                      src={ProducLand}
                      alt="Landscape for products"
                      width={300}
                      height={300}
                    />
                  </article>
                  <div>
                    <div>
                      <Typography variant="h3" gutterBottom>
                        Crea tu producto
                      </Typography>
                    </div>
                    <Typography variant="subtitle2" gutterBottom>
                      Organiza de manera profesional tu inventario
                    </Typography>

                    {/* bottonera */}
                    <Grid className={classes.buttonera}>
                      <Grid item xs={12} md={6} lg={4} xl={6}>
                        <a href="*">Conoce mas</a>
                      </Grid>
                      <Grid item xs={12} md={6} lg={8} xl={6}>
                        <FormModal
                          title={"crear productos"}
                          text={
                            "crea tu producto llenando el formulario de datos como precio, cantidad y SKU"
                          }
                          cancelButton={"cerrar"}
                          openButton={"Crear Producto"}
                        >
                          <CreateForm />
                        </FormModal>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Typography>
    </Container>
  );
};

export default CreateProducts;
