/* eslint-disable react-hooks/rules-of-hooks */
import {
  Notification,
  ActionIcon,
  Anchor,
  Box,
  Select,
  Button,
  Grid,
  Group,
  Modal,
  Space,
  Table,
  Text,
  TextInput,
  CloseButton,
  Textarea,
  Flex,
  Badge,
  Title,
} from "@mantine/core";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { IconCalendar, IconCheck, IconClock, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  DatesProvider,
  MonthPickerInput,
  DatePickerInput,
  TimeInput,
} from "@mantine/dates";
import { modals } from "@mantine/modals";
import { Flip, Slide, ToastContainer, ToastContentProps, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Layout, {
  headerauthorization,
  ipaddress,
} from "@/components/layout";

const pelatihan = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const ref: any = useRef<any>();

  const notifysuccess = (msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
  const notifyerror = (msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
  const notifywarning = (msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined) => {
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
      `${ipaddress}get-datapelatihan`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  const getDataJenisacara = async () => {
    const response = await axios.get(
      `${ipaddress}get-dataacara`,
      headerauthorization
    );
    console.log(response.data.data);
    const temporaryData = response.data.data.map((v: { nama_jenis_acara: any; id_jenis_acara: any; }) => ({
      label: v.nama_jenis_acara,
      value: v.id_jenis_acara,
    }));
    setDataJenisacara(temporaryData);
  };

  const getDataNarasumber = async () => {
    const response = await axios.get(
      `${ipaddress}get-datanarasumber`,
      headerauthorization
    );
    console.log(response.data.data);
    const temporaryData = response.data.data.map((v: { nama_narasumber: any; id_narasumber: any; }) => ({
      label: v.nama_narasumber,
      value: v.id_narasumber,
    }));
    setDataNarasumber(temporaryData);
  };

  const getDataPenyelenggara = async () => {
    const response = await axios.get(
      `${ipaddress}get-datauser-penyelenggara`,
      headerauthorization
    );
    console.log(response.data.data);
    const temporaryData = response.data.data.map((v: { username: any; }) => ({
      label: v.username,
      value: v.username,
    }));
    setDataPenyelenggara(temporaryData);
  };

  const getDatalihatpeserta = async (id_pelatihan: any) => {
    const response = await axios.get(
      `${ipaddress}get-datalihatpeserta?id_pelatihan=${id_pelatihan}`,
      headerauthorization
    );
    console.log(response.data.data);
    setDataLihatPeserta(response.data.data);
  };

  useEffect(() => {
    getData();
    getDataJenisacara();
    getDataNarasumber();
    getDataPenyelenggara();
    console.log(getDataPenyelenggara)
  }, []);

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
    return item.judul_pelatihan
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  //search end

  const [datalihatpeserta, setDataLihatPeserta] = useState<any[]>([]);

  //search lihat peserta start
  const [searchTermlihatpeserta, setSearchTermlihatpeserta] = useState("");
  const handleSearchlihatpeserta = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTermlihatpeserta(event.target.value);
  };
  const handleClearlihatpeserta = () => {
    setSearchTermlihatpeserta('');
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
  const [opened, { open: openAddModal, close }] = useDisclosure(false);
  const [openedEditModal, { close: closeEditModal, open: openEditModal }] =
    useDisclosure(false);

  // const [openedlihatpesertaModal, { open: openlihatpesertaModal, close: closelihatpesertaModal }] = useDisclosure(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openlihatpesertaModal = async (e: { id_pelatihan: any; }) => {
    await getDatalihatpeserta(e.id_pelatihan);
    setSelectedData(datalihatpeserta);
    setIsModalOpen(true);
  };
  // modal end

  //form start
  const currentDate: Date = new Date();
  const nextDay: Date = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 2);
  // const currentTime: any = currentDate.getHours();
  const form = useForm({
    initialValues: {
      id_jenis_acara: "",
      judul_pelatihan: "",
      deskripsi_pelatihan: "",
      username_penyelenggara: "",
      nama_narasumber: "",
      tanggal_pelatihan_start: currentDate,
      tanggal_pelatihan_end: nextDay,
      waktu_pelatihan: "",
      link_pelatihan: "",
      max_pesertabatch: "",
      deskripsi_pelatihan_khusus: "",
    },
    validate: {
      id_jenis_acara: (value) =>
        value.length < 1 ? "Please Fill This!" : null,
      judul_pelatihan: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
      deskripsi_pelatihan: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
      username_penyelenggara: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
      nama_narasumber: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
      // tanggal_pelatihan: (value) => (value.length < 2 ? 'Please Fill This!' : null),
      // waktu_pelatihan: (value) => (value.length < 2 ? 'Please Fill This!' : null),
      link_pelatihan: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
      max_pesertabatch: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
      deskripsi_pelatihan_khusus: (value) =>
        value.length < 2 ? "Please Fill This!" : null,
    },
  });
  //Form End

  const [searchValue, onSearchChange] = useState("");

  const [dataJenisacara, setDataJenisacara] = useState<any[]>([]);

  const [dataNarasumber, setDataNarasumber] = useState<any[]>([]);
  const [dataPenyelenggara, setDataPenyelenggara] = useState<any[]>([]);
  const [searchValueNarasumber, onSearchChangeNarasumber] = useState("");
  const [searchValuePenyelenggara, onSearchChangePenyelenggara] = useState("");
  const [searchValueJenisAcara, onSearchChangeJenisAcara] = useState("");
  const [htmlNya, setHtmlNya] = useState("");

  const [content, setContent] = useState(
    `<h1><mark>-- -- -- -- Jadwal 1 -- -- -- --</mark></h1><p><strong>Tanggal :<br>Jam :<br>Link Zoom :</strong></p><p></p><h1><mark>-- -- -- -- Jadwal 2 -- -- -- --</mark></h1><p><strong>Tanggal :<br>Jam :<br>Link Zoom :</strong></p>`
  );

  const handleOpenEditModal = (e:any) => {
    openEditModal();
    setSelectedData(e);

    console.log(e?.deskripsi_pelatihan_khusus, "pel khusus");
    editor?.commands.setContent(e?.deskripsi_pelatihan_khusus);

    // Open the modal
    // ...
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  //Insert
  const handleInsert = async () => {
    const { id_jenis_acara } = form.values;
    const { judul_pelatihan } = form.values;
    const { deskripsi_pelatihan } = form.values;
    const selectedOptionPenyelenggara = dataPenyelenggara.find(
      (option) => option.label === searchValuePenyelenggara
    );
    const { username_penyelenggara } = selectedOptionPenyelenggara
    ? selectedOptionPenyelenggara.value
    : "";
    const selectedOptionNarasumber = dataNarasumber.find(
      (option) => option.label === searchValueNarasumber
    );
    const id_narasumber = selectedOptionNarasumber
      ? selectedOptionNarasumber.value
      : "";
    const { waktu_pelatihan } = form.values;
    const { link_pelatihan } = form.values;
    const { max_pesertabatch } = form.values;
    const { deskripsi_pelatihan_khusus } = form.values;

    const dateMaster1 = new Date(form.values.tanggal_pelatihan_start);
    const timezoneOffset1 = dateMaster1.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const adjustedDate1 = new Date(dateMaster1.getTime() - timezoneOffset1);
    const tanggal_pelatihan_start = adjustedDate1.toISOString().split("T")[0];

    const dateMaster = new Date(form.values.tanggal_pelatihan_end);
    const timezoneOffset = dateMaster.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const adjustedDate = new Date(dateMaster.getTime() - timezoneOffset);
    const tanggal_pelatihan_end = adjustedDate.toISOString().split("T")[0];

    console.log(editor?.getHTML(), "data rictect");

    const bodyFormData = new FormData();
    bodyFormData.append("id_jenis_acara", id_jenis_acara);
    bodyFormData.append("judul_pelatihan", judul_pelatihan);
    bodyFormData.append("deskripsi_pelatihan", deskripsi_pelatihan);
    bodyFormData.append("username_penyelenggara", username_penyelenggara);
    bodyFormData.append("id_narasumber", id_narasumber);
    bodyFormData.append("tanggal_pelatihan_start", tanggal_pelatihan_start);
    bodyFormData.append("tanggal_pelatihan_end", tanggal_pelatihan_end);
    bodyFormData.append("waktu_pelatihan", waktu_pelatihan);
    bodyFormData.append("link_pelatihan", link_pelatihan);
    bodyFormData.append("max_pesertabatch", max_pesertabatch);
    bodyFormData.append("deskripsi_pelatihan_khusus", editor?.getHTML() ?? "");

    try {
      const response = await axios.post(
        `${ipaddress}insert-datapelatihan`,
        bodyFormData,
        headerauthorization
      );
      if (response.data.error === true) {
        // Handle the error condition based on the response
        // For example, you can show an error message to the user or perform any necessary actions
        notifyerror(response.data.pesan);
      } else {
        close();
        notifysuccess(response.data.pesan);
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
  const openDeleteModal = (e: { judul_pelatihan: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; id_pelatihan: any; }) => {
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{e.judul_pelatihan}?</strong>
        </Text>
      ),
      labels: { confirm: "Delete Pelatihan", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(e.id_pelatihan),
    });
  };
  //open model delete end

  //selesai start
  const handleSelesai = async (id_pelatihan: string | Blob) => {
    const bodyFormData = new FormData();
    console.log(id_pelatihan);
    bodyFormData.append("idpelatihan", id_pelatihan);
    const response = await axios.post(
      `${ipaddress}updateend-datapelatihan/:${id_pelatihan}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror("pelatihan berhasil diakhiri");
    getData();
  };
  //selesai end

  //open modal selesai start
  const openSelesaiModal = (e: { judul_pelatihan: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; id_pelatihan: any; }) => {
    modals.openConfirmModal({
      title: "Akhiri Pelatihan",
      centered: true,
      children: (
        <Text size="sm">
          Yakin Akhiri Pelatihan <strong>{e.judul_pelatihan}?</strong>
        </Text>
      ),
      labels: { confirm: "Akhiri Pelatihan", cancel: "Cancel" },
      confirmProps: { variant: "outline", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleSelesai(e.id_pelatihan),
    });
  };
  //open modal selesai end

  // datetable parse start
  const formatdatepelatihan = (sampletanggal: string | number | Date | null | undefined) => {
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
  const formattimepelatihan = (sampletime: string | null | undefined) => {
    // const sampletanggal = '2023-05-21T00:00:00Z';
    if (sampletime === "" || sampletime == null || sampletime === undefined) {
      return "";
    }
    // const parsedTime = new Date(sampletime);
    // console.log(sampletime, 'sampletimee');
    // console.log(parsedTime, 'parserd');
    // console.log(parsedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), 'sampletimee');
    // console.log('---------------------------');
    // const formattedTime = parsedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const formattedTime = sampletime.split("T")[1].substring(0, 8);
    return formattedTime;
  };
  // timetable parse end

  const setRichText = () => {
    console.log(editor?.getHTML(), "editorxx");
    // editor?.edi = 'AAAAA';
    // const txtnya = `<h1>${new Date().toISOString()}</h1>`;
    // editor?.commands.setContent(txtnya);
    // setContent('hai');
    console.log("hai", "editorxx222");
    setHtmlNya(editor?.getHTML() ?? "");
  };
  
  // Edit Pelatihan start
  const handleUpdate = async () => {
    if (!selectedData) return;
    
    const { id_pelatihan } = selectedData;
    const { id_jenis_acara } = selectedData;
    const { judul_pelatihan } = selectedData;
    const { deskripsi_pelatihan } = selectedData;
    const { username_penyelenggara } = selectedData;
    const { tanggal_pelatihan_start } = selectedData;
    const { tanggal_pelatihan_end } = selectedData;
    const { waktu_pelatihan } = selectedData;
    const { link_pelatihan } = selectedData;
    const { max_pesertabatch } = selectedData;
    const { deskripsi_pelatihan_khusus } = selectedData;
    const { id_narasumber } = selectedData;
    const html = htmlNya;
    
    const formatwaktupelatihan = formattimepelatihan(waktu_pelatihan);

    const bodyFormData = new FormData();

    bodyFormData.append("oldid", id_pelatihan);
    bodyFormData.append("id_jenis_acara", id_jenis_acara);
    bodyFormData.append("judul_pelatihan", judul_pelatihan);
    bodyFormData.append("deskripsi_pelatihan", deskripsi_pelatihan);
    bodyFormData.append("tanggal_pelatihan_start", tanggal_pelatihan_start);
    bodyFormData.append("tanggal_pelatihan_end", tanggal_pelatihan_end);
    bodyFormData.append("waktu_pelatihan", formatwaktupelatihan);
    bodyFormData.append("link_pelatihan", link_pelatihan);
    bodyFormData.append("max_pesertabatch", max_pesertabatch);
    bodyFormData.append("deskripsi_pelatihan_khusus", editor?.getHTML() ?? "");
    bodyFormData.append("username_penyelenggara", username_penyelenggara);
    bodyFormData.append("id_narasumber", id_narasumber);

    try {
      const response = await axios.post(
        `${ipaddress}update-datapelatihan`,
        bodyFormData,
        headerauthorization
      );

      // Success, do something after the update is complete
      closeEditModal();
      notifywarning(response.data.pesan);
      getData();
    } catch (ex: any) {
      notifyerror(ex.response.data.pesan);
      // Handle the error
      console.error(ex);
    }
  };
  // Edit Pelatihan End

  const handleOpenAddModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    openAddModal();
    console.log("ketrigger");
    editor?.commands.setContent(content);
  };

  return (
    <Layout>
      {/* modal edit start */}
      <Modal
        size="70%"
        opened={openedEditModal}
        onClose={closeEditModal}
        title="Edit Pelatihan"
        centered>
        {selectedData && (
          <Box my="lg" mx="auto" mah="70%" maw="70%">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                withAsterisk
                label="Judul Pelatihan"
                placeholder="Judul Pelatihan"
                value={selectedData.judul_pelatihan}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    judul_pelatihan: e.target.value,
                  })
                }
              />

              <TextInput
                withAsterisk
                label="Max Peserta"
                placeholder="Max Peserta"
                value={selectedData.max_pesertabatch}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    max_pesertabatch: e.target.value,
                  })
                }
              />

              <Select
                label="Jenis Acara"
                placeholder="Pilih Jenis Acara"
                searchable
                defaultValue={selectedData.id_jenis_acara}
                onSearchChange={onSearchChangeJenisAcara}
                searchValue={searchValueJenisAcara}
                nothingFound="No options"
                data={dataJenisacara}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    id_jenis_acara: e,
                  })
                }
              />

              <Select
                label="Narasumber"
                placeholder="Pilih Narasumber"
                searchable
                defaultValue={selectedData.id_narasumber}
                onSearchChange={onSearchChangeNarasumber}
                searchValue={searchValueNarasumber}
                nothingFound="No options"
                data={dataNarasumber}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    id_narasumber: e,
                  })
                }
              />

              <DatesProvider settings={{ firstDayOfWeek: 1, weekendDays: [0] }}>
                <DatePickerInput
                  // value={new Date(selectedData.tanggal_pelatihan_start).toISOString().slice(0, 10)}
                  value={new Date(selectedData.tanggal_pelatihan_start)}
                  icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                  label="Pilih Tanggal Mulai pelatihan"
                  placeholder="Pilih Tanggal Mulai pelatihan"
                  mx="auto"
                  maw={400}
                  onChange={(e) =>
                    setSelectedData({
                      ...selectedData,
                      tanggal_pelatihan_start: e!.toISOString(),
                    })
                  }
                />
              </DatesProvider>

              <DatesProvider settings={{ firstDayOfWeek: 1, weekendDays: [0] }}>
                <DatePickerInput
                  // value={new Date(selectedData.tanggal_pelatihan_start).toISOString().slice(0, 10)}
                  value={new Date(selectedData.tanggal_pelatihan_end)}
                  icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                  label="Pilih Tanggal Akhir pelatihan"
                  placeholder="Pilih Tanggal Akhir pelatihan"
                  mx="auto"
                  maw={400}
                  onChange={(e) =>
                    setSelectedData({
                      ...selectedData,
                      tanggal_pelatihan_end: e!.toISOString(),
                    })
                  }
                />
              </DatesProvider>

              <Textarea
                withAsterisk
                label="Deskripsi Pelatihan"
                placeholder="Deskripsi Pelatihan"
                value={selectedData.deskripsi_pelatihan}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    deskripsi_pelatihan: e.target.value,
                  })
                }
              />

              <Text fw={500}>Konten Pelatihan</Text>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content></RichTextEditor.Content>
              </RichTextEditor>
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
      {/* modal edit end */}

      {/* modal lihat peserta start */}
      <Modal
        size="70%"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lihat Peserta Pelatihan"
        centered>
        {selectedData && (
          <Box my="lg" mx="auto" mah="70%" maw="70%">
            <TextInput
              placeholder="Search peserta"
              value={searchTermlihatpeserta}
              onChange={handleSearchlihatpeserta}
              style={{ marginTop: "16px" }}
              rightSection={
                <CloseButton onClick={handleClearlihatpeserta} />
              }
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
      {/* modal lihat peserta End */}

      {/* modal add peserta start */}
      <Modal
        size="70%"
        opened={opened}
        onClose={close}
        title="Add pelatihan"
        centered>
        <Box my="lg" mx="auto" maw="70%">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Grid>
              <Grid.Col span={5} mx="lg">
                <Select
                  label="Jenis Acara"
                  placeholder="Pilih Acara"
                  searchable
                  onSearchChange={onSearchChange}
                  searchValue={searchValue}
                  nothingFound="No options"
                  data={dataJenisacara}
                  {...form.getInputProps("id_jenis_acara")}
                />

                <Space h="md" />
                <TextInput
                  withAsterisk
                  label="Judul Pelatihan"
                  placeholder="Judul Pelatihan"
                  {...form.getInputProps("judul_pelatihan")}
                />
                <Space h="md" />
                <Textarea
                  withAsterisk
                  label="Deskripsi Pelatihan"
                  placeholder="Deskripsi Pelatihan"
                  {...form.getInputProps("deskripsi_pelatihan")}
                />

                <Space h="md" />
                {/* <TextInput
                  withAsterisk
                  label="Username Penyelenggara"
                  placeholder="Username Penyelenggara"
                  {...form.getInputProps("username_penyelenggara")}
                /> */}
                <Select
                  label="Username Penyelenggara"
                  placeholder="Pilih Penyelenggara"
                  searchable
                  onSearchChange={onSearchChangePenyelenggara}
                  searchValue={searchValuePenyelenggara}
                  nothingFound="No options"
                  data={dataPenyelenggara}
                  {...form.getInputProps("username_penyelenggara")}
                />

                <Space h="md" />

                <Select
                  label="Narasumber"
                  placeholder="Pilih Narasumber"
                  searchable
                  onSearchChange={onSearchChangeNarasumber}
                  searchValue={searchValueNarasumber}
                  nothingFound="No options"
                  data={dataNarasumber}
                  {...form.getInputProps("id_narasumber")}
                />

                <Space h="md" />
              </Grid.Col>
              <Grid.Col span={5} mx="lg">
                <DatesProvider
                  settings={{ firstDayOfWeek: 1, weekendDays: [0] }}>
                  <DatePickerInput
                    icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                    label="Pilih Tanggal Mulai pelatihan"
                    placeholder="Pilih Tanggal Mulai pelatihan"
                    {...form.getInputProps("tanggal_pelatihan_start")}
                    mx="auto"
                    maw={400}
                  />
                </DatesProvider>

                <Space h="md" />

                <DatesProvider
                  settings={{ firstDayOfWeek: 1, weekendDays: [0] }}>
                  <DatePickerInput
                    icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                    label="Pilih Tanggal Akhir Pelatihan"
                    placeholder="Pilih Tanggal akhir pelatihan"
                    required
                    {...form.getInputProps("tanggal_pelatihan_end")}
                    mx="auto"
                    maw={400}
                  />
                </DatesProvider>

                <Space h="md" />

                <TimeInput
                  label="Pilih Jam Pelatihan"
                  ref={ref}
                  withSeconds
                  required
                  rightSection={
                    <ActionIcon onClick={() => ref.current.showPicker()}>
                      <IconClock size="1rem" stroke={1.5} />
                    </ActionIcon>
                  }
                  {...form.getInputProps("waktu_pelatihan")}
                  maw={400}
                  mx="auto"
                />
                <Space h="md" />
                <TextInput
                  withAsterisk
                  label="Link Pelatihan"
                  placeholder="Link Pelatihan"
                  {...form.getInputProps("link_pelatihan")}
                />
                <Space h="md" />
                <TextInput
                  withAsterisk
                  label="Max Peserta per Batch"
                  placeholder="Max Peserta per Batch"
                  {...form.getInputProps("max_pesertabatch")}
                />
              </Grid.Col>

              <Text fw={500}>Konten Pelatihan</Text>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
              <div dangerouslySetInnerHTML={{ __html: htmlNya }} />
            </Grid>

            <Group position="right" mt="md">
              <Button type="submit" onClick={handleInsert}>
                Submit
              </Button>
              <Button variant="outline" color="indigo" onClick={setRichText}>
                Coba Set
              </Button>
            </Group>
            {/* <Button onClick={dateparse}>test date</Button>
            <Button onClick={timeparse}>test time</Button> */}
          </form>
        </Box>
      </Modal>
      {/* end modal add pelatihan */}

      <Space h="md" />

      <Title tt="capitalize">Pelatihan</Title>

      <Space h="md" />
      <Group position="center">
        <Button
          variant="outline"
          color="indigo"
          onClick={(e) => handleOpenAddModal(e)}>
          Add Pelatihan
        </Button>
      </Group>

      {/* search bar start */}
      <TextInput
        placeholder="Search Pelatihan"
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
            <th>Judul Pelatihan</th>
            <th>Deskripsi Pelatihan</th>
            <th>Nama Narasumber</th>
            <th>Tanggal Pelatihan Mulai</th>
            <th>Tanggal Pelatihan Akhir</th>
            <th>Jam Pelatihan</th>
            <th>Link Pelatihan</th>
            <th>Max Peserta per Batch</th>
            <th>Username Penyelenggara</th>
            <th>Username ACC pelatihan</th>
            <th>Tanggal ACC Pelatihan</th>
            <th>Waktu ACC Pelatihan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => (
            <tr key={e.id_pelatihan}>
              <td>{e.judul_pelatihan}</td>
              <td>{e.deskripsi_pelatihan}</td>
              <td>{e.nama_narasumber}</td>
              <td>{formatdatepelatihan(e.tanggal_pelatihan_start)}</td>
              <td>{formatdatepelatihan(e.tanggal_pelatihan_end)}</td>
              <td>{formattimepelatihan(e.waktu_pelatihan)}</td>
              <td>
                <Anchor href={e.link_pelatihan} target="_blank">
                  {e.link_pelatihan}
                </Anchor>
              </td>
              <td>{e.max_pesertabatch}</td>
              <td>{e.username_penyelenggara}</td>
              <td>{e.username_acc}</td>
              <td>{formatdatepelatihan(e.tanggal_pelatihan_acc)}</td>
              <td>{formattimepelatihan(e.waktu_pelatihan_acc)}</td>
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
                  <Button
                    variant="outline"
                    color="yellow"
                    onClick={() => {
                      handleOpenEditModal(e);
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={() => {
                      openlihatpesertaModal(e);
                    }}>
                    Lihat Peserta
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => {
                      openSelesaiModal(e);
                    }}>
                    Pelatihan Selesai
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

export default pelatihan;
