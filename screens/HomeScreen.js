import React, { useEffect, useState } from 'react'
import { FlatList, View, RefreshControl, Text } from 'react-native'
import CoinItem from '../components/CoinItem';
import { getAllMarketData } from '../services/api';

const HomeScreen = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async (pageNumber) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const data = await getAllMarketData(pageNumber);
        setCoins([...coins, ...data]);
        setLoading(false);
    }

    const refetchCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const data = await getAllMarketData();
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#121212', paddingTop: 30 }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 10 }}>Cryptocurrencies</Text>
            <FlatList
                data={coins}
                renderItem={({ item }) => <CoinItem marketCoin={item} />}
                keyExtractor={item => `${item.name}`}
                onEndReached={() => fetchCoins((coins.length / 50) + 1)}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        tintColor="#16c784"
                        onRefresh={refetchCoins}
                    />
                }
            />
        </View>
    )
}

export default HomeScreen