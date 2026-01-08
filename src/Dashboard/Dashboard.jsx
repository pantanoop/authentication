import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../redux/authenticateSlice";

import { Button, Box, Typography } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CurrentUserName = useSelector(
    (state) => state.authenticator.currentUser?.email?.split("@")[0]
  );

  function handleLogout() {
    dispatch(removeCurrentUser());
    navigate("/");
    console.log("User logged out");
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Welcome to the site {CurrentUserName}
      </Typography>

      <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
}

export default Dashboard;
