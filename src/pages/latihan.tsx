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
  Icon,
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
import "react-toastify/dist/ReactToastify.css";

const latihan = () => {
  const [data, setData] = useState([]);
  const [databatch, setDatabatch] = useState([]);

  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  const getDatabatch = async () => {
    const response = await axios.get(
      `${ipaddress}get-databatch`,
      headerauthorization
    );
    console.log(response.data.data);
    setDatabatch(response.data.data);
  };

  //get username from cookies start
  const username = Cookies.get("username");
  const getusername = username;
  //get username from cookies end

  //notifikasi toast start
  const notifysuccess = () => {
    toast.success("Claim batch successfully", {
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
  const notifyerror = () => {
    toast.error("Please login to claim batch", {
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
  //notifikasi toast end

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
    getDatabatch();
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
      notifyerror();
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
      getDatabatch();
      notifysuccess();
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
                      style={{
                        backgroundColor: "#3F2661",
                      }}
                      mt="md"
                      radius="md"
                      onClick={() => openModal(e.id_pelatihan)}
                    >
                      Detail
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "#e7b622",
                      }}
                      mt="md"
                      radius="md"
                      onClick={() => openClaimModal(e)}
                      disabled={databatch.some(
                        (item) =>
                          item.username_peserta === username &&
                          item.id_pelatihan === e.id_pelatihan
                      )}
                    >
                      {databatch.some(
                        (item) =>
                          item.username_peserta === username &&
                          item.id_pelatihan === e.id_pelatihan
                      )
                        ? "Claimed"
                        : "Claim"}
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
      {/* View Modal component */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPelatihan?.judul_pelatihan}
        styles={{
          modal: {
            borderRadius: 12,
            boxShadow: "0px 8px 32px rgba(17, 17, 17, 0.16)",
          },
          body: {
            padding: 24,
          },
        }}
      >
        <Card
          key={selectedPelatihan?.id_pelatihan}
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
          {/* Card content */}
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Group position="right" mt="md" mb="xs">
            <Badge color="pink" variant="light">
              <Text weight={500}>{selectedPelatihan?.nama_jenis_acara}</Text>
            </Badge>
          </Group>
          <Group position="left" mt="md" mb="xs">
            <Text style={hiddenTextStyle} weight={500}>
              {selectedPelatihan?.id_pelatihan}
            </Text>
            <Text tt="uppercase" weight={500}>
              {selectedPelatihan?.judul_pelatihan}
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
                {selectedPelatihan?.tanggal_pelatihan_start
                  ? selectedPelatihan?.tanggal_pelatihan_start.substring(0, 10)
                  : "Coming Soon"}
              </Text>
            </Flex>
          </Group>
          <Text className="bold" size="md" color="dimmed">
            Narasumber:{" "}
            {selectedPelatihan?.nama_narasumber
              ? selectedPelatihan?.nama_narasumber
              : "Coming Soon"}
          </Text>

          <Text className="bold" size="md" color="dimmed">
            Deskripsi:{" "}
            {selectedPelatihan?.deskripsi_pelatihan
              ? selectedPelatihan?.deskripsi_pelatihan
              : "Coming Soon"}
          </Text>
        </Card>
      </Modal>
    </div>
  );
};
export default latihan;
