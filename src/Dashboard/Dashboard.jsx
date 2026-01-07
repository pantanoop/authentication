
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();
  // const currentUser = localStorage.getItem("current-user");
  // let user = currentUser.toUpperCase(currentUser)
  
  function handleLogout() {
    navigate('/');
    console.log('User logged out');
  }
  return (<div>Welcome to the site 
  <br>
  </br>
   <Button variant="contained" onClick={handleLogout}>
  Log Out
</Button>

  </div>);
}


export default Dashboard;