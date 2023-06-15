import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Repo {
  name: string;
  language: string;
  watchers: number;
  forks: number;
  id: number;
}

interface TableComponentProps {
  searchResults: Repo[];
  displayedRepos: number;
}

const TableComponent: React.FC<TableComponentProps> = ({
  searchResults,
  displayedRepos,
}) => {
  return (
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
          {searchResults.slice(0, displayedRepos).map((repo: Repo) => (
            <TableRow
              key={repo.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                color: "white",
              }}
            >
              <TableCell component="th" scope="row" sx={{ color: "white" }}>
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
  );
};

export default TableComponent;
