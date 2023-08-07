import { AppBar, Toolbar, Typography, ThemeProvider, List, ListItem} from "@mui/material";
import theme from "./Theme";
import { NavLink } from "react-router-dom";

const rightLinks = [
    { title: 'login', path: '/login'},
    { title: 'register', path: '/register'}
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
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header;
