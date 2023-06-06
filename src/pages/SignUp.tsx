import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Group, Button, Stack, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderMenu from '../components/HeaderMenu/HeaderMenu';
import FooterMenu from '../components/FooterMenu/FooterMenu';
import { headerauthorization, ipaddress } from '../components/layout';
  
  const SignUp = () => {
    const [data, setData] = useState([]);
    const router = useRouter();
    const pageStyle = {
        backgroundColor: '#E0DAD1',
      };

      const getDataProvinsi = async () => {
        const response = await axios.get(`${ipaddress}get-dataprovinsi`, headerauthorization);
        console.log(response.data.data);
        const temporaryData = response.data.data.map(v => ({ label: v.nama_provinsi, value: v.id_provinsi }));
        setDataProvinsi(temporaryData);
      };
    
      const getDataKabupaten = async () => {
        const response = await axios.get(`${ipaddress}get-datakabkot`, headerauthorization);
        console.log(response.data.data);
        // const temporaryData = response.data.data.map(v => ({ label: v.nama_kabkot, value: v.id_kabkot }));
        setListKabupaten(response.data.data);
      };
    
      const getDataPekerjaan = async () => {
        const response = await axios.get(`${ipaddress}get-datapekerjaan`, headerauthorization);
        console.log(response.data.data);
        const temporaryData = response.data.data.map(v => ({ label: v.nama_job, value: v.id_pekerjaan }));
        setDataPekerjaan(temporaryData);
      };
      
      const [searchValue, onSearchChange] = useState('');

      useEffect(() => {
        getDataProvinsi();
        getDataKabupaten();
        getDataPekerjaan();
      }, []);

      const [searchValueProvinsi, onSearchChangeProvinsi] = useState('');
  const [searchValueKabupaten, onSearchChangeKabupaten] = useState('');
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);

  const handleProvinsiChange = (event) => {
    const selectedOption = dataProvinsi.find((option) => option.label === event);
    const id_provinsi = selectedOption ? selectedOption.value : '';
    console.log(id_provinsi);
    console.log(listKabupaten);
    onSearchChangeProvinsi(event);
    const data = listKabupaten.filter((v) => v.id_provinsi == id_provinsi);
    console.log(data);
    const temporaryData = data.map(v => ({ label: v.nama_kabkot, value: v.id_kabkot }));
    setDataKabupaten(temporaryData);
  };

      //form start
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      nama_user: '',
      id_provinsi: '',
      id_kabkot: '',
      id_pekerjaan: '',
      notelp: '',
    },
    
    validate: {
      username: (value) => (value.length < 2 ? 'Masukkan Username' : null),
      email: (value) => (value.length < 2 ? 'Masukkan Email' : null),
      password: (value) => (value.length < 8 ? 'password minimal 8 karakter' : null),
      nama_user: (value) => (value.length < 2 ? 'Masukkan Nama' : null),
      id_provinsi: (value) => (value.length < 2 ? 'Masukkan ID Provinsi' : null),
      id_kabkot: (value) => (value.length < 2 ? 'Masukkan ID Kabupaten' : null),
      id_pekerjaan: (value) => (value.length < 2 ? 'Masukkan ID Pekerjaan' : null),
      notelp: (value) => (value.length < 2 ? 'Masukkan No Telp' : null),
    },
  });
  //Form End
  
  //signup start
      const handlesignup = async () => {
        const { username } = form.values;
    const { email } = form.values;
    const { password } = form.values;
    const { nama_user } = form.values;
    // eslint-disable-next-line max-len
    const selectedOptionProvinsi = dataProvinsi.find((option) => option.label === searchValueProvinsi);
    const id_provinsi = selectedOptionProvinsi ? selectedOptionProvinsi.value : '';
    
    // eslint-disable-next-line max-len
    const selectedOptionKabupaten = dataKabupaten.find((option) => option.label === searchValueKabupaten);
    const id_kabkot = selectedOptionKabupaten ? selectedOptionKabupaten.value : '';
    
    const selectedOptionPekerjaan = dataPekerjaan.find((option) => option.label === searchValue);
    const id_pekerjaan = selectedOptionPekerjaan ? selectedOptionPekerjaan.value : '';
    
    const { notelp } = form.values;
    
    // Validate form fields
    const errors = form.validate();
    if (errors.hasErrors) {
      // If there are validation errors, you can handle them accordingly
      console.log(errors);
      return;
    }
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    bodyFormData.append('nama_user', nama_user);
    bodyFormData.append('id_provinsi', id_provinsi);
    bodyFormData.append('id_kabkot', id_kabkot);
    bodyFormData.append('id_pekerjaan', id_pekerjaan);
    bodyFormData.append('notlp', notelp);
    bodyFormData.append('role_user', 'Peserta');
    
    try {
      await axios.post(`${ipaddress}insert-datauser`, bodyFormData, headerauthorization);
      router.push('/Login');
    } catch (error) {
      // Handle the error
      console.error(error);
    }
      };
      //signup start

  return (
    <div style={pageStyle}>
    <HeaderMenu />
      <Container size={500} my={50}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
            fontSize: '45px',
          })}
        >
        Create an Account
        </Title>
        <Text color="dimmed" size="md" align="center" mt={5} sx={{ marginBottom: '3px' }}>
          Silahkan mengisi semua form dibawah ini untuk melakukan registrasi akun
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
            <TextInput
              label="Username"
              placeholder="Insert Username Here"
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Name"
              placeholder="Insert Name Here"
              required
              {...form.getInputProps('nama_user')}
            />
            <TextInput 
              label="Email"
              placeholder="example@email.com"
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Insert Password Here"
              required
              {...form.getInputProps('password')}
            />
            {/* <PasswordInput label="Confirm password" placeholder="Repeat Your Password" required /> */}
            <TextInput
              label="Nomor Telefon"
              placeholder="Nomor Telefon"
              required
              {...form.getInputProps('notelp')}
            />
            <Select
              label="Provinsi"
              placeholder="Pick one"
              searchable
              onSearchChange={handleProvinsiChange} 
              onChange={handleProvinsiChange}
              searchValue={searchValueProvinsi}
              nothingFound="No options"
              data={dataProvinsi}
              {...form.getInputProps('id_provinsi')}
            />
            <Select
              label="Kabupaten"
              placeholder="Pick one"
              searchable
              onSearchChange={onSearchChangeKabupaten}
              searchValue={searchValueKabupaten}
              nothingFound="No options"
              data={dataKabupaten}
              {...form.getInputProps('id_kabkot')}
            />
            <Select
              label="Jenis Pekerjaan"
              placeholder="Pick one"
              searchable
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              nothingFound="No options"
              data={dataPekerjaan}
              {...form.getInputProps('id_pekerjaan')}
            />
            {/* <Text size="sm" sx={{ marginBottom: '-13px' }}>Kabupaten</Text>
            <select id="kabupaten" name="kabupaten" style={{ border: '0.5px solid #ccc', padding: '6px', borderRadius: '4px', fontSize: '13px' }}>
                <option value="kabupaten1">Kabupaten 1</option>
                <option value="kabupaten2">Kabupaten 2</option>
                <option value="kabupaten3">Kabupaten 3</option>
            </select> */}
        </Stack>
          <Group position="apart" mt="md" />
          <Button 
            type="submit"
            fullWidth
            mt="xl"
            onClick={handlesignup}
            styles={(theme) => ({
                root: {
                    backgroundColor: '#e14658',
                    color: '#ffffff',
                    '&:not([data-disabled])': theme.fn.hover({
                    backgroundColor: '#e7b622',
                    color: theme.fn.darken('#3F2661', 0.15),
                    }),
                },
            })}
          >
            Sign Up
          </Button>
          </form>
          <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account ?{' '}
          <Anchor component="a" href="/Login" size="sm">
            Log In
          </Anchor>
          </Text>
        </Paper>
      </Container>
      <FooterMenu />
    </div>
    );
  };
  
export default SignUp;
