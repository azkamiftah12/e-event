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
// import authMiddleware from '../../middleware/authMiddleware';

// console.log(authMiddleware);

const index = () => {
  const [datapelatihan, setDatapelatihan] = useState([]);
  const [datavalidasipelatihan, setDatavalidasipelatihan] = useState([]);
  const [databatch, setDatabatch] = useState([]);
  const [datauser, setDatauser] = useState([]);
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

  useEffect(() => {
    getDatapelatihan();
    getDatavalidasipelatihan();
    getDatabatch();
    getDatauser();
  }, []);

  const totalPelatihan = datapelatihan?.length ?? 0;
  const totalvalidasiPelatihan = datavalidasipelatihan?.length ?? 0;
  const totalbatch = databatch?.length ?? 0;
  const totaluser = datauser?.length ?? 0;

  return (
    <Layout>
      <Title>Dashboard</Title>
      <Space h="xl" />
      <Container>
        <Space h="xl" />

        {/* Card Start */}
        <Grid>
          <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Pelatihan</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totalPelatihan}
              </Badge>

              <Button
                component="a"
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

          <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Pelatihan perlu validasi</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totalvalidasiPelatihan}
              </Badge>

              <Button
                component="a"
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

          <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Peserta</Text>
              </Group>
              <Badge color="pink" variant="light">
                Jumlah: {totalbatch}
              </Badge>

              <Button
                component="a"
                href="/internal/batch"
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
