import React, { useEffect } from 'react';
import {
    MergeOutlined,
    MessageOutlined,
    OpenAIOutlined,
    RobotOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const RootLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('Channel', '/channels', <MessageOutlined />),
        getItem('AI', '/ais', <OpenAIOutlined />),
        getItem('Bot', '/bots', <RobotOutlined />),
        getItem('Intergration', '/intergrations', <MergeOutlined />),
    ];

    useEffect(() => {
        if (location.pathname === '/') navigate('/channels');
    }, [navigate, location]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{ background: colorBgContainer }}
            >
                <div
                    className="app-logo-sidebar"
                    style={{
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="/public/discord-logo.png"
                        width="60%"
                        height="65px"
                    />
                </div>
                <Menu
                    theme="light"
                    defaultSelectedKeys={[
                        location.pathname === '/'
                            ? '/channels'
                            : location.pathname,
                    ]}
                    mode="inline"
                    items={items}
                    onClick={(menuInfo) => navigate(menuInfo.key)}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default RootLayout;
