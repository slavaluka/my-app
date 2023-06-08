import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Typography } from "@mui/material";

const login = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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

export default login;
