import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCurrentUser } from "../redux/authenticateSlice";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";

const LoginSchema = z.object({
  email: z.string().email("must be a valid email"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.authenticator.users);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log("users:", users);
  const authState = useSelector((state) => state.authenticator.isAuthenticated);
  console.log("AUTH STATE:", authState);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      dispatch(addCurrentUser({ email: data.email, password: data.password }));

      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } else {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 4, minWidth: 350 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>

        <Typography variant="body2" align="center">
          New User?{" "}
          <Link component={RouterLink} to="/register" underline="hover">
            Register
          </Link>
        </Typography>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            User successfully Login 🎉
          </Alert>
        </Snackbar>
      </Box>
    </Card>
  );
}

export default Login;
