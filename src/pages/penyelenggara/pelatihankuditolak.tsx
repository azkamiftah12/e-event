/* eslint-disable react-hooks/rules-of-hooks */
import Layout, {
  headerauthorization,
  ipaddress,
} from "@/components/layout";
import LayoutPenyelenggara from "@/components/layoutpenyelenggara";
import { TextInput, Space, Table, Flex, Button, Text, Title, CloseButton } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import Cookies from "js-cookie";
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { toast, ToastContentProps, Zoom } from "react-toastify";

const pelatihankuditolak = () => {
  const [data, setData] = useState<any[]>([]);

  const notifysuccess = (msg: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => {
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

  //get token from cookies start
  const username = Cookies.get("username");
  //get token from cookies end

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihantolakuser?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };
  const handleClear = () => {
    setSearchTerm('');
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
  const handleDelete = async (id_pelatihan: string | Blob) => {
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
  const openDeleteModal = (e: { judul_pelatihan: string | number | boolean | ReactFragment | ReactPortal | PromiseLikeOfReactNode | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; id_pelatihan: string | Blob; }) => {
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
      <Space h="md" />
      <Title tt="capitalize">Pelatihan ditolak</Title>
      <TextInput
        placeholder="search pelatihan"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
        rightSection={
          <CloseButton onClick={handleClear} />
        }
      />
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>No</th>
            <th>Judul Pelatihan</th>
            <th>Alasan Ditolak</th>
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
                    onClick={() => openDeleteModal(e)}
                    variant="outline"
                    color="red">
                    Delete
                  </Button>
                  {/* <Button
                    variant="outline"
                    color="teal"
                    // onClick={() => {
                    //   setSelectedData(e);
                    //   openEditModal();
                    // }}
                  >
                    Ajukan Kembali
                  </Button> */}
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutPenyelenggara>
  );
};
export default pelatihankuditolak;
