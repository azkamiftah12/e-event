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

import { ReactNode, useEffect, useState } from "react";
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
import LinksGroup from "@/components/NavbarLinksGroup";
import { handleLogout } from "@/pages/Login";
import Link from 'next/link';

export const ipaddress = "http://8.222.186.80:8081/";
// export const headerauthorization = 'Authorization: localStorage.getItem('token'),';
export const headerauthorization = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
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
          label: `Validasi Pelatihan ${datavalidasipelatihan?.length ?? 0}`,
          link: "/internal/validasipelatihan",
        },
        { label: "Batch", link: "/internal/batch" },
        { label: "Pelatihan Ditolak", link: "/internal/pelatihanditolak" },
        { label: "Pelatihan Selesai", link: "/internal/pelatihanend" },
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
      textDecoration: 'none',
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
            style={{ backgroundColor: "#3F2661", border: "none" }}
          >
            <Group position="apart" sx={{ height: "100%" }}>
              {/* ini responsive sidebar start */}
              <MediaQuery largerThan="sm" styles={{ display: 'none', justifyContent: 'flex-end' }}>
                 <Burger
                   opened={opened}
                   onClick={() => setOpened((o) => !o)}
                   size="sm"
                   color={theme.colors.gray[6]}
                   mr="xl"
                   />
              </MediaQuery>
              {/* ini responsive sidebar end */}
              <Group sx={{ height: "100%", [theme.fn.smallerThan("sm")]: {
          // display: "none",
        }, }}>
                <Text
                  tt="uppercase"
                  size="xl"
                  fw={750}
                  style={{ color: "#e7b622" }}>
                  E-Event
                </Text>
              </Group>
              <Group sx={{ height: "100%", [theme.fn.smallerThan("sm")]: {
          // display: "none",
        }, }}>
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
                  })}>
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
              width={{ sm: 200, lg: 250 }}>
              <Grid>
                <Grid.Col span={12}>
                  <Button
                    component={Link}
                    href="/"
                    color="pink.9"
                    radius="md"
                    size="md"
                    fullWidth>
                    <Text size="lg">Home</Text>
                  </Button>
                </Grid.Col>
              </Grid>
              <Space h="xl" />

              <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                
                {/* dashboard button clickable start  */}
                <Link href="/admin" className={classes.control}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon variant="light" size={30}>
                      <IconGauge size={18} />
                    </ThemeIcon>
                    <Box ml="md">Dashboard</Box>
                  </Box>
                </Link>
                {/* dashboard button clickable End  */}

                {/* new button start  */}
                <div>{links}</div>
                {/* new button end  */}

                {/* old button start  */}
                {/* Old button put here  */}
                {/* old button end  */}
              </Navbar.Section>
            </Navbar>
          </ScrollArea>
        }
        //navbar side end
        // navbar footer start
        footer={
          <Footer
            height={50}
            p="md"
            style={{ backgroundColor: "#3F2661", margin: 0, border: "none" }}
          >
            <Text ta="center" size="xs" fw={100} color="white">
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
