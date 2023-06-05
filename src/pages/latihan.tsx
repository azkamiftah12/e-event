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
  Notification,
  RichTextEditor,
  RichTextEditorValue,
  Flex,
} from "@mantine/core";
import Cookies from "js-cookie";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { headerauthorization, ipaddress } from "../components/layout";
import FooterMenu from "../components/FooterMenu/FooterMenu";
import { modals } from "@mantine/modals";
import { IconX } from "@tabler/icons-react";
import router from "next/router";
import { Zoom, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const latihan = () => {
  const [data, setData] = useState([]);
  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  //get token from cookies start
  const username = Cookies.get("username");
  //get token from cookies end

  //notification ACC start
  const [showNotificationACC, setShowNotificationACC] = useState(false);
  const handleCloseNotificationACC = () => {
    setShowNotificationACC(false);
  };
  //notification ACC end

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

  // New state variables for modal
  const [selectedPelatihan, setSelectedPelatihan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal and select pelatihan
  const openModal = (id) => {
    const pelatihan = data.find((item) => item.id_pelatihan === id);
    setSelectedPelatihan(pelatihan);
    setIsModalOpen(true);
  };

  //claim start
  const handleclaim = async (id_pelatihan) => {
    if (!username) {
      toast.error('You need to login for claim batch', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
        theme: "dark",
        });
      router.push("/Login"); // Redirect to the login page
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append("id_pelatihan", id_pelatihan);
    bodyFormData.append("username_peserta", username ?? "");
    try {
      await axios.post(
        `${ipaddress}insert-databatch`,
        bodyFormData,
        headerauthorization
      );
      getData();
      setShowNotificationACC(true);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };
  //claim end

  //open modal Claim Pelatihan start
  const openClaimModal = (e) => {
    modals.openConfirmModal({
      title: "Terima Event",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to accept{" "}
          <strong>Pelatihan {e.judul_pelatihan}</strong>
        </Text>
      ),
      labels: { confirm: "ACC Pelatihan", cancel: "Cancel" },
      confirmProps: { color: "teal" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleclaim(e.id_pelatihan),
    });
  };
  //open model Claim Pelatihan end

  // datetable parse start
  const formatdatepelatihan = (sampletanggal) => {
    // const sampletanggal = '2023-05-21T00:00:00Z';
    if (
      sampletanggal === "" ||
      sampletanggal == null ||
      sampletanggal === undefined
    ) {
      return "";
    }
    const parsedDate = new Date(sampletanggal);
    return parsedDate.toISOString().split("T")[0];
  };
  // datetable parse end

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
        {showNotificationACC && (
          <Notification
            icon={<IconX size="1.1rem" />}
            color="teal"
            onClose={handleCloseNotificationACC}
          >
            Berhasil Claim Batch
          </Notification>
        )}
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
                  <Text tt="uppercase" weight={500}>
                    {e.judul_pelatihan}
                  </Text>
                  <Badge color="pink" variant="light">
                    <Text weight={500}>{e.nama_jenis_acara}</Text>
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  {e.deskripsi_pelatihan}
                </Text>
                <Text size="md" color="dimmed">
                  Narasumber: {e.nama_narasumber}
                </Text>

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
                    View Pelatihan
                  </Button>

                  <Button
                    variant="light"
                    color="teal"
                    mt="md"
                    radius="md"
                    onClick={() => openClaimModal(e)}
                  >
                    Claim Pelatihan
                  </Button>
                </Flex>
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
        <Text>
          {formatdatepelatihan(selectedPelatihan?.tanggal_pelatihan_start)}
        </Text>
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
