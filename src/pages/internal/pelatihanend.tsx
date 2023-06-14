import React, { useState, useEffect, useRef } from "react";
import Layout, {
  headerauthorization,
  ipaddress,
} from "../../components/layout";
import axios from "axios";
import {
  Space,
  TextInput,
  Table,
  Button,
  Flex,
  Text,
  Modal,
  Badge,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Zoom, toast } from "react-toastify";
import { modals } from "@mantine/modals";

const pelatihanend = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const notifysuccess = (msg) => {
    toast.success(msg, {
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
  const notifyerror = (msg) => {
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

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanend`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getDatalihatpeserta = async (id_pelatihan) => {
    const response = await axios.get(
      `${ipaddress}get-datalihatpeserta?id_pelatihan=${id_pelatihan}`,
      headerauthorization
    );
    console.log(response.data.data);
    setDataLihatPeserta(response.data.data);
  };

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

  //delete
  const handleDelete = async (id_pelatihan) => {
    const bodyFormData = new FormData();
    console.log(id_pelatihan);
    bodyFormData.append("idpelatihan", id_pelatihan);
    const response = await axios.post(
      `${ipaddress}delete-datapelatihan/:${id_pelatihan}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror(response.data.pesan);
    getData();
  };
  //delete end

  //open model delete start
  const openDeleteModal = (e) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{e.judul_pelatihan}?</strong>
        </Text>
      ),
      labels: { confirm: "Delete Pelatihan", cancel: "Cancel" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_pelatihan),
    });
  };
  //open model delete end

  const [datalihatpeserta, setDataLihatPeserta] = useState([]);

  //search lihat peserta start
  const [searchTermlihatpeserta, setSearchTermlihatpeserta] = useState("");
  const handleSearchlihatpeserta = (event) => {
    setSearchTermlihatpeserta(event.target.value);
  };

  // eslint-disable-next-line arrow-body-style
  const filteredDatalihatpeserta = datalihatpeserta
    ? datalihatpeserta.filter((item) => {
        return item.username_peserta
          ?.toString()
          .toLowerCase()
          .includes(searchTermlihatpeserta.toLowerCase());
      })
    : [];
  //search lihat peserta end

  //modal start
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  // const [openedlihatpesertaModal, { open: openlihatpesertaModal, close: closelihatpesertaModal }] = useDisclosure(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openlihatpesertaModal = async (e) => {
    await getDatalihatpeserta(e.id_pelatihan);
    setSelectedData(datalihatpeserta);
    setIsModalOpen(true);
  };
  // modal end

  return (
    <Layout>
      {/* modal Modal lihat peserta start */}
      <Modal
        size="70%"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lihat Peserta Pelatihan"
        centered
      >
        {selectedData && (
          <Box my="lg" mx="auto" mah="70%" maw="70%">
            <TextInput
              placeholder="Search peserta"
              value={searchTermlihatpeserta}
              onChange={handleSearchlihatpeserta}
              style={{ marginTop: "16px" }}
            />

            <Space h="md" />
            <Text>
              Total Peserta:{" "}
              <Badge color="pink" size="lg" variant="light">
                {filteredDatalihatpeserta.length}
              </Badge>
            </Text>
            <Space h="md" />

            <Table striped highlightOnHover withBorder withColumnBorders>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Judul Pelatihan</th>
                  <th>Username Peserta</th>
                </tr>
              </thead>
              <tbody>
                {filteredDatalihatpeserta.map((e, i) => (
                  <tr key={e?.id_pelatihan}>
                    <td>{i + 1}</td>
                    <td>{e?.judul_pelatihan}</td>
                    <td>{e?.username_peserta}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        )}
      </Modal>
      {/* modal Lihat Peserta End */}
      <TextInput
        placeholder="search pelatihan"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
      />
      <Space h="md" />
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>No</th>
            <th>Judul Pelatihan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e, i) => (
            <tr key={e.id_pelatihan}>
              <td>{i + 1}</td>
              <td>{e.judul_pelatihan}</td>
              <td>
                <Flex
                  mih={50}
                  gap="md"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                  wrap="wrap"
                >
                  <Button
                    onClick={() => openDeleteModal(e)}
                    variant="outline"
                    color="red"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={() => {
                      openlihatpesertaModal(e);
                    }}
                  >
                    Lihat Peserta
                  </Button>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
export default pelatihanend;
