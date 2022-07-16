import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";
import { PriceData } from "./Coin";

interface PriceProps {
    coinId: string;
}

const Container = styled.div`
    padding: 0px 20px;
    width: 100%;
    margin: 0 auto;
`;

function Price({ coinId }: PriceProps) {
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId!),
        {
            refetchInterval: 1000,
        }
    );

    useEffect(() => {
        console.log(tickersData);
    }, []);

    return (
        <Container>
            <h3>Current Price: ${tickersData?.quotes.USD.price.toFixed(3)}</h3>
            <h3>Change rate in 1 day: {tickersData?.quotes.USD.percent_change_24h.toFixed(2)}%</h3>
            <h3>Change rate in 15 mins: {tickersData?.quotes.USD.percent_change_15m.toFixed(2)}%</h3>
            <h3>Change rate in 30 mins: {tickersData?.quotes.USD.percent_change_30m.toFixed(2)}%</h3>
            <h3>Change rate in 1 hour: {tickersData?.quotes.USD.percent_change_1h.toFixed(2)}%</h3>
        </Container>
    );
}

export default Price;