import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { MdAddCircle } from "react-icons/md";
import { createReceipt } from "./js/receipt";
import { Box } from "@mui/system";
import { useState } from "react";
import Receipt from "./components/Receipt";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const [receipt, setReceipt] = useState({});

  function handleSubmitItem() {
    setBasketItems((basketItems) => [...basketItems, inputValue]);
    setInputValue("");
  }

  function handleResetInterface() {
    setInputValue("");
    setBasketItems([]);
    setReceipt({});
  }

  function handlePrintReceipt() {
    setReceipt(createReceipt(basketItems));
  }

  return (
    <div className="App">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <NavBar
          title="Sales Taxes"
          itemsCount={basketItems.length}
          items={basketItems}
          handleResetInterface={handleResetInterface}
        />
        <Container maxWidth="sm">
          {Object.keys(receipt).length === 0 ? (
            <Box my={6} textAlign="center">
              <Box mb={3}>
                <Typography variant="h4">Add item to basket</Typography>
                <Typography variant="subtitle2" color={"lightgray"}>
                  Please make sure you enter the item like the following: <br />
                  "1 book at 12.49" or "1 imported box of chocolates at 10.00".
                </Typography>
              </Box>
              <Paper elevation={3}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={(e) =>
                      e.key == "Enter" &&
                      inputValue.length !== 0 &&
                      handleSubmitItem()
                    }
                    placeholder="e.g. 1 book at 12.49"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleSubmitItem()}
                          edge="end"
                          color="secondary"
                          disabled={inputValue.length === 0}
                        >
                          <MdAddCircle />
                        </IconButton>
                      </InputAdornment>
                    }
                    title="add item"
                  />
                </FormControl>
              </Paper>
              <Box mt={3}>
                <Button
                  variant="contained"
                  disableElevation
                  disabled={basketItems.length === 0}
                  onClick={() => handlePrintReceipt()}
                >
                  print receipt
                </Button>
              </Box>
            </Box>
          ) : (
            <Receipt receipt={receipt} />
          )}
        </Container>
        <Footer
          title="itemis coding challenge"
          subtitle="solved by Ole Mantei, 2022"
        />
      </Box>
    </div>
  );
}

export default App;
