import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoin } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 20px;
  max-width: fit-content;
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
  display: grid;

  grid-template-columns: repeat(4, 100px);
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

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
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
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
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <ToggleBtn onClick={toggleDarkAtom}>
          <img
            src={isDark ? darkThemeBtn : lightThemeBtn}
            alt="Toggle Button"
          ></img>
        </ToggleBtn>
      </Header>
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
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
