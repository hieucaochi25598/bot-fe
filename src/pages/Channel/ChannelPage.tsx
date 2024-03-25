import ChannelTable from './components/ChannelTable/ChannelTable';
import { Flex } from 'antd';
import { fetchChannels } from '../../apis/channel';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { setChannels, setTotal } from '../../features/channel/channelSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import InputChannel from './components/InputChannel/InputChannel';

const ChannelPage = () => {
    const { page, pageSize } = useSelector((state: RootState) => state.channel);
    const dispatch = useDispatch();

    const {
        data: channelsData,
        isLoading: isLoadingFetchChannelsData,
        isSuccess: isSuccessFetchChannelsData,
    } = useQuery({
        queryKey: ['fetchChannels', page],
        queryFn: () => fetchChannels({ page, pageSize }),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (isSuccessFetchChannelsData) {
            dispatch(setChannels(channelsData.items));
            dispatch(setTotal(channelsData.totalCount));
        }
    }, [
        isSuccessFetchChannelsData,
        channelsData,
        dispatch,
        setChannels,
        setTotal,
    ]);

    return (
        <>
            <Flex gap="large" vertical justify="space-between">
                <span
                    style={{ fontSize: 24, fontWeight: 400, fontFamily: "Staatliches" }}
                >
                    #DATA
                </span>
                <InputChannel />
                <ChannelTable isLoading={isLoadingFetchChannelsData} />
            </Flex>
        </>
    );
};

export default ChannelPage;
