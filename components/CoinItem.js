import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'


const CoinItem = ({ marketCoin }) => {

    const formatMarketCap = (marketCap) => {
        if (marketCap > 1000000000000) {
            return (marketCap / 1000000000000).toFixed(2) + 'T'
        } else if (marketCap > 1000000000) {
            return (marketCap / 1000000000).toFixed(2) + 'B'
        } else if (marketCap > 1000000) {
            return (marketCap / 1000000).toFixed(2) + 'M'
        } else {
            return (marketCap / 1000).toFixed(2) + 'K'
        }
    }

    const priceColor = marketCoin?.price_change_percentage_24h > 0 ? '#16c784' : '#ea3943'
    const priceImage = marketCoin?.price_change_percentage_24h > 0 ? 'caretup' : 'caretdown'

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                borderBottomWidth: 0.7,
                borderBottomColor: '#282828',
                paddingVertical: 10
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{ uri: marketCoin?.image }}
                    style={{
                        width: 35,
                        height: 35
                    }}
                    resizeMode="contain"
                />
                <View
                    style={{
                        marginLeft: 10
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{marketCoin?.name}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'grey',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{marketCoin?.market_cap_rank}</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>{marketCoin?.symbol.toUpperCase()}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginLeft: 10,
                                alignItems: 'center',
                            }}
                        >
                            <AntDesign name={priceImage} size={14} color={priceColor} />
                            <Text style={{ color: priceColor, fontSize: 14, marginLeft: 5 }}>{marketCoin.price_change_percentage_24h.toFixed(2)} %</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    alignItems: 'flex-end'
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>${marketCoin?.current_price}</Text>
                <Text style={{ color: 'grey', fontSize: 18 }}>MCap: {formatMarketCap(marketCoin?.market_cap)}</Text>
            </View>
        </View>
    )
}

export default CoinItem