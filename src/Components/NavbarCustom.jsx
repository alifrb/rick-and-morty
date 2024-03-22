import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarCustom = ({ query, setQuery }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <div className="row m-0 p-0 w-100 align-items-center">
            <div className="col-2">
              <img
                className="navbar-logo"
                src="./images/rick-and-morty-logo.png"
                alt="logo"
              />
            </div>
            <Nav className="me-auto col-7">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">About Me</Nav.Link>
            </Nav>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                console.log(e.target.value);
              }}
              className="col-3 nav-search"
              placeholder="Search here ..."
            />
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCustom;
