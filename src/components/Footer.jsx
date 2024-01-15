import React from "react";
import { Typography, Container, Paper } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Paper elevation={3} style={{ padding: 20, marginTop: 90 }}>
        <Container>
          <Typography
            variant="body2"
            align="center"
            fontWeight="bolder"
            fontSize={20}
          >
            © 2023 Pixako,Design by Zain Mehmood.
          </Typography>
        </Container>
      </Paper>
    </footer>
  );
};

export default Footer;
