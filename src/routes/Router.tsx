import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins />} />
                {/* /:coinId => tells Router like we will have a param in this part of URL */}
                <Route path="/:coinId/*" element={<Coin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;