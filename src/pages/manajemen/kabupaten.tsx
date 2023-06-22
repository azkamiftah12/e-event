/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Space,
  Table,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Layout, {
  headerauthorization,
  ipaddress,
} from "@/components/layout";
import { toast, ToastContentProps, Zoom } from "react-toastify";

const kabupaten = () => {
  const [data, setData] = useState<any[]>([]);

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

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datakabkot`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
    getDataProvinsi();
  }, []);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.nama_kabkot
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  //modal start
  const [opened, { open, close }] = useDisclosure(false);
  // modal end

  const [searchValue, onSearchChange] = useState("");
  const [dataProvinsi, setDataProvinsi] = useState<any[]>([]);

  //form start
  const form = useForm({
    initialValues: {
      id_provinsi: "",
      nama_kabkot: "",
      // termsOfService: false,
    },
    validate: {
      id_provinsi: (value) => (value.length < 1 ? "Pilih Provinsi" : null),
      nama_kabkot: (value) =>
        value.length < 2 ? "Masukkan Nama Kabkot" : null,
    },
  });
  //Form End

  //Insert
  const handleInsert = async () => {
    const { nama_kabkot } = form.values;

    // Validate form fields
    const errors = form.validate();
    if (errors.hasErrors) {
      // If there are validation errors, you can handle them accordingly
      console.log(errors);
      return;
    }

    const selectedOption = dataProvinsi.find(
      (option) => option.label === searchValue
    );
    const id_provinsi = selectedOption ? selectedOption.value : "";

    const bodyFormData = new FormData();
    bodyFormData.append("id_provinsi", id_provinsi);
    bodyFormData.append("namakabkot", nama_kabkot);

    try {
      const response = await axios.post(
        `${ipaddress}insert-datakabkot`,
        bodyFormData,
        headerauthorization
      );
      if (response.data.error === true) {
        // Handle the error condition based on the response
        // For example, you can show an error message to the user or perform any necessary actions
        notifyerror(response.data.pesan);
      } else {
        close();
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

  //delete
  const handleDelete = async (id_kabkot: string | Blob) => {
    const bodyFormData = new FormData();
    bodyFormData.append("idhapus", id_kabkot);
    await axios.post(
      `${ipaddress}delete-datakabkot/${id_kabkot}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror("Delete Kabupaten Successfully");
    getData();
  };
  //delete end

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

  return (
    <Layout>
      <Modal opened={opened} onClose={close} title="Add Kabupaten" centered>
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            {/* <TextInput
              withAsterisk
              label="ID Kabupaten/kota"
              placeholder="ID Kabupaten/kota"
              {...form.getInputProps('id_kabkot')}
            /> */}

            <Select
              label="Provinsi"
              placeholder="Pick one"
              searchable
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              nothingFound="No options"
              data={dataProvinsi}
              {...form.getInputProps("id_provinsi")}
            />

            <TextInput
              withAsterisk
              label="Nama kabupaten/Kota"
              placeholder="Nama Kabupaten/Kota"
              {...form.getInputProps("nama_kabkot")}
            />

            <Group position="right" mt="md">
              <Button type="submit" onClick={handleInsert}>
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Add Kabupaten/Kota</Button>
      </Group>

      <TextInput
        placeholder="Search Kabupaten/Kota"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
      />
      <Space h="md" />
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>ID Kabupaten/Kota</th>
            <th>Kabupaten/Kota</th>
            <th>Provinsi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.id_kabkot}>
              <td>{e.id_kabkot}</td>
              <td>{e.nama_kabkot}</td>
              <td>{e.nama_provinsi}</td>
              <td>
                <Button
                  onClick={() => handleDelete(e.id_kabkot)}
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
export default kabupaten;
