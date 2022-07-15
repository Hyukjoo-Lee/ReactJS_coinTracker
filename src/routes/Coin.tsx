import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { updateArrayLiteral } from "typescript";

const Container = styled.div`
    padding: 0px 20px;
    // 화면을 크게 했을 때, 모바일 화면처럼 웹 prop 들을 가운데에 위치 시킴
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
   font-size: 48px;
   color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: black;
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #00a8ff;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

interface LocationState {
    state: {
        name: string;
        rank: number;
    }
};

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {

    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: Date;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    const [loading, setLoading] = useState(true);

    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();

    const { coinId } = useParams();
    // Over react-router-dom v6, use as ...
    const { state } = useLocation() as LocationState;
    console.log(coinId);
    
    let update = priceInfo?.last_updated;
    update = new Date();

    const attachZero = (date: Date) => {

        let arr = [];
        let hour = "";
        let min = "";
        let sec = "";

        if (date.getHours() < 10) { hour = "0" + date.getHours().toString(); } else { hour = date.getHours().toString(); };
        if (date.getMinutes() < 10) { min = "0" + date.getMinutes().toString(); } else { min = date.getMinutes().toString(); };
        if (date.getSeconds() < 10) { sec = "0" + date.getSeconds().toString(); } else { sec = date.getSeconds().toString(); };

        arr[0] = hour;
        arr[1] = min;
        arr[2] = sec;

        return arr;
    };

    const time = attachZero(update);

    const updateHour = time[0] + ":" + time[1] + ":" + time[2];
    const updateDate = update.getMonth() + "/" + update.getDate() + "/" + update.getFullYear();
 
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId])


    return (
        <Container>
            <Header>
                <Title>
                    {/* if there is a state, show the state's name 
                     * OR 
                     * if loading is in progress, show "Loading...", if not loading, show the name received from API 
                     */}
                    {state?.name ? state.name : loading ? "Loading..." : info?.name}
                </Title>
            </Header>
            {loading ? (
                "Loading..."
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>{info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source</span>
                            <span>{info?.open_source ? ("YES") : ("NO")}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply</span>
                            <span>{priceInfo?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                                <span>Last Update (PDT)</span>
                                <span>{updateHour} {updateDate}</span>
                        </OverviewItem>
                    </Overview>
                </>
            )
            }

        </Container>
    )
}

export default Coin;