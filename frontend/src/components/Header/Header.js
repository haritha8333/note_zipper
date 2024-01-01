import {
  // Button,
  Form,
  FormControl,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({setSearch}) => {
  let navigate=useNavigate()

  const dispatch=useDispatch();

  const userLogin=useSelector(state=> state.userLogin)
  const {userInfo}=userLogin;

  const logoutHandler=()=>{
    dispatch(logout())
    navigate("/")
  }
  return (
    <Navbar bg="primary" varient="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Note Zipper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline className="ml-auto d-flex align-items-centre">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav>
              <Nav.Link href="/mynotes">
                <Link to="/mynotes"></Link>
                {/* no refresh happens here */}
                My Notes
              </Nav.Link>
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
              <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  <Link to="/profile">My Profile</Link>
                </NavDropdown.Item>
            
                {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              {" "}
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
