import {useState} from 'react';
import {Button, Container, createStyles, Group, Header, Menu, Text, UnstyledButton} from '@mantine/core';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {ChevronDown, Logout, Menu2, User,} from 'tabler-icons-react';
import useAuth from '../../hooks/useAuth';
import {ColorSchemeToggle} from "../color-scheme-toggle";
import {Role} from "../../types";
import Divider = Menu.Divider;

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  logo: {
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    fontWeight: 'bold',
  },

  linkLabel: {
    marginRight: 5,
  },

  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

export function Navbar() {
  const {classes, cx} = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  }

  return (
    <Header height={56}>
      <Container size={"lg"}>
        <div className={classes.inner}>
          <Group>
            <Text className={classes.logo} color={'dark'} underline={false} component={NavLink} to={"/"}>
              Suphotel
            </Text>

            <NavLink to={"/bookings"}
                     className={`${classes.link} ${location.pathname.includes('bookings') ? classes.linkActive : ''}`}>
              Bookings
            </NavLink>

            {user?.role === Role.ADMIN && (
              <NavLink to={"/dashboard"}
                       className={`${classes.link} ${location.pathname.includes('dashboard') ? classes.linkActive : ''}`}>
                Dashboard
              </NavLink>
            )}
          </Group>

          <Group>
            <ColorSchemeToggle/>

            {user ? (
              <Menu
                width={150}
                position={"bottom-end"}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                  >
                    <Group spacing={7} className={classes.burger}>
                      <Menu2/>
                    </Group>
                    <Group spacing={7} className={classes.userMenu}>
                      <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                        {user.pseudo}
                      </Text>
                      <ChevronDown size={12}/>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<User size={14}/>} onClick={() => navigate('/profile')}>Profile</Menu.Item>

                  <Divider/>

                  <Menu.Item icon={<Logout size={14}/>} onClick={handleLogout}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button variant={"outline"} component={NavLink} to="/auth/login">Login</Button>
                <Button component={NavLink} to="/auth/register">Register</Button>
              </>
            )}
          </Group>
        </div>
      </Container>
    </Header>
  );
}