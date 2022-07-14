import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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
    background-color:#e84118;
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

function Coin() {
    const [loading, setLoading] = useState(true);

    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    const { coinId } = useParams();
    // Over react-router-dom v6, use as ...
    const { state } = useLocation() as LocationState;


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
                    {/* if there is state, show state name 
                     OR 
                     if loading is in progress, show "Loading...", if not loading, show the name received from API 
                     */}
                    {state?.name ? state.name : loading ? "Loading..." : null}
                </Title>
            </Header>
            {loading ? (
                "Loading..."
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>1</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>$BTC</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source</span>
                            <span>Yes</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{ } Description </Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>2100000</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>2100000</span>
                        </OverviewItem>
                    </Overview>
                </>
            )
            }

        </Container>
    )
}

export default Coin;