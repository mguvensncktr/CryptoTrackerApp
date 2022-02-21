import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import coin from '../assets/data/crypto.json';

const DetailScreen = () => {

    const { image: { small },
        symbol,
        name,
        market_data: {
            market_cap_rank,
            current_price,
            price_change_percentage_24h
        },
    }
        = coin;

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const priceColor = price_change_percentage_24h > 0 ? '#16c784' : '#ea3943'
    const priceImage = price_change_percentage_24h > 0 ? 'caretup' : 'caretdown'

    function renderHeader() {
        return (
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}
            >
                <Ionicons name="chevron-back-sharp" size={30} color="white" />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={{ uri: small }}
                        resizeMode="contain"
                        style={{ width: 25, height: 25 }}
                    />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>{symbol.toUpperCase()}</Text>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'grey',
                            marginLeft: 5
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>#{market_cap_rank}</Text>
                    </View>
                </View>
                <EvilIcons name="user" size={30} color="white" />
            </View>
        )
    }

    function renderCoinInfo() {
        return (
            <View
                style={{
                    margin: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View>
                    <Text style={{ fontSize: 22, color: 'white' }}>{name}</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, letterSpacing: 1 }}>{formatPrice(current_price.usd)} US$</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: priceColor,
                        padding: 5,
                        borderRadius: 10,
                    }}
                >
                    <AntDesign name={priceImage} size={12} color="#fff" />
                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 5, fontWeight: 'bold' }}>{price_change_percentage_24h.toFixed(2)} %</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            {renderHeader()}
            {renderCoinInfo()}
        </View>
    )
}

export default DetailScreen