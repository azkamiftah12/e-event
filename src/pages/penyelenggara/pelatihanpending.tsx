import Layout, {
  headerauthorization,
  ipaddress,
} from "../../components/layout";
import LayoutPenyelenggara from "@/components/layoutpenyelenggara";
import { TextInput, Space, Table, Flex, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";

const pelatihanpending = () => {
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

  //get token from cookies start
  const username = Cookies.get("username");
  //get token from cookies end

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanvalidasiuser?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
    console.log(username);
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

  return (
    <LayoutPenyelenggara>
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
              <td>
                <td>{i + 1}</td>
              </td>
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
                  // variant= "outline"
                  // color="yellow"
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
    </LayoutPenyelenggara>
  );
};

export default pelatihanpending;
