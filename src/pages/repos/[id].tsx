import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";

interface RepoData {
  full_name: string;
  description: string;
  visibility: string;
  forks: number;
  clone_url: string;
  language: string;
}

const RepoPage = () => {
  const router = useRouter();
  const { id, data } = router.query;
  const [repoData, setRepoData] = useState<RepoData | null>(null);

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data.toString());
      setRepoData(parsedData);
    }
  }, [data]);

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
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {repoData.full_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {repoData.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Visibility: {repoData.visibility}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Number of Forks: {repoData.forks}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Clone URL: {repoData.clone_url}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Language: {repoData.language}
        </Typography>
      </Paper>
    </Container>
  );
};

export default RepoPage;
