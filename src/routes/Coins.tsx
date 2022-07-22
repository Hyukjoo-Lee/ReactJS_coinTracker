import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoin } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const CoinsList = styled.div`

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
        padding: 20px;
    }

    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
   position: absolute;
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


const ToggleBtn = styled.button`
  display: flex;
  background: none;
  border: none;
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 90px;
  }
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
}

function Coins({ }: ICoinsProps) {

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoin);

    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const isDark = useRecoilValue(isDarkAtom);

    const toggleDarkAtom = () => {
        setDarkAtom((prev) => !prev);
        console.log(isDarkAtom);
        console.log(isDark);
    }

    let darkThemeBtn = require(`../images/dark_theme.png`);
    let lightThemeBtn = require(`../images/light_theme.png`);

    return (
        <Container>
            <Helmet>
                <title>
                    Coin
                </title>
            </Helmet>
            <Header>
                <Title>Coin</Title>
                <ToggleBtn onClick={toggleDarkAtom}><img src={isDark ? darkThemeBtn : lightThemeBtn}></img></ToggleBtn>
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