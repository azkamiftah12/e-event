import axios, { AxiosError } from "axios";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactNode, SyntheticEvent, useState } from "react";
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
import { Flip, Slide, ToastContainer, ToastContentProps, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SHA256 } from "crypto-js";
// import { cookies } from 'next/headers';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { ipaddress } from "@/components/layout";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import FooterMenu from "@/components/FooterMenu/FooterMenu";
import Link from "next/link";
// import { handleLogout } from "./logout";

//Global Logout start
export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nama_user');
  localStorage.removeItem('role_user');
  localStorage.removeItem('username');
  Cookies.remove('token')
  Cookies.remove('nama_user')
  Cookies.remove('role_user')
  Cookies.remove('username')
  window.location.href = '/';
};
//Global Logout end
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [token, setToken] = useState(null);

  // //notification gagal start
  // const [showNotificationdelete, setShowNotificationdelete] = useState(false);
  // const handleCloseNotificationdelete = () => {
  //   setShowNotificationdelete(false);
  // };
  // //notification gagal end

  const notifysuccess = () => {
    toast.success("success", {
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

  const notifyerror = (msg: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => {
    toast.error(msg, {
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
    toast.warn("warning", {
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

  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  //login start
  const handleLogin = async (e: { preventDefault: () => void; }) => {
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

        const decodedToken: any = jwt_decode(token2);
        const { username, role_user, nama_user } = decodedToken;
        Cookies.set("username", username, { expires: 1 });
        Cookies.set("nama_user", nama_user, { expires: 1 });
        // cookies().set('username', username)
        // cookies().set('nama_user', nama_user)

        // Redirect to user profile page
        if (role_user.toString().toLowerCase() === "penyelenggara") {
          // Redirect to penyelenggara page
          router.push("/penyelenggara");
        } else {
          // Redirect to admin page
          router.push("/admin");
        }
      } else {
        console.log("Login error:", response.data.error);
        // setShowNotificationdelete(true);
        notifyerror(response.data.error);
        throw response;
        // Display error message
      }
    } catch (ex: any) {
      console.log(ex);
      if (ex.response && ex.response.data && ex.response.data.pesan) {
        notifyerror(ex.response.data.pesan);
      } else {
        notifyerror("An error occurred while making the request. Check your Connection");
      }
      // setShowNotificationdelete(true);
      // notifyerror(ex.response.data.pesan);
      
    }
  };
  //login end

  return (
    <>
      <div style={pageStyle}>
        <HeaderMenu />
        <Container size={470} my={108}>
          {/* {showNotificationdelete && (
            <Notification
              icon={<IconX size="1.1rem" />}
              color="red"
              onClose={handleCloseNotificationdelete}
            >
              {errorlogin}
            </Notification>
          )} */}

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
              component={Link}
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
