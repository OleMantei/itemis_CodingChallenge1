import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Footer({ title, subtitle }) {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {subtitle}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
