import axios from "axios";

export const getSingleCoinData = async (coinId) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getSingleCoinMarketChart = async (coinId, selectedFilter) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedFilter}&interval=hourly`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getAllMarketData = async (pageNumber = 1) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getWatchListedCoins = async (coinIds) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h`)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getAllCoins = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const getCandleChartData = async (coinId, days = 1) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
        return response.data;
    } catch (e) {
        console.error(e);
    }
}