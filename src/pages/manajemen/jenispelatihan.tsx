/* eslint-disable react-hooks/rules-of-hooks */
import {
  Notification,
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Text,
  Space,
  Table,
  TextInput,
  Grid,
  CloseButton,
  Badge,
  Title,
} from "@mantine/core";
import axios from "axios";
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

const jenispelatihan = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);

  //   //notification delete start
  //   const [showNotificationdelete, setShowNotificationdelete] = useState(false);
  //   const handleCloseNotificationdelete = () => {
  //     setShowNotificationdelete(false);
  //   };
  //   //notification delete end

  //   //notification create start
  //   const [showNotificationcreate, setShowNotificationcreate] = useState(false);
  //   const handleCloseNotificationcreate = () => {
  //     setShowNotificationcreate(false);
  //   };
  //   //notification create end

  // //notification update start
  // const [showNotificationupdate, setShowNotificationupdate] = useState(false);
  // const handleCloseNotificationupdate = () => {
  //   setShowNotificationupdate(false);
  // };
  // //notification update end

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
      `${ipaddress}get-dataacara`,
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
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };
  const handleClear = () => {
    setSearchTerm('');
  };

  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.nama_jenis_acara
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  //form start
  const form = useForm({
    initialValues: {
      nama_jenis_acara: "",
    },

    validate: {
      nama_jenis_acara: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
    },
  });
  //Form End

  //Insert
  const handleInsert = async () => {
    const { nama_jenis_acara } = form.values;

    // Validate form fields
    const errors = form.validate();
    if (errors.hasErrors) {
      // If there are validation errors, you can handle them accordingly
      console.log(errors);
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("nama_acara", nama_jenis_acara);

    try {
      const response = await axios.post(
        `${ipaddress}insert-dataacara`,
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
    const { id_jenis_acara, nama_jenis_acara } = selectedData;

    const bodyFormData = new FormData();
    bodyFormData.append("oldid", id_jenis_acara);
    bodyFormData.append("nama_acara", nama_jenis_acara);

    try {
      await axios.post(
        `${ipaddress}update-dataacara`,
        bodyFormData,
        headerauthorization
      );
      // Success, do something after the update is complete
      closeEditModal();
      // setShowNotificationdelete(false);
      // setShowNotificationcreate(false);
      // setShowNotificationupdate(true);
      notifywarning("Update Successfully");
      getData();
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // update end

  //open model delete start
  const openDeleteModal = (e: { id_jenis_acara: any; }) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_jenis_acara),
    });
  };
  //open model delete end

  //delete
  const handleDelete = async (id_jenis_acara: string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append("idhapus", id_jenis_acara);
    await axios.post(
      `${ipaddress}delete-dataacara/${id_jenis_acara}`,
      bodyFormData,
      headerauthorization
    );
    // setShowNotificationdelete(true);
    // setShowNotificationcreate(false);
    // setShowNotificationupdate(false);
    notifyerror("Delete Successfully");
    getData();
  };
  //delete end

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
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          onClose={handleCloseNotificationdelete}
        >
          Data berhasil dihapus
        </Notification>
      )} */}


      <Modal
        opened={openedAddModal}
        onClose={closeAddModal}
        title="Add Jenis Pelatihan"
        centered
      >
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Jenis Pelatihan"
              placeholder="Jenis Pelatihan"
              {...form.getInputProps("nama_jenis_acara")}
            />

            <Group position="right" mt="md">
              <Button type="submit" onClick={handleInsert}>
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

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
                label="Jenis Pelatihan"
                placeholder="Jenis Pelatihan"
                value={selectedData.nama_jenis_acara}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    nama_jenis_acara: e.target.value,
                  })
                }
              />

              <Group position="right" mt="md">
                <Button variant="outline"
                      color="yellow" type="submit" onClick={handleUpdate}>
                  Edit
                </Button>
              </Group>
            </form>
          </Box>
        )}
      </Modal>
      {/* modal edit End */}

      <Space h="md" />
      <Title tt="capitalize">Jenis Pelatihan</Title>

      <Group position="center">
        <Button variant="outline" color="indigo" onClick={openAddModal}>
          Add Pelatihan
        </Button>
      </Group>

      {/* search bar start */}
      <TextInput
        placeholder="Search Jenis Pelatihan"
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
            <th>Jenis Pelatihan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.id_jenis_acara}>
              <td>{e.nama_jenis_acara}</td>
              <td>
                <Grid>
                  <Grid.Col span={3}>
                    <Button
                      onClick={() => openDeleteModal(e)}
                      variant="outline"
                      color="red"
                    >
                      Delete
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Button
                      onClick={() => {
                        setSelectedData(e);
                        openEditModal();
                      }}
                      variant="outline"
                      color="yellow"
                    >
                      Edit
                    </Button>
                  </Grid.Col>
                </Grid>
                <Space w="md" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
export default jenispelatihan;
