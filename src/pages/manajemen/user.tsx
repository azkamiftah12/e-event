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
import { Flip, Slide, ToastContainer, ToastContentProps, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout, {
  headerauthorization,
  ipaddress,
} from "@/components/layout";

const User = () => {
  const [data, setData] = useState<any[]>([]);

  const notifysuccess = (msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
  const notifyerror = (msg: string | number | boolean | React.ReactFragment | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
  const notifywarning = (msg: string | number | boolean | React.ReactFragment | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
      `${ipaddress}get-datauser`,
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
    const temporaryData = response.data.data.map((v: { nama_provinsi: any; id_provinsi: any; }) => ({
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
    const temporaryData = response.data.data.map((v: { nama_job: any; id_pekerjaan: any; }) => ({
      label: v.nama_job,
      value: v.id_pekerjaan,
    }));
    setDataPekerjaan(temporaryData);
  };

  const [searchValue, onSearchChange] = useState("");

  useEffect(() => {
    getData();
    getDataProvinsi();
    getDataKabupaten();
    getDataPekerjaan();
  }, []);

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
  const [dataPekerjaan, setDataPekerjaan] = useState<any[]>([]);
  const [dataProvinsi, setDataProvinsi] = useState<any[]>([]);
  const [dataKabupaten, setDataKabupaten] = useState<any[]>([]);
  const [listKabupaten, setListKabupaten] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [dataRole, setRole] = useState(["Admin", "Penyelenggara", "Peserta"]);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };
  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.username
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  //form start
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      nama_user: "",
      id_provinsi: "",
      id_kabkot: "",
      id_pekerjaan: "",
      notelp: "",
      role_user: "",
      termsOfService: false,
    },

    validate: {
      username: (value) => (value.length < 2 ? "Masukkan Username" : null),
      email: (value) =>  (/^\S+@\S+$/.test(value) ? "Masukkan Email" : null),
      password: (value) =>
        value.length < 8 ? "Password minimal 8 karakter" : null,
      nama_user: (value) => (value.length < 2 ? "Masukkan Nama" : null),
      id_provinsi: (value) =>
        value.length < 2 ? "Masukkan ID Provinsin" : null,
      id_kabkot: (value) => (value.length < 2 ? "Masukkan ID Kabupaten" : null),
      id_pekerjaan: (value) =>
        value.length < 2 ? "Masukkan ID Pekerjaan" : null,
      notelp: (value) => (/^\d{10,12}$/.test(value) ? null : 'Invalid Phone Number'),
      role_user: (value) => (value.length < 2 ? "Masukkan Role" : null),
    },
  });
  //Form End

  //Insert
  const handleInsert = async () => {
    const { username } = form.values;
    const { email } = form.values;
    const { password } = form.values;
    const { nama_user } = form.values;
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

    const selectedOptionPekerjaan = dataPekerjaan.find(
      (option) => option.label === searchValue
    );
    const id_pekerjaan = selectedOptionPekerjaan
      ? selectedOptionPekerjaan.value
      : "";

    const { notelp } = form.values;

    // const selectedOptionRole = dataRole.find(
    //   (option) => option.label === selectedRole
    // );
    // const role_user = selectedOptionRole ? selectedOptionRole.value : '';
    const role_user = selectedRole;

    // Validate form fields
    const errors = form.validate();
    if (errors.hasErrors) {
      // If there are validation errors, you can handle them accordingly
      console.log(errors);
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("nama_user", nama_user);
    bodyFormData.append("id_provinsi", id_provinsi);
    bodyFormData.append("id_kabkot", id_kabkot);
    bodyFormData.append("id_pekerjaan", id_pekerjaan);
    bodyFormData.append("notlp", notelp);
    bodyFormData.append("role_user", role_user);

    try {
      const response = await axios.post(
        `${ipaddress}insert-datauser`,
        bodyFormData,
        headerauthorization
      );
      if (response.data.error === true) {
        // Handle the error condition based on the response
        // For example, you can show an error message to the user or perform any necessary actions
        notifyerror(response.data.pesan);
      } else {
        closeAddModal();
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
    const {
      username,
      nama_user,
      id_pekerjaan,
      id_provinsi,
      id_kabkot,
      password,
      notlp,
    } = selectedData;

    const bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("nama_user", nama_user);
    bodyFormData.append("id_pekerjaan", id_pekerjaan);
    bodyFormData.append("id_provinsi", id_provinsi);
    bodyFormData.append("id_kabkot", id_kabkot);
    bodyFormData.append("password", password);
    bodyFormData.append("notlp", notlp);

    try {
      const response = await axios.post(
        `${ipaddress}update-datauser`,
        bodyFormData,
        headerauthorization
      );

      // Success, do something after the update is complete
      closeEditModal();
      notifywarning("Update User Successfully");
      getData();
    } catch (ex: any) {
      notifyerror(ex.response.data.pesan);
      // Handle the error
      console.error(ex);
    }
  };

  // update end

  //open model delete start
  const openDeleteModal = (e: { username: any; }) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this user</Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.username),
    });
  };
  //open model delete end

  //delete
  const handleDelete = async (username: string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append("usernamehapus", username);
    await axios.post(
      `${ipaddress}delete-datauser/${username}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror("Delete User Successfully");
    getData();
  };
  //delete end

  const handleProvinsiChange = (event: React.SetStateAction<string>) => {
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

  // const roleOptions = [
  //   { value: 'superadmin', label: 'superadmin' },
  //   { value: 'penyelenggara', label: 'penyelenggara' },
  //   { value: 'pemateri', label: 'pemateri' },
  //   { value: 'peserta', label: 'peserta' },
  //   // Add more options as needed
  // ];

  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (value: React.SetStateAction<string>) => {
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
        centered>
        <Box my="lg" mx="auto" mah="70%" maw="70%">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Grid>
              <Grid.Col span={5} mx="lg">
                <TextInput
                  withAsterisk
                  label="Username"
                  placeholder="Username"
                  {...form.getInputProps("username")}
                />
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <TextInput
                  withAsterisk
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
                <TextInput
                  withAsterisk
                  label="Nama"
                  placeholder="Nama"
                  {...form.getInputProps("nama_user")}
                />
              </Grid.Col>
              <Grid.Col span={5} mx="lg">
                <Select
                  label="Provinsi"
                  placeholder="Pick one"
                  searchable
                  onSearchChange={handleProvinsiChange}
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
                <Select
                  label="Jenis Pekerjaan"
                  placeholder="Pick one"
                  searchable
                  onSearchChange={onSearchChange}
                  searchValue={searchValue}
                  nothingFound="No options"
                  data={dataPekerjaan}
                  {...form.getInputProps("id_pekerjaan")}
                />
                <TextInput
                  withAsterisk
                  label="No Telephone"
                  placeholder="No Telephone"
                  {...form.getInputProps("notelp")}
                />
                <Select
                  data={dataRole}
                  placeholder="Pilih Role"
                  label="Pilih Jenis Role"
                  searchValue={selectedRole}
                  onSearchChange={handleRoleChange}
                  {...form.getInputProps("role_user")}
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
        centered>
        {selectedData && (
          <Box my="lg" mx="auto" mah="70%" maw="70%">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                withAsterisk
                disabled
                label="Username"
                placeholder="Username"
                value={selectedData.username}
              />
              <TextInput
                withAsterisk
                label="Nama User"
                placeholder="Nama User"
                value={selectedData.nama_user}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    nama_user: e.target.value,
                  })
                }
              />

              <TextInput
                withAsterisk
                disabled
                label="Pekerjaan"
                placeholder="Pekerjaan"
                value={selectedData.nama_job}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    id_pekerjaan: e.target.value,
                  })
                }
              />

              <TextInput
                withAsterisk
                label="Nomor Telp"
                placeholder="Nomor Telp"
                value={selectedData.notlp}
                onChange={(e) =>
                  setSelectedData({ ...selectedData, notlp: e.target.value })
                }
              />

              <TextInput
                disabled
                withAsterisk
                label="Role"
                placeholder="Role"
                value={selectedData.role_user}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    role_user: e.target.value,
                  })
                }
              />

              <Group position="right" mt="md">
                <Button
                  type="submit"
                  variant="outline"
                  color="yellow"
                  onClick={handleUpdate}>
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
            <th>Username</th>
            <th>Email</th>
            <th>Nama</th>
            <th>Nama Provinsi</th>
            <th>Nama Kabupaten/Kota</th>
            <th>Nama Pekerjaan</th>
            <th>No Telepon</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.username}>
              <td>{e.username}</td>
              <td>{e.email}</td>
              <td>{e.nama_user}</td>
              <td>{e.nama_provinsi}</td>
              <td>{e.nama_kabkot}</td>
              <td>{e.nama_job}</td>
              <td>{e.notlp}</td>
              <td>{e.role_user}</td>
              <td>
                <Button
                  variant="outline"
                  color="yellow"
                  onClick={() => {
                    setSelectedData(e);
                    openEditModal();
                  }}>
                  Edit
                </Button>
                <Space h="sm" />
                <Button
                  onClick={() => openDeleteModal(e)}
                  variant="outline"
                  color="red">
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

export default User;
