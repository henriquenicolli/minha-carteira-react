import React from 'react';

import { Grid } from './styles';

import MainHeader from '../MainHeader';
import Aside from '../Aside';
import Content from '../Content';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Grid>
            <MainHeader></MainHeader>
            <Aside></Aside>
            <Content>
                {children}
            </Content>
        </Grid>
    );
}

export default Layout;