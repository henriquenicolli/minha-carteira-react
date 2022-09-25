import React, { useState, useEffect, useMemo, useCallback } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HisyoryBox';
import BarChartBox from '../../components/BarChartBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import { Container, Content } from './styles'

const Dashboard: React.FC = () => {

    const [ monthSelected, setMonthSelected ] = useState<number>(new Date().getMonth() + 1);
    const [ yearSelected, setYearSelected ] = useState<number>(new Date().getFullYear());
    
    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    },[]);


    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    },[]);


    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount!');
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);


    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount!');
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);


    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);


    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mes, voce gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessarias.",
                icon: sadImg
            }
        } else if (totalBalance === 0 && totalExpenses === 0) {
            return {
                title: "Ops!",
                description: "Neste mes, nao ha registros de entradas ou saidas.",
                footerText: "Parece que voce nao fez nenhum registro do mês selecionado",
                icon: sadImg
            }
        } else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mes, voce gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No proximo mes tente poupar o seu dinheiro.",
                icon: grinningImg
            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira esta positiva!",
                footerText: "Continue assim. Considere investir seu saldo.",
                icon: happyImg
            }
        }
    },[totalBalance, totalGains, totalExpenses]);


    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E'
            },
            {
                name: "Saidas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B'
            }
        ]

        return data;

    },[totalGains, totalExpenses]);


    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        }).forEach((expense) => {
            if (expense.frequency === 'recorrente') {
                return amountRecurrent += Number(expense.amount);
            }

            if (expense.frequency === 'eventual') {
                return amountEventual += Number(expense.amount);
            }
        })
        
        const total = amountRecurrent + amountEventual;
        const percentualRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: percentualRecurrent ? percentualRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]

    },[monthSelected, yearSelected]);


    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        }).forEach((gain) => {
            if (gain.frequency === 'recorrente') {
                return amountRecurrent += Number(gain.amount);
            }

            if (gain.frequency === 'eventual') {
                return amountEventual += Number(gain.amount);
            }
        })
        
        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]

    },[monthSelected, yearSelected]);


    const historyData = useMemo(() => {

        return listOfMonths.map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount);
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number');
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount);
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number');
                    }
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substring(0, 3),
                amountEntry,
                amountOutput
            }
        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear);
        })
    },[yearSelected]);


    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is accept 0 - 24');
        }
    },[]);

    
    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is accept integer numbers');
        }
    },[]);

    
    return (
        <Container>

            <ContentHeader title="Dashboard" lineColor="#F7931b">
                <SelectInput 
                    options={months} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}></SelectInput>

                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}></SelectInput>
            </ContentHeader>

            <Content>
                <WalletBox 
                    title='saldo'
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saidas"
                    icon="dolar"
                    color='#4E41F0'></WalletBox>

                <WalletBox 
                    title='entradas'
                    amount={totalGains}
                    footerLabel="atualizado com baser nas entradas e saidas"
                    icon="arrowUp"
                    color='#F7931B'></WalletBox>

                <WalletBox 
                    title='saidas'
                    amount={totalExpenses}
                    footerLabel="atualizado com baser nas entradas e saidas"
                    icon="arrowDown"
                    color='#E44C4E'></WalletBox>

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}></MessageBox>

                <PieChartBox 
                    data={relationExpensesVersusGains}></PieChartBox>

                <HistoryBox 
                    data={historyData} 
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"></HistoryBox>

                <BarChartBox 
                    title="Saidas" 
                    data={relationExpensevesRecurrentVersusEventual}></BarChartBox>

                <BarChartBox 
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}></BarChartBox>

            </Content>

        </Container>
    );
}

export default Dashboard;