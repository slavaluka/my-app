import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import DrawerAppBar from "../components/navbar/navbar";
import {
  Avatar,
  Button,
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import theme from "../theme";

const Login = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any>([]);
  console.log(session);

  const fetchData = async (id: string) => {
    console.log(id);
    const res = await axios.get<any>(`https://api.github.com/user/${id}`);

    if (res?.data?.repos_url) {
      const repos = await axios.get<any>(res?.data?.repos_url);
      return repos;
    }

    console.log(res);
  };

  useEffect(() => {
    if (session) {
      const url = session?.user?.image;
      const regex = /\/u\/(\d+)\?v=4/;
      const match = url?.match(regex);

      if (match && match[1]) {
        const value = match[1];
        fetchData(value)
          .then((p) => setRepos(p))
          .catch((e) => console.log(e));
      } else {
        console.log("No match found");
      }
    }
  }, [session]);

  if (session) {
    return (
      <>
        <Container maxWidth="lg" sx={{ mt: 12 }}>
          <ThemeProvider theme={theme}>
            <DrawerAppBar />
          </ThemeProvider>
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={session?.user?.image || ""}
              sx={{
                width: 150,
                height: 150,
                mb: 3,
                "&:hover": {
                  border: "2px solid white",
                  borderRadius: "50%",
                },
              }}
            />

            <ThemeProvider theme={theme}>
              <Typography variant="h4" sx={{ color: "white" }}>
                Welcome, {session?.user?.name}
              </Typography>

              <Typography sx={{ color: "white" }}>
                Signed in as {session?.user?.email}
              </Typography>
            </ThemeProvider>
            <br />
          </Box>

          {repos && (
            <TableContainer
              component={Paper}
              sx={{
                mt: 2,
                backgroundColor: "#191919",
                borderRadius: "10px",
                border: "1px solid gray",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Repo name</TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      Language
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      Watchers&nbsp;
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      Forks&nbsp;
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      Id&nbsp;
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repos?.data?.map((repo: any) => (
                    <TableRow
                      key={repo.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "white",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "white" }}
                      >
                        {repo.name}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "white" }}>
                        {repo.language}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "white" }}>
                        {repo.watchers}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "white" }}>
                        {repo.forks}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "white" }}>
                        {repo.id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {repos.length === 0 && (
            <Typography variant="h6" sx={{ fontWeight: "600", color: "white" }}>
              We were not able to get your data!
            </Typography>
          )}
        </Container>
      </>
    );
  }
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              Login with Github
            </Typography>
            <Typography sx={{ color: "darkgray", mt: 1 }}>
              Press the button below to login into your account
            </Typography>
          </ThemeProvider>

          <Button
            sx={{
              mt: 2,
            }}
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => signIn()}
          >
            Github
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
