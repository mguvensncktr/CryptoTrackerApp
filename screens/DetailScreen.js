import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import { LineChart } from 'react-native-wagmi-charts';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getSingleCoinData, getSingleCoinMarketChart } from '../services/api';
import { useWatchListContext } from '../context/WatchlistContext';
import Filters from '../components/Filters';

const DetailScreen = () => {

    const { watchListCoinId, addCoinToWatchList, removeCoinFromWatchList } = useWatchListContext();
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState(null);
    const route = useRoute();
    const { params: { coinId } } = route;
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("1");
    const [price, setPrice] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("1");

    const fetchCoinData = async () => {
        setLoading(true);
        const coinData = await getSingleCoinData(coinId);
        setCoin(coinData);
        setPrice(coinData?.market_data?.current_price?.usd.toString())
        setLoading(false);
    }

    const fetchMarketCoinData = async (selectedFilter) => {
        const coinMarketChartData = await getSingleCoinMarketChart(coinId, selectedFilter);
        setChartData(coinMarketChartData);
    }

    useEffect(() => {
        fetchCoinData()
        fetchMarketCoinData(1)
    }, [])

    if (loading || !coin || !chartData) {
        return <View
            style={{
                flex: 1,
                backgroundColor: '#121212',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ActivityIndicator size="large" color="#16c784" />
        </View>
    }

    const { image: { small },
        id,
        symbol,
        name,
        market_data: {
            market_cap_rank,
            current_price,
            price_change_percentage_24h
        }
    }
        = coin;

    const { prices } = chartData;



    const formatCurrency = ({ value }) => {
        "worklet";
        if (value === "") {
            if (current_price.usd < 1) {
                return `$${current_price.usd}`
            }
            return `${current_price?.usd.toFixed(2)} US $`
        }
        if (current_price.usd < 1) {
            return `$${parseFloat(value).toFixed(8)}`
        }
        return `${parseFloat(value).toFixed(2)} US $`
    }

    const handleChange = (value) => {
        "worklet";
        setValue(value);
        setPrice(value * current_price?.usd);
    }

    const onSelectedFilter = (filter) => {
        setSelectedFilter(filter);
        fetchMarketCoinData(filter)
    }

    const priceColor = price_change_percentage_24h > 0 ? '#16c784' : '#ea3943' || 'white';
    const priceImage = price_change_percentage_24h > 0 ? 'caretup' : 'caretdown'
    const chartColor = current_price?.usd > prices[0][1] ? '#16c784' : '#ea3943' || 'white';
    const { width: SIZE } = Dimensions.get('window');

    const watchlistedCoin = () => {
        return watchListCoinId.some((coinId) => coinId === id);
    }

    const handleAddCoinToWatchList = () => {
        if (watchlistedCoin()) {
            removeCoinFromWatchList(id);
        }
        else {
            addCoinToWatchList(id);
        }
    }

    function renderHeader() {
        return (
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}
            >
                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-sharp" size={30} color="white" />
                </TouchableOpacity>
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
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>{symbol?.toUpperCase()}</Text>
                    <View
                        style={{
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'grey',
                            marginLeft: 5,
                            paddingHorizontal: 3,
                            paddingVertical: 1
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>#{market_cap_rank}</Text>
                    </View>
                </View>
                <FontAwesome
                    name={watchlistedCoin() ? "star" : "star-o"}
                    size={30}
                    color={watchlistedCoin() ? '#FFBF00' : 'white'}
                    onPress={handleAddCoinToWatchList}
                />
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
                    <LineChart.PriceText
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 24,
                            letterSpacing: 1
                        }}
                        format={formatCurrency}
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
                            fontSize: 16,
                            textAlign: 'center'
                        }}
                        keyboardType='numbers-and-punctuation'
                        value={value}
                        onChangeText={handleChange}
                    />
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{symbol?.toUpperCase()}</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginHorizontal: 15 }}>=</Text>
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
                            fontSize: 20,
                        }}>
                        {price}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>$</Text>
                </View>
            </View>
        )
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: '#121212', paddingTop: 30 }}
        >
            <LineChart.Provider data={prices?.map(([timestamp, value]) => ({ timestamp, value }))}>
                {renderHeader()}
                {renderCoinInfo()}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        backgroundColor: '#2B2B2B',
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginVertical: 5
                    }}
                >
                    <Filters filterDay="1" filterText="24h" selectedFilter={selectedFilter} setSelectedFilter={onSelectedFilter} />
                    <Filters filterDay="7" filterText="7d" selectedFilter={selectedFilter} setSelectedFilter={onSelectedFilter} />
                    <Filters filterDay="30" filterText="30d" selectedFilter={selectedFilter} setSelectedFilter={onSelectedFilter} />
                    <Filters filterDay="365" filterText="1y" selectedFilter={selectedFilter} setSelectedFilter={onSelectedFilter} />
                    <Filters filterDay="max" filterText="All" selectedFilter={selectedFilter} setSelectedFilter={onSelectedFilter} />
                </View>
                <LineChart height={SIZE / 2} width={SIZE}>
                    <LineChart.Path color={chartColor} />
                    <LineChart.CursorCrosshair color={chartColor} />
                </LineChart>
                {renderConverter()}
            </LineChart.Provider>
        </View>
    )
}

export default DetailScreen