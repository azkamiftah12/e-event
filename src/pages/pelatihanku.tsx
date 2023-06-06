import FooterMenu from "@/components/FooterMenu/FooterMenu";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import { ipaddress, headerauthorization } from "@/components/layout";
import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Space,
  TextInput,
  Title,
  Text,
  Badge,
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
  const getusername = username
  //get token from cookies end

  //get token from cookies start
  const token = Cookies.get("token");
  //get token from cookies end

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-databatch`, headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
    getusername;
    console.log(getusername)
  }, []);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // eslint-disable-next-line arrow-body-style
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

        <Grid>
        {filteredData
  .filter((e) => e.username === `${getusername}`)
  .map((e) => (
            <Grid.Col span={4}>
              <Card
                key={e.id_pelatihan}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{e.judul_pelatihan}</Text>
                  <Badge color="pink" variant="light">
                    On Sale
                  </Badge>
                </Group>

                <Text weight={500}>{e.deskripsi_pelatihan}</Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  detail
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Space h="xl" />
      </Container>
      <FooterMenu />
    </div>
  );
};
export default pelatihanku;
