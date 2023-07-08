/* eslint-disable react-hooks/rules-of-hooks */
import { Badge, Box, Button, Checkbox, CloseButton, Grid, Group, Modal, Select, Space, Table, TextInput, Text, Title } from '@mantine/core';
import axios from 'axios';
import React, { useState, useEffect, Suspense } from 'react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import Layout, { headerauthorization, ipaddress } from '@/components/layout';

const batch = () => {
  //!!!!!!!!
  //BATCH HANYA UNTUK LIHAT DATA SAJA
  //!!!!!!!!
  
    const [data, setData] = useState<any[]>([]);
    
    const getData = async () => {
    const response = await axios.get(`${ipaddress}get-databatch`, headerauthorization);
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
    return item.username_peserta?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });
  //search end

  // datetable parse start
  const formatdatebatch = (sampletanggal: string | number | Date | null | undefined) => {
    // const sampletanggal = '2023-05-21T00:00:00Z';
    if (sampletanggal === '' || sampletanggal == null || sampletanggal === undefined) {
      return '';
    }
    const parsedDate = new Date(sampletanggal);
    return parsedDate.toISOString().split('T')[0];
  };
  // datetable parse end

  // timetable parse start
  const formattimebatch = (sampletime: string | number | Date | null | undefined) => {
    // const sampletanggal = '2023-05-21T00:00:00Z';
    if (sampletime === '' || sampletime == null || sampletime === undefined) {
      return '';
    }
    const parsedTime = new Date(sampletime);
    const formattedTime = parsedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
return formattedTime;
  };
  // timetable parse end

      return (
  <Layout>
    <Space h="md" />
    <Title tt="capitalize">Batch</Title>
    
      {/* search bar start */}
      <TextInput
        placeholder="Search Peserta"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: "16px" }}
        rightSection={
          <CloseButton onClick={handleClear} />
        }
      />
        {/* search bar end */}
      <Space h="md" />
      <Suspense fallback={<div><h1>Loading..</h1></div>}>
        <Table striped highlightOnHover withBorder withColumnBorders>
      <thead>
        <tr>
          <th>ID Batch</th>
          <th>ID Pelatihan</th>
          <th>ID Jenis Acara</th>
          <th>Judul Pelatihan</th>
          <th>Username Peserta</th>
          <th>Deskripsi Batch</th>
          <th>Jadwal Batch</th>
          <th>Waktu Batch</th>
          <th>Link Batch</th>
          <th>tanggal Acc Batch</th>
          <th>Status Acc Batch</th>
          <th>Username Acc</th>
        </tr>
      </thead>
      <tbody>
      {filteredData.map((e) => (
            <tr key={e.id_batch}>
              <td>{e.id_batch}</td>
              <td>{e.id_pelatihan}</td>
              <td>{e.id_jenis_acara}</td>
              <td>{e.judul_pelatihan}</td>
              <td>{e.username_peserta}</td>
              <td>{e.deskripsi_batch}</td>
              <td>{formatdatebatch(e.jadwal_batch)}</td>
              <td>{formattimebatch(e.waktu_batch)}</td>
              <td>{e.link_batch}</td>
              <td>{formatdatebatch(e.tanggal_accbatch)}</td>
              <td>{e.status_accbatch}</td>
              <td>{e.username_acc}</td>
            </tr>
          ))}
      </tbody>
        </Table>
        </Suspense>
  </Layout>
      );
};

export default batch;
