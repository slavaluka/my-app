import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import DrawerAppBar from "../../components/navbar/navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

const RepoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [repoData, setRepoData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await axios.get<any>(
            `https://api.github.com/repositories/${id}`
          );
          setRepoData(res.data);
        } else {
          console.log("No repository ID found");
        }
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!repoData) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <DrawerAppBar />
      </ThemeProvider>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {repoData.full_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {repoData.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Language: {repoData.language}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Watchers: {repoData.watchers_count}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Forks: {repoData.forks_count}
        </Typography>
        <Typography variant="body2" gutterBottom>
          ID: {repoData.id}
        </Typography>
      </Paper>
    </Container>
  );
};

export default RepoPage;
