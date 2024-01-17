import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/logo.webp';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);

    const handleNavCollapse = () => {
        setExpanded(!expanded);
    };

    const handleLinkClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar bg="light" expand="lg" className='NavBar' expanded={expanded}>
            <Container className='container'>
                <Navbar.Brand href="/"><img src={logo} alt="LogoTiendaFashion" className='logo' /></Navbar.Brand>
                <Navbar.Toggle onClick={handleNavCollapse} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" onClick={handleLinkClick} className='enlaces' id='home'>Home</NavLink>
                        <NavLink to="/products" onClick={handleLinkClick} id='products' className='enlaces'>Productos</NavLink>
                        <NavDropdown title="Categorias" className='enlacesDes' id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/category/Smartphones" onClick={handleLinkClick} className='enlaces'>Smartphones</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/category/Notebooks" onClick={handleLinkClick} className='enlaces'>Notebooks</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/category/Console" onClick={handleLinkClick} className='enlaces'>Console</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                    <div onClick={handleLinkClick}>
                        <CartWidget/>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;



