import React, { useEffect, useState } from "react";
import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  ThemeIcon,
  Box,
  rem,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

// Utility function to check if a cookie exists
function checkCookieExists(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return true;
    }
  }
  return false;
}

// Utility function to remove a cookie
function removeCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const useStyles = createStyles((theme) => ({
  // Your existing styles
  // ...
}));

const HeaderMenu = () => {
  const { classes, theme } = useStyles();
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const exists = checkCookieExists("token");
    setTokenExists(exists);
  }, []);

  const handleLogout = () => {
    removeCookie("nama_user");
    removeCookie("username");
    removeCookie("token");
    setTokenExists(false);

    window.location.href = "/";
  };

  return (
    <Box>
      <Header
        height={75}
        px="md"
        style={{ backgroundColor: "#3F2661", margin: -5, border: "none" }}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          {/* Title and links */}
          <Group sx={{ height: "100%" }} className={classes.hiddenMobile}>
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/latihan" className={classes.link}>
              Pelatihan
            </a>
            <a href="/pelatihanku" className={classes.link}>
              Pelatihan Saya
            </a>
          </Group>

          {/* Conditional rendering based on token existence */}
          {!tokenExists && (
            <Group className={classes.hiddenMobile}>
              <Button
                component="a"
                href="/Login"
                styles={(theme) => ({
                  root: {
                    display: "none",
                  },
                })}
              >
                Log In
              </Button>
            </Group>
          )}

          {/* Logout button */}
          {tokenExists && (
            <Group className={classes.hiddenMobile}>
              <Button
                onClick={handleLogout}
                styles={(theme) => ({
                  root: {
                    backgroundColor: "#E0DAD1",
                    color: "#3F2661",
                    height: rem(32),
                    fontWeight: "bold",
                    paddingLeft: rem(20),
                    paddingRight: rem(20),
                    "&:not([data-disabled])": theme.fn.hover({
                      backgroundColor: "#e7b622",
                      color: theme.fn.darken("#3F2661", 0.15),
                    }),
                  },
                })}
              >
                Log Out
              </Button>
            </Group>
          )}
        </Group>
      </Header>
    </Box>
  );
};

export default HeaderMenu;
