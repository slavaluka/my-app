import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Typography } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
      // https://avatars.githubusercontent.com/u/52038455?v=4
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Avatar
              src={session?.user?.image || ""}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5">Welcome, {session?.user?.name}</Typography>
            <Typography variant="h6">
              Signed in as {session?.user?.email}{" "}
            </Typography>
            <br />
            <Button variant="contained" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
          {repos && (
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          )}
          {repos.length === 0 && (
            <h1 style={{ color: "white" }}>
              We were not able to get your data!
            </h1>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="contained" onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
};

export default Login;
