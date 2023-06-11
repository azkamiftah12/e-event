import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  createStyles,
  Space,
  Grid,
  ScrollArea,
  ThemeIcon,
  Box,
  Badge,
  Flex,
  Group,
  rem,
} from "@mantine/core";

import { useEffect, useState } from "react";
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { LinksGroup } from "./NavbarLinksGroup";
import { handleLogout } from "../pages/logout";
import { headerauthorization, ipaddress } from "./layout";

// export const ipaddress = "http://192.168.43.38:8081/";
// // export const headerauthorization = 'Authorization: localStorage.getItem('token'),';
// export const headerauthorization = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     Authorization: "",
//   },
// };

export default function LayoutPenyelenggara({ children }) {
  const theme = useMantineTheme();

  // badge function untuk hitung total data START
  const [datavalidasipelatihan, setDatavalidasipelatihan] = useState([]);

  const getDatavalidasipelatihan = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanvalidasi`,
      headerauthorization
    );
    setDatavalidasipelatihan(response.data.data);
    console.log(response.data.data);
  };
  //get token from cookies start
  const token = Cookies.get("token");
  //get token from cookies end
  const totalvalidasiPelatihan = datavalidasipelatihan?.length ?? 0;
  // badge function untuk hitung total data END

  useEffect(() => {
    headerauthorization.headers.Authorization = token ?? "";
    getDatavalidasipelatihan();
    console.log(totalvalidasiPelatihan);
  }, []);

  // scrolldown menu start
  const [opened, setOpened] = useState(false);
  const mockdata = [
    {
      label: "Internal",
      icon: IconNotes,
      initiallyOpened: false,
      links: [
        { label: "Pelatihan", link: "/internal/pelatihan" },
        {
          label: `Validasi Pelatihan${(
            <>
              <Badge color="pink" variant="light">
                Jumlah: {totalvalidasiPelatihan.toString()}
              </Badge>
            </>
          )}`,
          link: "/internal/validasipelatihan",
        },
        { label: "Batch", link: "/internal/batch" },
      ],
    },
    {
      label: "Manajemen",
      icon: IconAdjustments,
      links: [
        { label: "Provinsi", link: "/manajemen/provinsi" },
        { label: "Kabupaten", link: "/manajemen/kabupaten" },
        { label: "Jenis Pekerjaan", link: "/manajemen/jenispekerjaan" },
        { label: "Jenis Pelatihan", link: "/manajemen/jenispelatihan" },
        { label: "Narasumber", link: "/manajemen/narasumber" },
        { label: "User", link: "/manajemen/user" },
      ],
    },
  ];
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  // scrolldown menu end

  // Dashboard clickable button start
  const useStyles = createStyles((theme) => ({
    control: {
      fontWeight: 800,
      display: "block",
      width: "100%",
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.md,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },

      ...theme.fn.hover({
        backgroundColor: "#e7b622",
        color: "#3F2661",
      }),

      hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
          display: "none",
        },
      },
    },
  }));
  const { classes } = useStyles();
  // Dashboard clickable button end

  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        // navbar head start
        header={
          <Header
            height={75}
            px="md"
            style={{ backgroundColor: "#3F2661", margin: 0, border: "none" }}
          >
            <Group position="apart" sx={{ height: "100%" }}>
              {/* <MediaQuery largerThan="sm" styles={{ display: 'none', justifyContent: 'flex-end' }}>
                   <Burger
                     opened={opened}
                     onClick={() => setOpened((o) => !o)}
                     size="sm"
                     color={theme.colors.gray[6]}
                     mr="xl"
                   />
              </MediaQuery>
                   <MediaQuery largerThan="sm" styles={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                   </MediaQuery> */}
              <Group sx={{ height: "100%" }} className={classes.hiddenMobile}>
                <Text
                  tt="uppercase"
                  size="xl"
                  fw={750}
                  style={{ color: "#e7b622" }}
                >
                  E-Event
                </Text>
              </Group>
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
            </Group>
          </Header>
        }
        // navbar head end
        // navbar side start
        navbar={
          <ScrollArea>
            <Navbar
              p="xs"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 250 }}
            >
              <Grid>
                <Grid.Col span={12}>
                  <Button
                    component="a"
                    href="/"
                    color="pink.9"
                    radius="md"
                    size="md"
                    fullWidth
                  >
                    <Text size="lg" color="gray.0">
                      Home
                    </Text>
                  </Button>
                </Grid.Col>
              </Grid>
              <Space h="xl" />

              <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                {/* dashboard button clickable start  */}
                <Text<"a">
                  component="a"
                  className={classes.control}
                  href="/penyelenggara"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon variant="light" size={30}>
                      <IconGauge size={18} />
                    </ThemeIcon>
                    <Box ml="md">Dashboard</Box>
                  </Box>
                </Text>

                <Text<"a">
                  component="a"
                  className={classes.control}
                  href="/penyelenggara/managepelatihan"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon variant="light" size={30}>
                      <IconGauge size={18} />
                    </ThemeIcon>
                    <Box ml="md">Pelatihanku</Box>
                  </Box>
                </Text>
              </Navbar.Section>
            </Navbar>
          </ScrollArea>
        }
        //navbar side end
        // navbar footer start
        footer={
          <Footer height={60} p="md">
            <Text ta="center" size="xs" fw={100}>
              E-Event @Copyright TI-CCIT 6
            </Text>
          </Footer>
        }
        //navbar footer end
      >
        <div>{children}</div>
      </AppShell>
    </>
  );
}
