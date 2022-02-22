import { View, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useWatchListContext } from '../context/WatchlistContext'
import CoinItem from '../components/CoinItem';
import { getWatchListedCoins } from '../services/api';

const WatchlistScreen = () => {

    const { watchListCoinId } = useWatchListContext();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const parseCoinId = () => watchListCoinId.join('%2C');

    const fetchWatchListedCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const data = await getWatchListedCoins(parseCoinId());
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        if (watchListCoinId.length > 0) {
            fetchWatchListedCoins();
        }
    }, [watchListCoinId])

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#121212',
                paddingTop: 30
            }}
        >
            <FlatList
                data={coins}
                renderItem={({ item }) => <CoinItem marketCoin={item} />}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        tintColor="#fff"
                        onRefresh={watchListCoinId.length > 0 ? fetchWatchListedCoins : null}
                    />
                }
            />
        </View>
    )
}

export default WatchlistScreen