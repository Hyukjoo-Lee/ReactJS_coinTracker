import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

interface PriceProps {
    coinId: string;
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
        font-weight: bold;
        text-transform: uppercase;
        color: ${props => props.theme.accentColor};
    }
`;

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
                        <span>
                            ${tickersData?.quotes.USD.price.toFixed(3)}
                        </span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 1 day</span>
                        <span>{tickersData?.quotes.USD.percent_change_24h.toFixed(2)}%</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 15 mins</span>
                        <span>
                            {tickersData?.quotes.USD.percent_change_15m.toFixed(2)}%
                        </span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 30 mins</span>
                        <span>
                            {tickersData?.quotes.USD.percent_change_30m.toFixed(2)}%
                        </span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change rate in 1 hour</span>
                        <span>
                            {tickersData?.quotes.USD.percent_change_1h.toFixed(2)}%
                        </span>
                    </OverviewItem>
                </Overviews>
            )
            }
        </div>
    )
}

export default Price;