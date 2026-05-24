import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
    return (
        <Navbar bg={"primary"}>
            <Container>
                <Navbar.Brand href={"/"}>Hyper Cinema </Navbar.Brand>
                <Nav>
                    <Nav.Link href={"/login"} className={"justify-content-end"}>Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
