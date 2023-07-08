/* eslint-disable react-hooks/rules-of-hooks */
import LayoutPenyelenggara from "@/components/layoutpenyelenggara";
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
import { headerauthorization, ipaddress } from "@/components/layout";
import Cookies from "js-cookie";
import Link from "next/link";

const index = () => {
  const [datapelatihan, setDatapelatihan] = useState([]);
  const [datapelatihantolak, setDatatolak] = useState([]);
  const [datapelatihanend, setDataend] = useState([]);
  const [datapelatihanpending, setDatapending] = useState([]);

  const router = useRouter();

  //get token from cookies start
  const username = Cookies.get("username");
  //get token from cookies end

  const getDatapelatihan = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanpenyelenggara?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setDatapelatihan(response.data.data);
  };

  const getDatatolak = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihantolakuser?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setDatatolak(response.data.data);
  };
  const getDataend = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanenduser?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setDataend(response.data.data);
  };
  const getDatapending = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanvalidasiuser?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setDatapending(response.data.data);
  };

  useEffect(() => {
    getDatapelatihan();
    getDatatolak();
    getDatapending();
    getDataend();
  }, []);

  const totalPelatihan = datapelatihan?.length ?? 0;
  const totalpelatihanpending = datapelatihanpending?.length ?? 0;
  const totalpelatihantolak = datapelatihantolak?.length ?? 0;
  const totalpelatihanend = datapelatihanend?.length ?? 0;

  return (
    <LayoutPenyelenggara>
      <Space h="md" />
      <Title>Dashboard</Title>
      <Space h="xl" />

      {/* Card Start */}
      <Grid>
        <Grid.Col xs={12} sm={6} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Pelatihanku</Text>
            </Group>
            <Badge color="pink" variant="light">
              Jumlah: {totalPelatihan}
            </Badge>

            <Button
              component={Link}
              href="/penyelenggara/managepelatihan"
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
              <Text weight={500}>Pelatihan Masih Pending</Text>
            </Group>
            <Badge color="pink" variant="light">
              Jumlah: {totalpelatihanpending}
            </Badge>

            <Button
              component={Link}
              href="/penyelenggara/pelatihanpending"
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
              <Text weight={500}>Pelatihan Yang ditolak</Text>
            </Group>
            <Badge color="pink" variant="light">
              Jumlah: {totalpelatihantolak}
            </Badge>

            <Button
              component={Link}
              href="/penyelenggara/pelatihankuditolak"
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
              <Text weight={500}>Pelatihan Selesai</Text>
            </Group>
            <Badge color="pink" variant="light">
              Jumlah: {totalpelatihanend}
            </Badge>

            <Button
              component={Link}
              href="/penyelenggara/pelatihankuend"
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
    </LayoutPenyelenggara>
  );
};
export default index;
