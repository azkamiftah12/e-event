import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Space,
  Table,
  TextInput,
  Text,
  Grid,
  CloseButton,
  Badge,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { Flip, Slide, ToastContainer, ToastContentProps, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout, {
  headerauthorization,
  ipaddress,
} from "@/components/layout";

const JenisPekerjaan = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);

  const notifysuccess = (msg: string | number | boolean | React.ReactFragment | React.PromiseLikeOfReactNode | React.ReactElement<any, string | React.JSXElementConstructor<any>> | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
      `${ipaddress}get-datapekerjaan`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  //modal add start
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);
  // modal add end

  //modal edit start
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  // modal edit end

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };
  const handleClear = () => {
    setSearchTerm('');
  };

  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.nama_job
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  //form start
  const form = useForm({
    initialValues: {
      nama_job: "",
    },

    validate: {
      nama_job: (value) =>
        value.length < 2 ? "Masukkan Jenis Pekerjaan" : null,
    },
  });
  //Form End

  //Insert
  const handleInsert = async () => {
    const { nama_job } = form.values;

    // Validate form fields
    const errors = form.validate();
    if (errors.hasErrors) {
      
      console.log(errors);
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("nama_job", nama_job);

    try {
      const response = await axios.post(
        `${ipaddress}insert-datapekerjaan`,
        bodyFormData,
        headerauthorization
      );
      if (response.data.error === true) {
        // Handle the error condition based on the response
        // For example, you can show an error message to the user or perform any necessary actions
        notifyerror(response.data.pesan);
      } else {
        closeAddModal();
        // close();
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
    const { id_pekerjaan, nama_job } = selectedData;

    const bodyFormData = new FormData();
    bodyFormData.append("oldid", id_pekerjaan);
    bodyFormData.append("nama_job", nama_job);

    try {
      await axios.post(
        `${ipaddress}update-datapekerjaan`,
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

  //delete
  const handleDelete = async (id_pekerjaan: string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append("idhapus", id_pekerjaan);
    await axios.post(
      `${ipaddress}delete-datapekerjaan/${id_pekerjaan}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror("Delete Successfully");
    getData();
  };
  //delete end

  //open model delete end
  const openDeleteModal = (e: { id_pekerjaan: string | Blob; }) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this user</Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_pekerjaan),
    });
  };
  //open model delete end

  return (
    <Layout>
      {/* {showNotificationcreate && (
      <Notification
        icon={<IconCheck size="1.1rem" />}
        color="teal"
        title="Notification"
        onClose={handleCloseNotificationcreate}
      >
        Data berhasil diinput
      </Notification>
    )}

{showNotificationupdate && (
      <Notification
        icon={<IconCheck size="1.1rem" />}
        color="yellow"
        title="Notification"
        onClose={handleCloseNotificationupdate}
      >
        Data berhasil diedit
      </Notification>
    )}

    {showNotificationdelete && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color="red"
          onClose={handleCloseNotificationdelete}
        >
          Data berhasil dihapus
        </Notification>
      )} */}
      <Modal
        opened={openedAddModal}
        onClose={closeAddModal}
        title="Add Pekerjaan"
        centered
      >
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Jenis Pekerjaan"
              placeholder="Jenis Pekerjaan"
              {...form.getInputProps("nama_job")}
            />

            <Group position="right" mt="md">
              <Button type="submit" onClick={handleInsert}>
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Modal
        opened={openedEditModal}
        onClose={closeEditModal}
        title="Edit Pekerjaan"
        centered
      >
        {selectedData && (
          <Box maw={300} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                withAsterisk
                label="Jenis Pekerjaan"
                placeholder="Jenis Pekerjaan"
                value={selectedData.nama_job}
                onChange={(e) =>
                  setSelectedData({ ...selectedData, nama_job: e.target.value })
                }
              />

              <Group position="right" mt="md">
                <Button type="submit" onClick={handleUpdate}>
                  Submit
                </Button>
              </Group>
            </form>
          </Box>
        )}
      </Modal>

      <Space h="md" />
      <Title tt="capitalize">Jenis Pekerjaan</Title>

      <Group position="center">
        <Button variant="outline" color="indigo" onClick={openAddModal}>
          Add Pekerjaan
        </Button>
      </Group>

      {/* search bar start */}
      <TextInput
        placeholder="Search Jenis Pekerjaan"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
        rightSection={
          <CloseButton onClick={handleClear} />
        }
      />
        {/* search bar end */}

      <Space h="md" />

      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Jenis Pekerjaan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.id_pekerjaan}>
              <td>{e.nama_job}</td>
              <td>
                <Grid>
                  <Grid.Col span={3}>
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
                    <Space w="lg" />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Button
                      onClick={() => openDeleteModal(e)}
                      variant="outline"
                      color="red"
                    >
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

export default JenisPekerjaan;
