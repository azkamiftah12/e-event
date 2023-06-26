import { Container, createStyles, Card, Image, Text, Group, Badge, Button, ActionIcon, rem, Space } from '@mantine/core';
import FooterMenu from '@/components/FooterMenu/FooterMenu';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
      },
    
      label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
      },

  }));

const DetailLatihan = () => {
    const { classes, theme } = useStyles();

    const pageStyle = {
        backgroundColor: '#E0DAD1',
      };

    return (<>
        <div style={pageStyle}>
        <HeaderMenu />
        <Space h="xl" />
        <Container>
            <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section className={classes.section}>
                <h1>Judul Pelatihan</h1>
                <text>ini deskripsi judul</text>
            </Card.Section>

            <Card.Section mt="md" className={classes.section}>
                <Group>
                <Text fz="sm" fw={800} className={classes.label}>
                    Tanggal Pelatihan
                </Text>
                <Badge size="md">19 may 2020</Badge>
                </Group>
                <Text fz="md" mt="xl">
                narasumber pelatihan
                </Text>
                <Text fz="sm" mt="xs">
                lorem ipsum
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                Bebas mau ngisi apa aja
                </Text>
            </Card.Section>
            </Card>
        </Container>
        <Space h="xl" />
        <FooterMenu />
        </div>
            </>
    );
};
export default DetailLatihan;
