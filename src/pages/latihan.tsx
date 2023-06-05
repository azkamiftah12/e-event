import axios from "axios";
import { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  Space,
  Text,
  TextInput,
  Title,
  modal,
  RichTextEditor,
  RichTextEditorValue,
} from "@mantine/core";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { headerauthorization, ipaddress } from "../components/layout";
import FooterMenu from "../components/FooterMenu/FooterMenu";

const latihan = () => {
  const [data, setData] = useState([]);
  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihan`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.judul_pelatihan
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  // Custom style to hide the text
  const hiddenTextStyle = {
    display: "none",
  };

  // New state variables for modal
  const [selectedPelatihan, setSelectedPelatihan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal and select pelatihan
  const openModal = (id) => {
    const pelatihan = data.find((item) => item.id_pelatihan === id);
    setSelectedPelatihan(pelatihan);
    setIsModalOpen(true);
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
        List Pelatihan
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
            <Grid.Col span={4}>
              <Card
                key={e.id_pelatihan}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section>
                  <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text style={hiddenTextStyle} weight={500}>
                    {e.id_pelatihan}
                  </Text>
                  <Text weight={500}>{e.judul_pelatihan}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  {e.deskripsi_pelatihan}
                </Text>
                <Text size="sm" color="dimmed">
                  {e.nama_narasumber}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => openModal(e.id_pelatihan)}
                >
                  View Pelatihan
                </Button>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Claim Pelatihan
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        {/* Card End */}

        <Space h="xl" />
      </Container>
      <FooterMenu />
      {/* New Modal component */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPelatihan?.judul_pelatihan}
      >
        {/* Display the selected pelatihan data */}
        <Text>{selectedPelatihan?.deskripsi_pelatihan}</Text>
        <Text>{selectedPelatihan?.nama_narasumber}</Text>
        <Text>{selectedPelatihan?.tanggal_pelatihan_start}</Text>
        <Text
          dangerouslySetInnerHTML={{
            __html: selectedPelatihan?.deskripsi_pelatihan_khusus,
          }}
        />
      </Modal>
    </div>
  );
};
export default latihan;
