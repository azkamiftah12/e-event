/* eslint-disable react-hooks/rules-of-hooks */
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
  Modal,
} from "@mantine/core";
import { modals, openModal } from "@mantine/modals";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactNode, ReactPortal, SetStateAction } from "react";
import { toast, ToastContentProps, Zoom } from "react-toastify";

const pelatihanku = () => {
  const [data, setData] = useState<any[]>([]);
  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

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
  const notifyerror = (msg: string | number | boolean | ReactFragment | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => {
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
  //notifikasi toast end

  //get token from cookies start
  const username = Cookies.get("username") ?? '';
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
  const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => {
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

  //menampilkan modal info pelatihan start
  const [selectedPelatihan, setSelectedPelatihan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (id: any) => {
    const pelatihan = data.find((item) => item.id_pelatihan === id);
    setSelectedPelatihan(pelatihan);
    setIsModalOpen(true);
  };
  //menampilkan modal info pelatihan end

  //delete
  const handleDelete = async (id_batch: string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append("idbatch", id_batch);
    const response = await axios.post(
      `${ipaddress}delete-databatch/:${id_batch}`,
      bodyFormData,
      headerauthorization
    );
    console.log(id_batch);
    notifyerror(response.data.pesan);
    getData();
  };
  //delete end

  //open model delete start
  const openDeleteModal = (e: { judul_pelatihan: string | number | boolean | ReactFragment | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; id_batch: string | Blob; }) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{e.judul_pelatihan}?</strong>
        </Text>
      ),
      labels: { confirm: "Delete Pelatihan", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_batch),
    });
  };
  //open model delete end

  return (
    <>
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
          {filteredData && filteredData.length > 0 ? (
          <Grid>
            {filteredData.map((e) => (
              // eslint-disable-next-line react/jsx-key
              <Grid.Col xs={12} sm={6} lg={3}>
                <Card
                  key={e.id_batch}
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
                      src="/img/covercardpelatihan.jpg"
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
                      <Button
                        variant="light"
                        color="red"
                        mt="md"
                        radius="md"
                        onClick={() => openDeleteModal(e)}
                      >
                        Keluar
                      </Button>
                    </Flex>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
          ) : (
            <Card
      shadow="sm"
      padding="xl"
    >

      <Text align="center" color="pink.9" weight={500} size="lg" mt="md">
        No Data Found!
      </Text>

      <Text align="center" mt="xs" color="dimmed" size="sm">
        Try Claim Pelatihan!
      </Text>
    </Card>
          )}
          {/* Card End */}

          <Space h="xl" />
        </Container>
        <FooterMenu />
      </div>
      <Modal
        size={520}
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPelatihan?.judul_pelatihan}
        styles={{
          // modal: {
          //   borderRadius: 12,
          //   boxShadow: "0px 8px 32px rgba(17, 17, 17, 0.16)",
          //   width: "100%", // Custom width for the modal
          //   maxWidth: "2000px", // Optionally, set a maximum width
          // },
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
            width: "100%", // Custom width for the card
            maxWidth: "100%", // Optionally, set a maximum width
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Card content */}
          <Card.Section>
            <Image
              src="/img/covercardpelatihan.jpg"
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
            <b>Deskripsi:</b>
            <br />{" "}
            {selectedPelatihan?.deskripsi_pelatihan
              ? selectedPelatihan?.deskripsi_pelatihan
              : "Coming Soon"}
          </Text>
          <Text
            dangerouslySetInnerHTML={{
              __html: selectedPelatihan?.deskripsi_pelatihan_khusus
                ? selectedPelatihan?.deskripsi_pelatihan_khusus
                : "<b>Jadwal Coming Soon !</b>",
            }}
          />
        </Card>
      </Modal>
    </>
  );
};
export default pelatihanku;
