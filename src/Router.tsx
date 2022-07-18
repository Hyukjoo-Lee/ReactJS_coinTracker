import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
    toggleDark: () => void;
    isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
    return (
        // <BrowserRouter>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/:coinId/*" element={<Coin isDark={isDark} />}></Route>
                {/* 2. Router is sending the function to Coins.tsx */}
                <Route path="/" element={<Coins toggleDark={toggleDark} />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;