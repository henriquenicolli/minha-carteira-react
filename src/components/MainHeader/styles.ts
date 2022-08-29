import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;
    color: ${ props => props.theme.color.white };
    background-color: ${ props => props.theme.color.secondary };
`;
