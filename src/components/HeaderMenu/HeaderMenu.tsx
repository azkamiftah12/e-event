import { handleLogout } from "@/pages/logout";
import { createStyles, Header, Group, Button, Box, rem } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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

//get token from cookies start
const token = Cookies.get("token");
//get token from cookies end

// EDIT WARNA TEXT
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: "#E0DAD1",
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(40),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    //HOVER NAVBAR//
    ...theme.fn.hover({
      backgroundColor: "#e7b622",
      color: "#3F2661",
    }),
  },

  title: {
    color: "#E0DAD1",
    fontSize: "27px",
    fontWeight: 700,
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    //HOVER DI FEATURES//
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: "#3F2661",
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

//ICON DI FEATURES//

export default function HeaderMenu() {
  const { classes, theme } = useStyles();
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const exists = checkCookieExists("token");
    setTokenExists(exists);
  }, []);

  {
    /* EDIT ICON */
  }

  // NAVBAR //
  return (
    <Box>
      <Header
        height={75}
        px="md"
        style={{ backgroundColor: "#3F2661", margin: -5, border: "none" }}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          {/* <Text component="a" href="/" className={classes.title}>
          E-Event Certificate
          </Text> */}
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
          <Group className={classes.hiddenMobile}>
            {/* Conditional rendering based on token existence */}
            {!tokenExists && (
              <Group className={classes.hiddenMobile}>
                <Button
                  component="a"
                  href="/Login"
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
        </Group>
      </Header>

      {/* ANIMATION */}
      {/* <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer> */}
    </Box>
  );
}
