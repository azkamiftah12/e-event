import { Button, Group, Text, rem, useMantineTheme } from '@mantine/core';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import FooterMenu from '@/components/FooterMenu/FooterMenu';
import HeroContent from '@/components/HeroContent/HeroContent';
import HeroContent2 from '@/components/HeroContent/HeroContent2';

export default function HomePage() {
  const pageStyle = {
    backgroundColor: "#E0DAD1",
  };

  return (
    <>
      <div style={pageStyle}>
        <HeaderMenu />
        <HeroContent />
        <HeroContent2 />
        <FooterMenu />
      </div>
    </>
  );
}
