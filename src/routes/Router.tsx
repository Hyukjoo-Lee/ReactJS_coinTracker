import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/:coinId" element={<Coin />}></Route>
                <Route path="/" element={<Coins />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;