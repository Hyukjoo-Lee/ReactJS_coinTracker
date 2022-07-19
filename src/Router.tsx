import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {

}

function Router({}: IRouterProps) {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/:coinId/*" element={<Coin/>}></Route>
                <Route path="/" element={<Coins />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;