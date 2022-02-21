import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import CoinItem from '../components/CoinItem';
import cryptocurrencies from '../assets/data/cryptocurrencies.json';


const HomeScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#121212', paddingTop: 30 }}>
            <FlatList
                data={cryptocurrencies}
                renderItem={({ item }) => <CoinItem marketCoin={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default HomeScreen