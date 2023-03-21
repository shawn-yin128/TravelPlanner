import {Button, Dropdown, Layout, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";
import Text from "antd/lib/typography/Text";
import {Link} from "react-router-dom";
import Main from "./Main";
import {useState} from "react";
import background from '../assets/images/background.jpg';
import logo from '../assets/images/logo.svg';

const App = () => {
    const [authed, setAuthed] = useState(false);

    const navStyle = {
        fontSize: '100%',
        color: '#0a1612',
        fontFamily: 'Monaco',
        fontWeight: 'bold'
    };

    const handleLogin = (token) => {
        localStorage.setItem("Token", token);
        setAuthed(true);
    }

    const handleLogout = () => {
        localStorage.removeItem("Token");
        setAuthed(false);
    }

    const items = [
        {
            label: <Text onClick={handleLogout}>Log Out</Text>,
            key: '0'
        }
    ];

    return (
        <Layout style={{height: '100vh', backgroundImage: `url(${background})`}}>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: "rgba(255,255,255,0.3)",
                height: '6vh'
            }}>
                <Space size="large">
                    <img src={logo} alt="logo" style={{
                        textAlign: 'center',
                        minHeight: '5vh',
                        overflow: 'hidden',
                        display: 'block',
                        position: 'relative'
                    }}/>
                    <Link style={navStyle} to="/">Plan</Link>
                    {authed &&
                        <>
                            <Link style={navStyle} to="/collection">Collections</Link>
                            <Link style={navStyle} to="/share">Share</Link>
                        </>
                    }
                </Space>
                {!authed ?
                    <Space size="large">
                        <Link style={navStyle} to="/login">Sign In</Link>
                        <Link style={navStyle} to="/register">Sign Up</Link>
                    </Space>
                    :
                    <Space>
                        <Dropdown trigger="click" menu={{items}}>
                            <Button style={navStyle} icon={<UserOutlined/>} ghost="true">Profile</Button>
                        </Dropdown>
                    </Space>
                }
            </Header>
            <Content style={{margin: '20px 30px'}}>
                <div style={{height: '90vh', padding: 10, borderRadius: '10px', background: "rgba(255,255,255,0.15)"}}>
                    <Main authed={authed} handleLogin={handleLogin}></Main>
                </div>
            </Content>
        </Layout>
    );
}

export default App;
