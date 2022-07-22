import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/user";
import { Button } from "../styles";

function NavBar() {
  const { setUser } =  useContext(UserContext);
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Profile>
        <Button as={Link} to="/profile">
          Profile
        </Button>
      </Profile>
      <Logo>
        <Link to="/">Food Truck<br/>Forum</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/pages">
          Food Trucks
        </Button>
        <Button as={Link} to="/new">
          New Food Truck
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
const Profile = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 8px;
  left: 8px;
`;

const Logo = styled.h1`
  font-family: "Papyrus", cursive;
  font-size: 3rem;
  color: goldenrod;
  margin: 10px;
  line-height: 1;
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
  top: 8px;
`;

export default NavBar;
