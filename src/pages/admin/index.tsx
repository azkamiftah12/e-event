/* eslint-disable react-hooks/rules-of-hooks */
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Title,
  Image,
  Text,
  Space,
  RingProgress,
} from "@mantine/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout, {
  headerauthorization,
  ipaddress,
} from "@/components/layout";
import Link from "next/link";
// import authMiddleware from '../../middleware/authMiddleware';

// console.log(authMiddleware);

const index = () => {
  const [datapelatihan, setDatapelatihan] = useState([]);
  const [datavalidasipelatihan, setDatavalidasipelatihan] = useState([]);
  const [databatch, setDatabatch] = useState([]);
  const [datauser, setDatauser] = useState([]);
  const [datauserpeserta, setDatauserpeserta] = useState([]);
  const [datauserpenyelenggara, setDatauserpenyelenggara] = useState([]);
  const router = useRouter();

  const getDatapelatihan = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihan`,
      headerauthorization
    );
    setDatapelatihan(response.data.data);
  };
  const getDatavalidasipelatihan = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanvalidasi`,
      headerauthorization
    );
    setDatavalidasipelatihan(response.data.data);
  };
  const getDatabatch = async () => {
    const response = await axios.get(
      `${ipaddress}get-databatch`,
      headerauthorization
    );
    setDatabatch(response.data.data);
  };
  const getDatauser = async () => {
    const response = await axios.get(
      `${ipaddress}get-datauser`,
      headerauthorization
    );
    setDatauser(response.data.data);
  };
  const getDatauserpeserta = async () => {
    const response = await axios.get(
      `${ipaddress}get-datauserpeserta`,
      headerauthorization
    );
    setDatauserpeserta(response.data.data);
  };

  const getDatauserpenyelenggara = async () => {
    const response = await axios.get(
      `${ipaddress}get-datauser-penyelenggara`,
      headerauthorization
    );
    setDatauserpenyelenggara(response.data.data);
  };

  useEffect(() => {
    getDatapelatihan();
    getDatavalidasipelatihan();
    getDatabatch();
    getDatauser();
    getDatauserpeserta();
    getDatauserpenyelenggara();
  }, []);

  const totalPelatihan = datapelatihan?.length ?? 0;
  const totalvalidasiPelatihan = datavalidasipelatihan?.length ?? 0;
  const totalbatch = databatch?.length ?? 0;
  const totaluser = datauser?.length ?? 0;
  const totaluserpeserta = datauserpeserta?.length ?? 0;
  const totaluserpenyelenggara = datauserpenyelenggara?.length ?? 0;

  return (
    <Layout>
      <Title>Dashboard</Title>
      <Space h="xl" />
      <Container>
        <Space h="xl" />

        {/* Card Start */}
        <Grid>
          <Grid.Col xs={12} sm={6} lg={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Pelatihan</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totalPelatihan}
              </Badge>

              <Button
                component={Link}
                href="/internal/pelatihan"
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Detail
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} lg={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Pelatihan perlu validasi</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totalvalidasiPelatihan}
              </Badge>

              <Button
                component={Link}
                href="/internal/validasipelatihan"
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Detail
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} lg={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Peserta</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totaluserpeserta}
              </Badge>

              <Button
                component={Link}
                href="/manajemen/user"
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Detail
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} lg={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Penyelenggara</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totaluserpenyelenggara}
              </Badge>

              <Button
                component={Link}
                href="/manajemen/user"
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Detail
              </Button>
            </Card>
          </Grid.Col>
          {/* ))} */}
        </Grid>
        {/* Card End */}
      </Container>
    </Layout>
  );
};
// export const middleware = authMiddleware;
export default index;
// export default authMiddleware(index);
