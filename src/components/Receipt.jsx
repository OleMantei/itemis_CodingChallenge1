import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Receipt({ receipt }) {
  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ paddingX: 4, paddingY: 5 }}>
          <Typography variant="h6" align="center" color="secondary">
            Thank you for your purchase
          </Typography>
          <Box mt={4}>
            {receipt.items.map((i, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography variant="body1">
                      {i.amount}
                      {i.import ? " imported " : " "}
                      {i.item}:
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      {" " + i.shelfPrice}
                    </Typography>
                  </div>
                </Box>
              );
            })}
            <Typography variant="body2" gutterBottom sx={{ marginTop: 2 }}>
              Sales Taxes: {receipt.salesTaxes}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Total: {receipt.total}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Receipt;
