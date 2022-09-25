import { createDecipheriv } from 'crypto';
import React from 'react';

import { 
    Container,
    Tag 
} from './styles'

interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({tagColor,title, subtitle, amount}) => (
    <Container>
        <Tag color={tagColor} ></Tag>

        <div>
            <span>{title}</span>
            <small>{subtitle}</small>
        </div>

        <h3>{amount}</h3>
    </Container>
);


export default HistoryFinanceCard;