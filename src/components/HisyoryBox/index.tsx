import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

//import { Legend } from '../PieChartBox/styles';

import {
    Container, 
    ChartContainer,
    Header,
    LegendContainer,
    Legend
} from './styles';

interface IHistoryBoxProps {
    data: {
        month: string;
        amountEntry: number;
        amountOutput: number;
    }[],
    lineColorAmountEntry: string;
    lineColorAmountOutput: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({ 
    data, lineColorAmountEntry, lineColorAmountOutput }) => (
    <Container>
        <Header>
            <h2>Historico de saldo</h2>

            <LegendContainer>
                <Legend color={lineColorAmountEntry}>
                    <div></div>
                    <span>Entradas</span>
                </Legend>
                <Legend color={lineColorAmountOutput}>
                    <div></div>
                    <span>Saidas</span>
                </Legend>
            </LegendContainer>
        </Header>
        
        <ChartContainer>
            <ResponsiveContainer>
                <LineChart data={data} margin={{top: 5, right: 20, left:20, bottom:5}}>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke='#cecece'></CartesianGrid>

                    <XAxis 
                        dataKey="month" 
                        stroke='#cecece'></XAxis>

                    <Tooltip></Tooltip>
                    
                    <Line 
                        type="monotone" 
                        dataKey="amountEntry" 
                        name='Entradas' 
                        stroke={lineColorAmountEntry}
                        strokeWidth={5} 
                        dot={{r: 5}} 
                        activeDot={{r: 8}}></Line>
                        
                    <Line 
                        type="monotone" 
                        dataKey="amountOutput" 
                        name='Saidas' 
                        stroke={lineColorAmountOutput}
                        strokeWidth={5} 
                        dot={{r: 5}} 
                        activeDot={{r: 8}}></Line>

                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </Container>
)

export default HistoryBox;