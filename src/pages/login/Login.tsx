import { Link, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authentication/operation";
import { selectAuthenticated } from "../../store/authentication/slice";
import { AppDispatch, useSelector } from "../../store/configstore";

export default function SignIn() {
  const error = useSelector((state) => state.authentication.error);
  const isLoggedIn = useSelector(selectAuthenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("username"),
      password: data.get("password"),
    };
    dispatch(loginUser(user));
  };

  if (isLoggedIn) {
    navigate("/dashboard");
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        Height: "100vh",
        maxHeight: "100vh",
        backgroundColor: "#EDF1F7",
      }}
    >
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          boxSizing: "border-box",
          border: "none !important",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EDF1F7",
          }}
        >
          <img
            src="src/assets/background_login.svg"
            alt="Your Image"
            style={{
              maxWidth: "100%",
              maxHeight: "100vh",
              objectFit: "fill",
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={4} sx={{ backgroundColor: "#EDF1F7" }}>
        <Paper
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "none !important",
            backgroundColor: "#EDF1F7",
          }}
        >
          <Stack
            component="main"
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              // justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EDF1F7",
              flexDirection: "row",
              padding: "0 20px",
            }}
          >
            <Box
              sx={{
                width: "450px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#ffffff",
                padding: "20px",
              }}
            >
              <Typography component="h1" variant="h5">
                Đăng nhập
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Tài khoản"
                  name="username"
                  autoComplete="Username"
                  autoFocus
                  size="medium"
                  error={Boolean(error)}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(error)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Ghi nhớ mật khẩu "
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 1,
                    backgroundColor: "#0D7F44",
                    height: "40px",
                  }}
                >
                  Đăng nhập
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Quên mật khẩu
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
