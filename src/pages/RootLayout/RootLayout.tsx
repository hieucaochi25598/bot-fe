import React, { useEffect } from 'react';
import {
    MergeOutlined,
    MessageOutlined,
    OpenAIOutlined,
    RobotOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const RootLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

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
        navigate('/channels');
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsedWidth="0">
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['/channels']}
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
