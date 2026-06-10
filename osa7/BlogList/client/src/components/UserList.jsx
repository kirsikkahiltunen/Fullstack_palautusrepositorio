import { Link } from "react-router-dom"
import { rgbToHex, styled } from "@mui/material/styles"
import { tableCellClasses } from "@mui/material/TableCell"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(0, 31, 77)",
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}))

const UserList = ({ users }) => {
  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Number of blogs created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <StyledTableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </StyledTableCell>
                <StyledTableCell>{user.username}</StyledTableCell>
                <StyledTableCell>{user.blogs.length}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
