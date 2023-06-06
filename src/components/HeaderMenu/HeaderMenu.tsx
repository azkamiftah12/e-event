import { handleLogout } from "@/pages/logout";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Flip, Slide, ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";

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
const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];



const notifysuccess = () => {
  toast.success('success', {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
    theme: "dark",
    });
};
const notifyerror = () => {
  toast.error('error', {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
    theme: "dark",
    });
};
const notifywarning = () => {
  toast.warn('warning', {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
    theme: "dark",
    });
};

export default function HeaderMenu() {
  const { classes, theme } = useStyles();

  {
    /* EDIT ICON */
  }
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} radius="md" style={{ backgroundColor: "#E0DAD1" }}>
          <item.icon size={rem(20)} style={{ color: "#e14658" }} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

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
            <Button onClick={notifysuccess}>notify success</Button>
            <Button onClick={notifyerror}>notify error</Button>
            <Button onClick={notifywarning}>notify warning</Button>
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
