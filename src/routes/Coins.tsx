import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Befind the scene? 
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

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    a {
        display: block;
        transition: color 0.3s ease-in;
        // Make clickable til whole card space.
        padding: 20px;
    }

    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const CoinsList = styled.ul`

`;

const Title = styled.h1`
   font-size: 48px;
   color: ${props => props.theme.accentColor};
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    margin-left: 20px;
`;

/**
 * Sending the state to path (behind the scene data)
 */
function Coins() {
    // Let CoinInterface is an array of coins
    // Default is the empty array.
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    // Trick - Make a function which is executed immediately ('functions')();
    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Coin</Title>
            </Header>
            {loading ? (
                <Loader>"Loading..."</Loader>
            ) : (
                <CoinsList>
                    {coins.map((coin) =>
                        <Coin key={coin.id}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            <Link to={`/${coin.id}`} state={coin}>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    )}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;