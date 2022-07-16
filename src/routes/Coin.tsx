import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Route, Routes, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

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

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const BtnContainer = styled.div`
    display: flex;
    position: fixed;
    top: 20px;
    left: 20px;
`;

const Btn = styled.div`
  border-radius: 50%;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: flex;

  &:hover, &:active {
  color: ${props => props.theme.accentColor};
}
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center ;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0,0,0,0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display:block;
  }
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

export interface PriceData {
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

// Caching React query devtools: 캐쉬에 데이터가 어떤것들이 있는지, Show data explorer
// Fetcher function - key must be unique to be stored and operated properly in the react query cache system.
function Coin() {

    // https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin
    const { coinId } = useParams();
    // Over react-router-dom v6, use as ...
    const { state } = useLocation() as LocationState;
    const priceMatch = useMatch(`/${coinId}/price`);
    const chartMatch = useMatch(`/${coinId}/chart`);

    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
        ["infoData", coinId],
        () => fetchCoinInfo(coinId!),
        {
            refetchInterval: 1000,
        }
    );

    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId!),
        {
            refetchInterval: 1000,
        }
    );

    const loading = infoLoading || tickersLoading;

    let update = tickersData?.last_updated;
    update = new Date();

    const makeTimeDetail = (date: Date) => {

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

    const time = makeTimeDetail(update);

    const updateHour = time[0] + ":" + time[1] + ":" + time[2];

    const updateDate = ((update.getMonth() < 10) ? (
        "0" + (update.getMonth() + 1).toString()
    ) : (
        update.getMonth() + 1
    )) + "/" + update.getDate() + "/" + update.getFullYear();


    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
                <BtnContainer>
                    <Link to={"/"}>
                        <Btn>Home</Btn>
                    </Link>
                </BtnContainer>
            </Header>
            {loading ? (
                "Loading..."
            ) : (
                <>
                    <Outlet />
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Last Update (PDT)</span>
                            <span>{updateHour} {updateDate}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>
                                Chart
                            </Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>
                                Price
                            </Link>
                        </Tab>
                    </Tabs>

                    <Routes>
                        <Route path="price" element={<Price coinId={coinId!} />} />
                        <Route path="chart" element={<Chart coinId={coinId!} />} />
                    </Routes>

                </>
            )
            }

        </Container>
    )
}

export default Coin;