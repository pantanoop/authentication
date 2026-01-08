import React from "react";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, addCurrentUser } from "../redux/authenticateSlice";

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

const RegistrationSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(1, "Password is required"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.authenticator.users);
  const authState = useSelector((state) => state.authenticator.isAuthenticated);
  console.log("AUTH STATE:", authState);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegister = (data) => {
    const existingUser = users.some((u) => u.email === data.email);

    if (existingUser) {
      setError("email", {
        type: "manual",
        message: "Email already registered",
      });
      return;
    }

    dispatch(addUser(data));
    dispatch(addCurrentUser({ email: data.email, password: data.password }));

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <>
      <Card variant="outlined" sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
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
                type="password"
                label="Password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </Box>

        <Typography variant="body2" align="center" mt={2}>
          Existing User?{" "}
          <Link component={RouterLink} to="/" underline="hover">
            Login
          </Link>
        </Typography>
      </Card>

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
          User successfully registered 🎉
        </Alert>
      </Snackbar>
    </>
  );
}

export default Register;
