import FooterMenu from "@/components/FooterMenu/FooterMenu";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import { ipaddress, headerauthorization } from "@/components/layout";
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Group,
  Space,
  TextInput,
  Title,
  Text,
  Badge,
  Flex,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

const pelatihanku = () => {
  const [data, setData] = useState([]);
  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  //get token from cookies start
  const username = Cookies.get("username");
  const getusername = username;
  //get token from cookies end

  //get token from cookies start
  const token = Cookies.get("token");
  //get token from cookies end

  // const getData = async () => {
  //   const response = await axios.get(
  //     `${ipaddress}get-databatch`, headerauthorization
  //   );
  //   console.log(response.data.data);
  //   setData(response.data.data);
  // };

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanku?username=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
    getusername;
    console.log(getusername);
  }, []);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // eslint-disable-next-line arrow-body-style
  const filteredData = data
    ? data.filter((item) => {
        return item.judul_pelatihan
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : [];
  //search end

  // Custom style to hide the text
  const hiddenTextStyle = {
    display: "none",
  };

  return (
    <div style={pageStyle}>
      <HeaderMenu />
      <Space h="xl" />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
          fontSize: "45px",
        })}
      >
        List Pelatihanku
      </Title>
      <Container size="xl" px="xl">
        <Space h="xl" />

        <TextInput
          placeholder="search pelatihan"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginTop: "16px" }}
        />
        <Space h="xl" />

        {/* Card Start */}
        <Grid>
          {filteredData.map((e) => (
            // eslint-disable-next-line react/jsx-key
            <Grid.Col span={3}>
              <Card
                key={e.id_pelatihan}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Card.Section>
                  <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <Group position="right" mt="md" mb="xs">
                  <Badge color="pink" variant="light">
                    <Text weight={500}>{e.nama_jenis_acara}</Text>
                  </Badge>
                </Group>
                <Group position="left" mt="md" mb="xs">
                  <Text style={hiddenTextStyle} weight={500}>
                    {e.id_pelatihan}
                  </Text>
                  <Text tt="uppercase" weight={500}>
                    {e.judul_pelatihan}
                  </Text>
                </Group>
                <Group position="left" mt="md" mb="xs" align="center">
                  <Flex gap="xs">
                    <Image
                      src="/img/schedule.png"
                      alt="Icon"
                      width={30}
                      height={30}
                    />
                    <Text weight={400}>
                      {e.tanggal_pelatihan_start
                        ? e.tanggal_pelatihan_start.substring(0, 10)
                        : "Coming Soon"}
                    </Text>
                  </Flex>
                </Group>

                <Text className="bold" size="md" color="dimmed">
                  Narasumber:{" "}
                  {e.nama_narasumber ? e.nama_narasumber : "Coming Soon"}
                </Text>

                <Group position="center" mt="md" mb="xs" align="center">
                  <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                  >
                    <Button
                      variant="light"
                      color="blue"
                      mt="md"
                      radius="md"
                      onClick={() => openModal(e.id_pelatihan)}
                    >
                      Detail
                    </Button>
                  </Flex>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        {/* Card End */}

        <Space h="xl" />
      </Container>
      <FooterMenu />
    </div>
  );
};
export default pelatihanku;
