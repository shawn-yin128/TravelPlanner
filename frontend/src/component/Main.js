import {Route, Routes} from "react-router-dom";
import PlanPage from "./plan/PlanPage";
import CollectionPage from "./collection/CollectionPage";
import SharePage from "./share/SharePage";
import LoginPage from "./user/LoginPage";
import RegisterPage from "./user/RegisterPage";

const Main = (props) => {
    const {authed, handleLogin} = props;

    return (
        <div>
            <Routes>
                <Route path="/" element={<PlanPage authed={authed}/>}/>
                <Route path="/collection" element={<CollectionPage/>}/>
                <Route path="/share" element={<SharePage/>}/>
                <Route path="/login" element={<LoginPage handleLogin={handleLogin}/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </div>
    );
}

export default Main;