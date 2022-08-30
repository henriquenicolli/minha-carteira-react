import React from 'react';

import logoImg from '../../assets/logo.svg';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';

import {
    Container,
    Header,
    Title,
    LogImg,
    MenuContainer,
    MenuItemLink

} from './styles';

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogImg src={logoImg} alt="Logo Minha Cartteira"></LogImg>
                <Title>Minha carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='#'>
                    <MdDashboard></MdDashboard>
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href='#'>
                    <MdArrowUpward></MdArrowUpward>
                    Entradas
                </MenuItemLink>

                <MenuItemLink href='#'>
                    <MdArrowDownward></MdArrowDownward>
                    Saidas
                </MenuItemLink>

                <MenuItemLink href='#'>
                    <MdExitToApp></MdExitToApp>
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    );
}

export default Aside;