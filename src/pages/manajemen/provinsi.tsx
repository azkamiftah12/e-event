import { Box, Button, Checkbox, Group, Modal, Space, Table, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Layout, { ipaddress, headerauthorization } from '../../components/layout';

const provinsi = () => {
  const [data, setData] = useState([]);
  
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
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // eslint-disable-next-line arrow-body-style
  const filteredData = data.filter((item) => {
    return item.nama_provinsi?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });
  //search end
  return (
    <Layout>
      <TextInput
        placeholder="Search Provinsi"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: '16px' }}
      />
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
