import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoin } from "../api";
import { isDarkAtom } from "../atoms";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 40%;
  height: 100%;
  padding: 0 0 30px 72px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #e6463c;
`;

export const Title = styled.h3`
  width: 70%;
  font-size: 3.5em;
  text-transform: uppercase;
  letter-spacing: 5px;
`;

export const Description = styled.h3`
  display: inline-block;
  width: 70%;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.1;
`;

export const SubDescription = styled.p`
  width: 70%;
  line-height: 1.1;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 40px;
  color: #2b2b2b;
`;

export const CoinListContainer = styled.main`
  margin-top: 20px;
  min-height: auto;
  max-height: 1000vh;
  align-content: center;
  justify-content: center;

  display: flex;
  margin-left: 40%;
  background-color: transparent;
`;

const CoinsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(8, 90px);
`;

const Coin = styled.li`
  background-color: transparent;
  display: flex;
  text-align: center;

  a {
    display: block;
    padding: 20px;
  }

  h3 {
    transition: color 0.3s ease-in;
  }

  &:hover {
    h3 {
      color: ${(props) => props.theme.overViewColor};
    }
  }
`;

const CoinSymbol = styled.h3`
  margin-top: 10px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const ToggleBtn = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 90px;
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoin);

  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
  };

  let darkThemeBtn = require(`../images/dark_theme.png`);
  let lightThemeBtn = require(`../images/light_theme.png`);

  return (
    <>
      <Header>
        <Helmet>
          <title>Coin Tracker</title>
        </Helmet>
        <ToggleBtn onClick={toggleDarkAtom}>
          <img
            src={isDark ? darkThemeBtn : lightThemeBtn}
            alt="Toggle Button"
          ></img>
        </ToggleBtn>
        <Title>Coin Tracker</Title>
        <Description>
          Our Coin Tracker that helps you browse short-term changes of top 100
          cryptocurrency. <br />
          <br /> Note that we show you always-up-to-date cryptocurrency
          information.
        </Description>
        <SubDescription>
          Click a coin symbol to track the current updated information through
          charts and price changes.
        </SubDescription>
      </Header>
      <CoinListContainer>
        {isLoading ? (
          <Loader>"Loading..."</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                  <Image
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt="Coin Symbol"
                  />
                  <CoinSymbol>{coin.symbol}</CoinSymbol>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </CoinListContainer>
    </>
  );
}

export default Coins;
