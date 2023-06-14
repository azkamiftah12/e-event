import Layout, {
  headerauthorization,
  ipaddress,
} from "../../components/layout";
import LayoutPenyelenggara from "@/components/layoutpenyelenggara";
import axios from "axios";

const pelatihanditolak = () => {
  const getData = async () => {
    const response = await axios.get(
      `${ipaddress}get-datapelatihanpenyelenggara?username_penyelenggara=${username}`,
      headerauthorization
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  return (
    <LayoutPenyelenggara>
      <h1>hahaha</h1>
    </LayoutPenyelenggara>
  );
};
export default pelatihanditolak;
