import {
  Notification,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  Modal,
  Select,
  Space,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout, {
  headerauthorization,
  ipaddress,
} from "../../components/layout";

const Narasumber = () => {
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
  const notifywarning = (msg) => {
    toast.warn(msg, {
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
      `${ipaddress}get-datanarasumber`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  const getDataProvinsi = async () => {
    const response = await axios.get(
      `${ipaddress}get-dataprovinsi`,
      headerauthorization
    );
    console.log(response.data.data);
    const temporaryData = response.data.data.map((v) => ({
      label: v.nama_provinsi,
      value: v.id_provinsi,
    }));
    setDataProvinsi(temporaryData);
  };

  const getDataKabupaten = async () => {
    const response = await axios.get(
      `${ipaddress}get-datakabkot`,
      headerauthorization
    );
    console.log(response.data.data);
    // const temporaryData = response.data.data.map(v => ({ label: v.nama_kabkot, value: v.id_kabkot }));
    setListKabupaten(response.data.data);
  };

  const getDataPekerjaan = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapekerjaan`,
      headerauthorization
    );
    console.log(response.data.data);
    const temporaryData = response.data.data.map((v) => ({
      label: v.nama_job,
      value: v.id_pekerjaan,
    }));
    setDataPekerjaan(temporaryData);
  };

  useEffect(() => {
    getData();
    getDataProvinsi();
    getDataKabupaten();
    getDataPekerjaan();
  }, []);

  const [searchValue, onSearchChange] = useState("");

  //modal add start
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  // modal add end

  //modal edit start
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  // modal edit end

  const [searchValueProvinsi, onSearchChangeProvinsi] = useState("");
  const [searchValueKabupaten, onSearchChangeKabupaten] = useState("");
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.nama_narasumber
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  //form start
  const form = useForm({
    initialValues: {
      nama_narasumber: "",
      id_provinsi: "",
      id_kabkot: "",
    },

    validate: {
      nama_narasumber: (value) =>
        value.length < 2 ? "Masukkan Username" : null,
      id_provinsi: (value) =>
        value.length < 2 ? "Masukkan ID Provinsin" : null,
      id_kabkot: (value) => (value.length < 2 ? "Masukkan ID Kabupaten" : null),
    },
  });
  //Form End

  //Insert
  const handleInsert = async () => {
    const { nama_narasumber } = form.values;
    const selectedOptionProvinsi = dataProvinsi.find(
      (option) => option.label === searchValueProvinsi
    );
    const id_provinsi = selectedOptionProvinsi
      ? selectedOptionProvinsi.value
      : "";

    const selectedOptionKabupaten = dataKabupaten.find(
      (option) => option.label === searchValueKabupaten
    );
    const id_kabkot = selectedOptionKabupaten
      ? selectedOptionKabupaten.value
      : "";

    // Validate form fields
    const errors = form.validate();
    if (errors.hasErrors) {
      // If there are validation errors, you can handle them accordingly
      console.log(errors);
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append("nama_narasumber", nama_narasumber);
    bodyFormData.append("id_provinsi", id_provinsi);
    bodyFormData.append("id_kabkot", id_kabkot);

    try {
      const response = await axios.post(
        `${ipaddress}insert-datanarasumber`,
        bodyFormData,
        headerauthorization
      );
      if (response.data.error === true) {
        // Handle the error condition based on the response
        // For example, you can show an error message to the user or perform any necessary actions
        notifyerror(response.data.pesan);
      } else {
        close(false);
        notifysuccess("Insert Successfully");
        getData();
      }
    } catch (ex: any) {
      console.error(ex);
      if (ex.response && ex.response.data && ex.response.data.pesan) {
        notifyerror(ex.response.data.pesan);
      } else {
        notifyerror(
          "An error occurred while making the request. Check your Connection"
        );
      }
      // Handle the error
    }
  };
  //insert end

  // Update
  const handleUpdate = async () => {
    if (!selectedData) return; // No selected data, return early

    // eslint-disable-next-line max-len
    const { id_narasumber, nama_narasumber, id_provinsi, id_kabkot } =
      selectedData;

    const bodyFormData = new FormData();
    bodyFormData.append("oldid", id_narasumber);
    bodyFormData.append("nama_narasumber", nama_narasumber);
    bodyFormData.append("id_provinsi", id_provinsi);
    bodyFormData.append("id_kabkot", id_kabkot);

    try {
      await axios.post(
        `${ipaddress}update-datanarasumber`,
        bodyFormData,
        headerauthorization
      );

      // Success, do something after the update is complete
      closeEditModal();
      notifywarning("Update Successfully");
      getData();
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // update end

  //open model delete start
  const openDeleteModal = (e) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this Narasumber</Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_narasumber),
    });
  };
  //open model delete end

  //delete
  const handleDelete = async (id_narasumber) => {
    const bodyFormData = new FormData();
    bodyFormData.append("id_narasumber", id_narasumber);
    await axios.post(
      `${ipaddress}delete-datanarasumber/${id_narasumber}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror("Delete Narasumber Successfully");
    getData();
  };
  //delete end

  const handleProvinsiChange = (event) => {
    const selectedOption = dataProvinsi.find(
      (option) => option.label === event
    );
    const id_provinsi = selectedOption ? selectedOption.value : "";
    console.log(id_provinsi);
    console.log(listKabupaten);
    onSearchChangeProvinsi(event);
    const data = listKabupaten.filter((v) => v.id_provinsi == id_provinsi);
    console.log(data);
    const temporaryData = data.map((v) => ({
      label: v.nama_kabkot,
      value: v.id_kabkot,
    }));
    setDataKabupaten(temporaryData);
  };

  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const router = useRouter();

  return (
    <Layout>
      {/* modal add start */}
      <Modal
        size="70%"
        opened={openedAddModal}
        onClose={closeAddModal}
        title="Add User"
        centered
      >
        <Box my="lg" mx="auto" mah="70%" maw="70%">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Grid>
              <Grid.Col span={5} mx="lg">
                <TextInput
                  withAsterisk
                  label="Nama Narasumber"
                  placeholder="Nama Narasumber"
                  {...form.getInputProps("nama_narasumber")}
                />
              </Grid.Col>
              <Grid.Col span={5} mx="lg">
                <Select
                  label="Provinsi"
                  placeholder="Pick one"
                  searchable
                  onSearchChange={handleProvinsiChange}
                  onChange={handleProvinsiChange}
                  searchValue={searchValueProvinsi}
                  nothingFound="No options"
                  data={dataProvinsi}
                  {...form.getInputProps("id_provinsi")}
                />
                <Select
                  label="Kabupaten"
                  placeholder="Pick one"
                  searchable
                  onSearchChange={onSearchChangeKabupaten}
                  searchValue={searchValueKabupaten}
                  nothingFound="No options"
                  data={dataKabupaten}
                  {...form.getInputProps("id_kabkot")}
                />
              </Grid.Col>
            </Grid>

            <Group position="right" mt="md">
              <Button type="submit" onClick={handleInsert}>
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      {/* modal add end */}

      {/* modal edit start */}
      <Modal
        size="70%"
        opened={openedEditModal}
        onClose={closeEditModal}
        title="Edit User"
        centered
      >
        {selectedData && (
          <Box my="lg" mx="auto" mah="70%" maw="70%">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                withAsterisk
                label="Nama Narasumber"
                placeholder="Nama Narasumber"
                value={selectedData.nama_narasumber}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    nama_narasumber: e.target.value,
                  })
                }
              />
              <Group position="right" mt="md">
                <Button
                  type="submit"
                  variant="outline"
                  color="yellow"
                  onClick={handleUpdate}
                >
                  Edit
                </Button>
              </Group>
            </form>
          </Box>
        )}
      </Modal>
      {/* modal edit End */}

      <Grid justify="flex-end">
        <Grid.Col span={3}>
          <Group position="center">
            <Button onClick={openAddModal} variant="outline" color="indigo">
              Add User
            </Button>
          </Group>
        </Grid.Col>
      </Grid>

      <Space h="md" />
      <TextInput
        placeholder="Search Username"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
      />
      <Space h="md" />
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Nama Narasumber</th>
            <th>Nama Provinsi</th>
            <th>Nama Kabupaten/Kota</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.id_narasumber}>
              <td>{e.nama_narasumber}</td>
              <td>{e.nama_provinsi}</td>
              <td>{e.nama_kabkot}</td>
              <td>
                <Button
                  variant="outline"
                  color="yellow"
                  onClick={() => {
                    setSelectedData(e);
                    openEditModal();
                  }}
                >
                  Edit
                </Button>
                <Space h="sm" />
                <Button
                  onClick={() => openDeleteModal(e)}
                  variant="outline"
                  color="red"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default Narasumber;
