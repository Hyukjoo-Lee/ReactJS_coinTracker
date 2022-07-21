import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

interface PriceProps {
    coinId: string;
    growth?: number;
}

const Overviews = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

const OverviewItem = styled.div`
    width: 100%;
    height: 30px;
    background-color: ${props => props.theme.overViewColor};
    border: 2px solid ${props => props.theme.bgColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    margin: 10px 0px;
    padding: 20px;

    span:nth-child(1) {
        font-size: 12px;
        text-transform: uppercase;
        color: ${props => props.theme.textColor};
    }

    span:nth-child(2) {
    font-size: 20px;
    font-weight: 400;
    }
`;

const Percentage = styled.span<{ isPositive?: Boolean }>`
  font-size: 20px;
  font-weight: 400;
  color: ${props => props.isPositive ? "#4cd137" : "tomato"};
`;

const checkGrowth = (growth: number | undefined) => {
    if (growth) {
        return growth > 0;
    }
}


function Price({ coinId }: PriceProps) {
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId!),
        {
            refetchInterval: 3000,
        }
    );

    return (
        <div>
            {tickersLoading ? (
                "Loading Information..."
            ) : (
                <Overviews>
                    <OverviewItem>
                        <span>Current Price</span>
                        <Percentage isPositive={true}>
                            $ {tickersData?.quotes.USD.price.toFixed(3)}
                        </Percentage>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 1 day</span>
                            <Percentage isPositive={checkGrowth(tickersData?.quotes.USD.percent_change_24h) === true}>
                            {tickersData?.quotes.USD.percent_change_24h.toFixed(3)} %
                        </Percentage>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 15 mins</span>
                        <Percentage isPositive={checkGrowth(tickersData?.quotes.USD.percent_change_15m) === true} >
                            {tickersData?.quotes.USD.percent_change_15m.toFixed(3)} %
                        </Percentage>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 30 mins</span>
                        <Percentage isPositive={checkGrowth(tickersData?.quotes.USD.percent_change_30m) === true} >
                            {tickersData?.quotes.USD.percent_change_30m.toFixed(3)} %
                        </Percentage>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 1 hour</span>
                        <Percentage isPositive={checkGrowth(tickersData?.quotes.USD.percent_change_1h) === true} >
                            {tickersData?.quotes.USD.percent_change_1h.toFixed(3)} %
                        </Percentage>
                    </OverviewItem>
                </Overviews>
            )
            }
        </div>
    )
}

export default Price;