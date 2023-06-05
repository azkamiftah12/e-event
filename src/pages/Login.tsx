import axios, { AxiosError } from "axios";
import { SyntheticEvent, useState } from "react";
import {
  Notification,
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Space,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons";
import { SHA256 } from "crypto-js";
// import { cookies } from 'next/headers';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { ipaddress } from "../components/layout";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import FooterMenu from "../components/FooterMenu/FooterMenu";
import { handleLogout } from "./logout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [errorlogin, seterrorlogin] = useState(null);

  //notification gagal start
  const [showNotificationdelete, setShowNotificationdelete] = useState(false);
  const handleCloseNotificationdelete = () => {
    setShowNotificationdelete(false);
  };
  //notification gagal end

  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  //login start
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to your backend API
      const response = await axios.post(
        `${ipaddress}login`,
        { username, password },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response, "resp login");

      if (response.status === 200 && !response.data.error) {
        // Save token to local storage or cookie

        // cookies().set('token', response.data.data)
        Cookies.set("token", response.data.data, { expires: 1 });
        setToken(response.data.data);

        const token2 = response.data.data;

        const decodedToken = jwt_decode(token2);
        const { username, nama_user } = decodedToken;
        Cookies.set("username", username, { expires: 1 });
        Cookies.set("nama_user", nama_user, { expires: 1 });
        // cookies().set('username', username)
        // cookies().set('nama_user', nama_user)

        // Redirect to user profile page
        router.push("/admin");
      } else {
        console.log("Login error:", response.data.error);
        seterrorlogin(response.data.error);
        setShowNotificationdelete(true);
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw response;
        // Display error message
      }
    } catch (ex: any) {
      console.log(ex);
      seterrorlogin(ex.response.data.pesan);
      // // seterrorlogin(response.data.error);
      setShowNotificationdelete(true);
      // seterrorlogin(response.data.error);
      // Display error message
    }
  };
  //login end

  return (
    <>
      <div style={pageStyle}>
        <HeaderMenu />
        <Container size={470} my={108}>
          {showNotificationdelete && (
            <Notification
              icon={<IconX size="1.1rem" />}
              color="red"
              onClose={handleCloseNotificationdelete}
            >
              {errorlogin}
            </Notification>
          )}

          <Space h="xl" />

          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              fontSize: "45px",
            })}
          >
            Welcome back!
          </Title>
          <Text color="dimmed" size="md" align="center" mt={5}>
            Belum punya akun?{" "}
            <Anchor
              size="sm"
              style={{ color: "#e14658" }}
              component="a"
              href="/SignUp"
            >
              Sign Up
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={handleLogin}>
              <TextInput
                label="Username"
                placeholder="Insert Username Here"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Your Password Here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                mt="md"
              />
              <Group position="apart" mt="lg">
                <Anchor
                  component="button"
                  size="sm"
                  style={{ color: "#e14658" }}
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button
                type="submit"
                fullWidth
                mt="xl"
                styles={(theme) => ({
                  root: {
                    backgroundColor: "#e14658",
                    color: "#ffffff",
                    "&:not([data-disabled])": theme.fn.hover({
                      backgroundColor: "#e7b622",
                      color: theme.fn.darken("#3F2661", 0.15),
                    }),
                  },
                })}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
        <FooterMenu />
      </div>
    </>
  );
};

export default Login;
