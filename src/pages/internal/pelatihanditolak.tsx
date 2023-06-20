import React, { useState, useEffect, useRef } from "react";
import Layout, {
  headerauthorization,
  ipaddress,
} from "../../components/layout";
import axios from "axios";
import { Space, TextInput, Table, Button, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Zoom, toast } from "react-toastify";
import Cookies from "js-cookie";

const pelatihanditolak = () => {
  const [data, setData] = useState([]);

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
      `${ipaddress}get-datapelatihantolak`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  //get token from cookies start
  const username = Cookies.get("username");
  //get token from cookies end

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

  //ACC Pelatihan start
  const handleACC = async (id_pelatihan) => {
    const bodyFormData = new FormData();
    bodyFormData.append("idpelatihan", id_pelatihan);
    bodyFormData.append("username_acc", username);

    const currentDate = new Date();
    const currentDateformat = currentDate.toISOString().split("T")[0];
    bodyFormData.append("tanggal_pelatihan_acc", currentDateformat);

    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    bodyFormData.append("waktu_accpelatihan", currentTime);

    const response = await axios.post(
      `${ipaddress}updatevalidasi-datapelatihan/:${id_pelatihan}`,
      bodyFormData,
      headerauthorization
    );
    notifysuccess(response.data.pesan);
    getData();
  };
  //ACC Pelatihan end

  //open modal ACC Pelatihan start
  const openACCModal = (e) => {
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
      confirmProps: { variant: "outline", color: "teal" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleACC(e.id_pelatihan),
    });
  };
  //open model ACC Pelatihan end

  return (
    <Layout>
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
            <th>Pesan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e, i) => (
            <tr key={e.id_pelatihan}>
              <td>
                <td>{i + 1}</td>
              </td>
              <td>{e.judul_pelatihan}</td>
              <td>{e.pesan_tolak}</td>
              <td>
                <Flex
                  mih={50}
                  gap="md"
                  justify="flex-start"
                  align="flex-start"
                  direction="row"
                  wrap="wrap">
                  <Button
                    variant="outline"
                    color="teal"
                    radius="md"
                    onClick={() => openACCModal(e)}>
                    Accept
                  </Button>
                  <Button
                    onClick={() => openDeleteModal(e)}
                    variant="outline"
                    color="red">
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    color="yellow"
                    // onClick={() => {
                    //   setSelectedData(e);
                    //   openEditModal();
                    // }}
                  >
                    Edit
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
export default pelatihanditolak;
