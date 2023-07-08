/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Checkbox, CloseButton, Group, Modal, Space, Table, TextInput, Text, Badge, Title } from '@mantine/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Layout, { ipaddress, headerauthorization } from '@/components/layout';

const provinsi = () => {
  const [data, setData] = useState<any[]>([]);
  
  const getData = async () => {
    const response = await axios.get(`${ipaddress}get-dataprovinsi`, headerauthorization);
    console.log(response.data.data);
    setData(response.data.data);
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  //search
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };
  const handleClear = () => {
    setSearchTerm('');
  };
  
  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.nama_provinsi?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });
  //search end
  return (
    <Layout>

    <Space h="md" />
  
      <Title
      tt="uppercase"
      fz="xl"
      fw={700}
    >
      Provinsi
    </Title>
      

      {/* search bar start */}
      <TextInput
        placeholder="Search Provinsi"
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
          <th>ID Provinsi</th>
          <th>Provinsi</th>
        </tr>
      </thead>
      <tbody>
      {filteredData.map((e) => (
        <tr key={e.id_provinsi}>
          <td>{e.id_provinsi}</td>
          <td>{e.nama_provinsi}</td>
        </tr>
      ))}
      </tbody>
        </Table>
    </Layout>
  );
};
export default provinsi;
