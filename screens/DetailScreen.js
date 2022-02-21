import { View, Text, Image, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import coin from '../assets/data/crypto.json';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';



const DetailScreen = () => {

    const { image: { small },
        symbol,
        name,
        market_data: {
            market_cap_rank,
            current_price,
            price_change_percentage_24h
        },
        prices
    }
        = coin;

    const [value, setValue] = useState("1");
    const [price, setPrice] = useState(current_price.usd.toString());

    const formatCurrency = (value) => {
        "worklet";
        if (value === "") {
            return `${current_price.usd.toFixed(2)} US $`
        }
        return `${parseFloat(value).toFixed(2)} US $`
    }

    const handleChange = (value) => {
        "worklet";
        setValue(value);
        setPrice(value * current_price.usd);
    }

    const priceColor = price_change_percentage_24h > 0 ? '#16c784' : '#ea3943'
    const priceImage = price_change_percentage_24h > 0 ? 'caretup' : 'caretdown'
    const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943"
    const { width: SIZE } = Dimensions.get('window');

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
                    <ChartYLabel
                        format={formatCurrency}
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 24,
                            letterSpacing: 1
                        }}
                    />
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

    function renderConverter() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    padding: 15,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            color: 'white',
                            height: 30,
                            margin: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: 'white',
                            fontSize: 16
                        }}
                        keyboardType='numbers-and-punctuation'
                        value={value}
                        onChangeText={handleChange}
                    />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{symbol.toUpperCase()}</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15 }}>=</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: 'white',
                            height: 30,
                            margin: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: 'white',
                            fontSize: 20
                        }}>
                        {price}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>USD</Text>
                </View>
            </View>
        )
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            <ChartPathProvider data={{ points: prices.map(([x, y]) => ({ x, y })), smoothingStrategy: 'bezier' }}>
                {renderHeader()}
                {renderCoinInfo()}
                <View>
                    <ChartPath
                        height={SIZE / 2}
                        stroke={chartColor}
                        width={SIZE}
                    />
                    <ChartDot style={{ backgroundColor: chartColor }} />
                </View>
                {renderConverter()}
            </ChartPathProvider>
        </View>
    )
}

export default DetailScreen