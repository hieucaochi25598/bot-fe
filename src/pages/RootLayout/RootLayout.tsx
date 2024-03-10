import React, { useEffect } from 'react';
import Logo from '../../assets/logo.svg';
import { Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuKey } from '../../features/app/appSlice';
import { RootState } from '../../app/store/store';
import './RootLayout.css';

const RootLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { menuKey } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/channels');
            dispatch(setMenuKey('/channels'));
        } else {
            dispatch(setMenuKey(location.pathname));
        }
    }, [navigate]);

    return (
        <div
            style={{
                backgroundColor: '#abf600',
                width: '100%',
                height: '100vh',
            }}
        >
            <div style={{ width: '60%', margin: '0 auto' }}>
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            display: 'flex',
                            padding: '20px 0',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    >
                        <img src={Logo} alt="logo" />
                        <div
                            style={{
                                width: 174,
                                height: 20,
                                fontFamily: 'Zen Dots',
                                alignSelf: 'center',
                                fontSize: 20,
                                marginLeft: 16,
                            }}
                        >
                            Connect AI
                        </div>
                    </div>
                    <div
                        className="group-menu-btn"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '30px 0',
                        }}
                    >
                        <Button
                            className={`menu ${
                                menuKey === '/channels' && 'menu-active'
                            }`}
                            onClick={() => {
                                navigate('/channels');
                                dispatch(setMenuKey('/channels'));
                            }}
                        >
                            DATA
                        </Button>
                        <Button
                            className={`menu ${
                                menuKey === '/ais' && 'menu-active'
                            }`}
                            onClick={() => {
                                navigate('/ais');
                                dispatch(setMenuKey('/ais'));
                            }}
                        >
                            AI
                        </Button>
                        <Button
                            className={`menu ${
                                menuKey === '/bots' && 'menu-active'
                            }`}
                            onClick={() => {
                                navigate('/bots');
                                dispatch(setMenuKey('/bots'));
                            }}
                        >
                            BOT
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        height: '70vh',
                        backgroundColor: '#ffffff',
                        borderRadius: 24,
                        border: '2px solid #272833',
                        margin: 'auto',
                        marginTop: 16,
                        marginBottom: 16,
                        padding: '30px 30px 0px 30px',
                        boxShadow: '0px 5px 0px 0px #191A23',
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </div>
                <div style={{ textAlign: 'center' }}>
                    {location.pathname !== '/intergrations' && (
                        <Button
                            style={{
                                width: 177,
                                height: 60,
                                borderRadius: 8,
                                border: '1px solid #ffffff',
                                boxShadow: '0px 4px 4px 0px #000000',
                                fontFamily: 'Porter Sans Block',
                                fontSize: 20,
                                alignSelf: 'center',
                                marginTop: 16,
                                backgroundColor: '#272833',
                                color: '#ffffff',
                            }}
                            onClick={() => navigate('/intergrations')}
                        >
                            PLAY
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
