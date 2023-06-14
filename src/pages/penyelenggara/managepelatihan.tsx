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
import { Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
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
} from "../../components/layout";
import LayoutPenyelenggara from "@/components/layoutpenyelenggara";
import Cookies from "js-cookie";

// const content =
//   '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

const managepelatihan = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const ref = useRef<HTMLInputElement>();

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

  //get token from cookies start
  const username = Cookies.get("username");
  //get token from cookies end

  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanpenyelenggara?username_penyelenggara=${username}`,
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
    const temporaryData = response.data.data.map((v) => ({
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
    const temporaryData = response.data.data.map((v) => ({
      label: v.nama_narasumber,
      value: v.id_narasumber,
    }));
    setDataNarasumber(temporaryData);
  };

  const getDatalihatpeserta = async (id_pelatihan) => {
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

  const [datalihatpeserta, setDataLihatPeserta] = useState([]);

  //search lihat peserta start
  const [searchTermlihatpeserta, setSearchTermlihatpeserta] = useState("");
  const handleSearchlihatpeserta = (event) => {
    setSearchTermlihatpeserta(event.target.value);
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
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  // const [openedlihatpesertaModal, { open: openlihatpesertaModal, close: closelihatpesertaModal }] = useDisclosure(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openlihatpesertaModal = async (e) => {
    await getDatalihatpeserta(e.id_pelatihan);
    setSelectedData(datalihatpeserta);
    setIsModalOpen(true);
  };
  // modal end

  //form start
  const form = useForm({
    initialValues: {
      id_jenis_acara: "",
      judul_pelatihan: "",
      deskripsi_pelatihan: "",
      nama_narasumber: "",
      tanggal_pelatihan_start: new Date(),
      tanggal_pelatihan_end: "",
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

  const [dataJenisacara, setDataJenisacara] = useState([]);

  const [dataNarasumber, setDataNarasumber] = useState([]);
  const [searchValueNarasumber, onSearchChangeNarasumber] = useState("");

  const [content, setContent] = useState(
    "<h1><mark>-- -- -- -- Jadwal 1 -- -- -- --</mark></h1><p><strong>Jam :<br>Link Zoom :</strong></p><p></p><h1><mark>-- -- -- -- Jadwal 2 -- -- -- --</mark></h1><p><strong>Jam :<br>Link Zoom :</strong></p>"
  );
  const [htmlNya, setHtmlNya] = useState("");
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
    // ...(content && { content }),
    // ...(setContent && { setContent }),
    onUpdate(props) {
      const val = props.editor.getHTML();
      setContent(val);
    },
  });

  //Insert
  const handleInsert = async () => {
    const { id_jenis_acara } = form.values;
    const { judul_pelatihan } = form.values;
    const { deskripsi_pelatihan } = form.values;
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
    bodyFormData.append("username_penyelenggara", username);
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
        close(false);
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
  const handleDelete = async (id_pelatihan) => {
    const bodyFormData = new FormData();
    console.log(id_pelatihan);
    bodyFormData.append("idpelatihan", id_pelatihan);
    await axios.post(
      `${ipaddress}delete-datapelatihan/:${id_pelatihan}`,
      bodyFormData,
      headerauthorization
    );
    notifyerror("Delete Successfully");
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

  //selesai start
  const handleSelesai = async (id_pelatihan) => {
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
  const openSelesaiModal = (e) => {
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
  const formatdatepelatihan = (sampletanggal) => {
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
  const formattimepelatihan = (sampletime) => {
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

  return (
    <LayoutPenyelenggara>
      {/* modal Modal lihat peserta start */}
      <Modal
        size="70%"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lihat Peserta Pelatihan"
        centered
      >
        {selectedData && (
          <Box my="lg" mx="auto" mah="70%" maw="70%">
            <TextInput
              placeholder="Search peserta"
              value={searchTermlihatpeserta}
              onChange={handleSearchlihatpeserta}
              style={{ marginTop: "16px" }}
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
      {/* modal Lihat Peserta End */}

      <Modal
        size="70%"
        opened={opened}
        onClose={close}
        title="Add pelatihan"
        centered
      >
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
                  settings={{ firstDayOfWeek: 1, weekendDays: [0] }}
                >
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
                  settings={{ firstDayOfWeek: 1, weekendDays: [0] }}
                >
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

                <RichTextEditor.Content
                  {...form.getInputProps("deskripsi_pelatihan_khusus")}
                />
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
      <Space h="md" />
      <Group position="center">
        <Button variant="outline" color="indigo" onClick={open}>
          Add Pelatihan
        </Button>
      </Group>

      <TextInput
        placeholder="Search pelatihan"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
      />

      <Space h="md" />

      <Text>
        Total Pelatihan Saya:
        <Badge color="pink" size="lg" variant="light">
          {filteredData.length}
        </Badge>
      </Text>

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
                  wrap="wrap"
                >
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => openDeleteModal(e)}
                  >
                    Delete
                  </Button>
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
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={() => {
                      openlihatpesertaModal(e);
                    }}
                  >
                    Lihat Peserta
                  </Button>
                  <Button
                    variant="outline"
                    color="pink"
                    onClick={() => {
                      openSelesaiModal(e);
                    }}
                  >
                    Pelatihan Selesai
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

export default managepelatihan;
