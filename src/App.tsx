import { useState, useEffect, useRef, SyntheticEvent, forwardRef } from "react";
import { BigNumber } from "ethers";
import useStake from "./hooks/useStake";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const zero = BigNumber.from(0);

  const {
    stake,
    getStakedTokens,
    setStakedTokens,
    stakedTokens,
    loading,
    setIdToStake,
    idToStake,
    withdraw,
    idToWithdraw,
    setIdToWithdraw,
    claimRewards,
    availableRewards,
    reward,
  } = useStake();

  const [open, setOpen] = useState(false);

  async function handleGetStakedTokens() {
    let success = getStakedTokens();
    setStakedTokens([]);
    if (await success) setOpen(true);
  }

  async function handleClaimRewards() {
    let success = await claimRewards();
    if (success) setOpen(true);
  }

  async function handleStake() {
    let success = await stake(idToStake!);
    if (success) setOpen(true);
  }

  async function handleWithdraw() {
    let success = await withdraw(idToWithdraw!);
    if (success) setOpen(true);
  }

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function handleCheckRewards() {
    let success = await availableRewards();
    if (await success) setOpen(true);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">
        "CryptoDevs" NFT staking machineryyyy
      </Typography>
      <Divider sx={{ margin: "20px 0" }} />
      <Box>
        <Typography variant="h5">CLAIM REWARDS</Typography>
        <Button color="error" variant="contained" onClick={handleClaimRewards}>
          CLAIM REWARDS
        </Button>
        <Box>
          <Typography>⠀</Typography>
        </Box>
        <Button color="error" variant="contained" onClick={handleCheckRewards}>
          Check rewards
        </Button>
        <Typography color="green" variant="h6" fontSize={30}>{reward != undefined && reward}</Typography>
      </Box>
      <Divider sx={{ margin: "20px 0" }} />
      <Box>
        <Typography variant="h5">STAKE</Typography>
        <TextField
          label="Enter token ID to stake"
          variant="filled"
          value={idToStake}
          onChange={(e) => setIdToStake(e.target.value)}
        />
        <Button color="error" variant="contained" onClick={handleStake}>
          Stake token
        </Button>
      </Box>
      <Divider sx={{ margin: "20px 0" }} />
      <Box>
        <Typography variant="h5">WITHDRAW</Typography>
        <TextField
          label="Enter token ID to withdraw"
          variant="filled"
          value={idToWithdraw}
          onChange={(e) => setIdToWithdraw(e.target.value)}
        />
        <Button color="error" variant="contained" onClick={handleWithdraw}>
          Withdraw token
        </Button>
      </Box>
      <Divider sx={{ margin: "20px 0" }} />
      <Box>
        <Typography variant="h5">CHECK STAKED TOKENS</Typography>
        <Button color="error" variant="contained" onClick={handleGetStakedTokens}>
          Get staked tokens
        </Button>
        <List>
          {stakedTokens &&
            stakedTokens.map((e) => {
              return (
                <ListItem>
                  <ListItemText>
                    <div>Owner: {e[0]}</div>
                    <div>Token ID: {e[1].toNumber()}</div>
                  </ListItemText>
                </ListItem>
              );
            })}
        </List>
        <div>{loading && <CircularProgress />}</div>
      </Box>
      <Box>
        <img src="https://influencermarketinghub.com/wp-content/uploads/2022/05/Top-100-Crypto-Memes-of-2022-18-cant-stop-cryptos.jpg"></img>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Success!
        </Alert>
      </Snackbar>
    </Container>
  );
}
