import {
  Notification,
  Anchor,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  Modal,
  Select,
  Space,
  Text,
  Table,
  TextInput,
} from "@mantine/core";
import { Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import Layout, {
  headerauthorization,
  ipaddress,
} from "../../components/layout";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";

const validasipelatihan = () => {
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
  const notifywarning = () => {
    toast.warn("warning", {
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
      `${ipaddress}get-datapelatihanvalidasi`,
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

  //open modal delete start
  const openDeleteModal = (e) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete{" "}
          <strong>Pelatihan {e.judul_pelatihan}?</strong>
        </Text>
      ),
      labels: { confirm: "delete Pelatihan", cancel: "Cancel" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_pelatihan),
    });
  };
  //open model delete end

  // const [pesan_tolak, setpesan_tolak] = useState("");
  const [pesanTolak, setPesanTolak] = useState("");

  //open modal decline start
  const openDeclineModal = (e) => {
    let tmpVal = "";
    modals.openConfirmModal({
      title: `Decline Pelatihan ${e.judul_pelatihan}`,
      centered: true,
      children: (
        <TextInput
          placeholder="Pesan"
          label="Pesan Tolak"
          withAsterisk
          onInput={(e) => {
            tmpVal = e.currentTarget.value;
          }}
        />
      ),
      labels: { confirm: "Decline Pelatihan", cancel: "Cancel" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        setTimeout(() => {
          console.log(tmpVal);
          setPesanTolak(tmpVal);
        }, 0);
        setTimeout(() => {
          handleDecline(e.id_pelatihan, tmpVal);
        }, 0);
      },
      // onClose: () => {},
      // onConfirm: () => handleDecline(e.id_pelatihan),
    });
  };
  //open model decline end

  //Decline start
  const handleDecline = async (id_pelatihan, tmppesantolak) => {
    const bodyFormData = new FormData();
    bodyFormData.append("idpelatihan", id_pelatihan);
    bodyFormData.append("pesan_tolak", tmppesantolak);

    const response = await axios.post(
      `${ipaddress}updatetolak-datapelatihan/:${id_pelatihan}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror(response.data.pesan);
    getData();
  };
  //Decline end

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

    await axios.post(
      `${ipaddress}updatevalidasi-datapelatihan/:${id_pelatihan}`,
      bodyFormData,
      headerauthorization
    );
    notifysuccess("Pelatihan berhasil di accept");
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

  // datetable parse start
  const formatdate = (sampletanggal) => {
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

  // timetable parse start
  const formattime = (sampletime) => {
    if (sampletime === "" || sampletime == null || sampletime === undefined) {
      return "";
    }
    const formattedTime = sampletime.split("T")[1].substring(0, 8);
    return formattedTime;
  };
  // timetable parse end

  const getTime = async () => {
    const currentDate1 = new Date();
    const currentTime1 = currentDate1.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    console.log(currentTime1);
  };

  return (
    <Layout>
      <Space h="md" />
      <TextInput
        placeholder="search pelatihan"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
      />

      <Space h="md" />
      <Button type="button" onClick={() => console.log(pesanTolak)}>
        cekcoba
      </Button>
      <Space h="md" />

      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Judul Pelatihan</th>
            <th>Deskripsi Pelatihan</th>
            <th>Narasumber</th>
            <th>Penyelenggara</th>
            <th>Tanggal Pelatihan Awal</th>
            <th>Tanggal Pelatihan Akhir</th>
            <th>Waktu Pelatihan</th>
            <th>Link Pelatihan</th>
            <th>Max Peserta per Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.id_pelatihan}>
              <td>{e.judul_pelatihan}</td>
              <td>{e.deskripsi_pelatihan}</td>
              <td>{e.nama_narasumber}</td>
              <td>{e.username_penyelenggara}</td>
              <td>{formatdate(e.tanggal_pelatihan_start)}</td>
              <td>{formatdate(e.tanggal_pelatihan_end)}</td>
              <td>{formattime(e.waktu_pelatihan)}</td>
              <td>
                <Anchor href={e.link_pelatihan} target="_blank">
                  {e.link_pelatihan}
                </Anchor>
              </td>
              <td>{e.max_pesertabatch}</td>
              <td>
                <Grid>
                  <Grid.Col span={6}>
                    <Button
                      variant="outline"
                      color="teal"
                      radius="md"
                      onClick={() => openACCModal(e)}>
                      Accept
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Button
                      variant="outline"
                      color="red"
                      radius="md"
                      onClick={() => openDeclineModal(e)}>
                      Decline
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Button
                      variant="outline"
                      color="red"
                      radius="md"
                      onClick={() => openDeleteModal(e)}>
                      Delete
                    </Button>
                  </Grid.Col>
                </Grid>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
export default validasipelatihan;
