import { AppBar, Toolbar, Typography, ThemeProvider, List, ListItem} from "@mui/material";
import theme from "./Theme";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const rightLinks = [
    { title: 'login', path: '/login', loggedIn: false},
    { title: 'register', path: '/register', loggedIn: false},
    { title: 'profile', path: '/profile', loggedIn: true},
    { title: 'home', path: '/', loggedIn: false},
    { title: 'all users', path: '/all-users', loggedIn: true},
    { title: 'verification', path: '/for-verification', loggedIn: true}
]


const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

function Header() {
  const authContext = useContext(AuthContext);
  const links = rightLinks.filter(link=> (link.loggedIn && authContext.loggedIn) || (!link.loggedIn && !authContext.loggedIn));

  return (
    <ThemeProvider theme={theme}>
    <AppBar position='static'  sx={{ mb: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component={NavLink}
                        to='/'
                        sx={navStyles}
                    >
          WEB-STORE
        </Typography>
        <List sx={{ display: 'flex' }}>
                    {links.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                {authContext.loggedIn && (
                  <ListItem
                  onClick={authContext.onLogout}
                  sx={{color: 'inherit', typography: 'h6', cursor: 'pointer'}}>
                    LOGOUT
                  </ListItem>
                )}
        </List>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header;
