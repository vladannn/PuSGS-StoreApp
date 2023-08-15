import { AppBar, Toolbar, Typography, ThemeProvider, List, ListItem} from "@mui/material";
import theme from "./Theme";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const rightLinks = [
    { title: 'login', path: '/login', loggedIn: false},
    { title: 'register', path: '/register', loggedIn: false},
    { title: 'home', path: '/', loggedIn: false}
]

const adminLinks = [
  { title: 'all users', path: '/all-users', loggedIn: true},
  { title: 'verification', path: '/for-verification', loggedIn: true},
  { title: 'profile', path: '/profile', loggedIn: true}
]

const sellerLinks = [
  { title: 'add product', path: '/add-product', loggedIn: true},
  { title: 'profile', path: '/profile', loggedIn: true},
  { title: 'my products', path: '/get-my-products', loggedIn: true},
]

const buyerLinks = [
  { title: 'products', path: '/products', loggedIn: true},
  { title: 'profile', path: '/profile', loggedIn: true},
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
  //const links = rightLinks.filter(link=> (link.loggedIn && authContext.loggedIn) || (!link.loggedIn && !authContext.loggedIn));

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
        {!authContext.loggedIn && <List sx={{ display: 'flex' }}>
                    {rightLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
        </List>
        }     
        {
          authContext.loggedIn && authContext.onUserType()==="Administrator" && <List sx={{ display: 'flex' }}>
          {adminLinks.map(({ title, path }) => (
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
        }

        {
          authContext.loggedIn && authContext.onUserType()==="Seller" && <List sx={{ display: 'flex' }}>
          {sellerLinks.map(({ title, path }) => (
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
        }
        {
          authContext.loggedIn && authContext.onUserType()==="Buyer" && <List sx={{ display: 'flex' }}>
          {buyerLinks.map(({ title, path }) => (
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
        }
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header;
