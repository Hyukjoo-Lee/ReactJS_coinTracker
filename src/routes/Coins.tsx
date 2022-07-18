import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoin } from "../api";

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
     background-color: ${props => props.theme.btnColor};
    color: ${(props) => props.theme.bgColor};
    border-radius: 20px;
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

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinsProps {
    toggleDark: () => void;
}

/**
 * Sending the state to path (behind the scene data)
 */
function Coins({toggleDark}: ICoinsProps) {

    /* useQuery hook is going to call your fetchCoin function,
    when fetcher function is loading, react query will let you know 'isLoading(boolean)'
    when fetcher function is done, react query is going to put json into 'data'  */
    // Also react query keeps data in cache.
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoin);

    return (
        <Container>
            <Helmet>
                <title>
                    Coin
                </title>
            </Helmet>
            <Header>
                <Title>Coin</Title>
                <button onClick={toggleDark}>Toggle Dark Mode</button>
            </Header>
            {isLoading ? (
                <Loader>"Loading..."</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) =>
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

// 1. Allow people go back to back (mae)
// 2. Could be able to look more thing about the price
// 3. Chart => Candle stickchards