import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext';

export const NavBar = () => {
    const { isLogged, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="primary">
            <Container>
                <Navbar.Brand href="/">Hyper Cinema</Navbar.Brand>
                {!window.location.href.includes('login') && !window.location.href.includes('registration') &&
                    <Nav>
                        {isLogged ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};
