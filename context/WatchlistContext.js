import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchListContext = createContext();

const KEY_ID = '@watchListCoinId';

export const useWatchListContext = () => useContext(WatchListContext);

const WatchlistContextProvider = ({ children }) => {

    const [watchListCoinId, setWatchListCoinId] = useState([]);

    const getWatchListCoins = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(KEY_ID);
            setWatchListCoinId(jsonValue != null ? JSON.parse(jsonValue) : []);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getWatchListCoins();
    }, [])

    const addCoinToWatchList = async (coinId) => {
        try {
            const newWatchlist = [...watchListCoinId, coinId];
            const jsonValue = JSON.stringify(newWatchlist);
            await AsyncStorage.setItem(KEY_ID, jsonValue);
            setWatchListCoinId(newWatchlist);
        } catch (e) {
            console.log(e)
        }
    }

    const removeCoinFromWatchList = async (coinId) => {
        const newWatchlist = watchListCoinId.filter((coinIdValue) => coinIdValue !== coinId);
        const jsonValue = JSON.stringify(newWatchlist);
        await AsyncStorage.setItem(KEY_ID, jsonValue);
        setWatchListCoinId(newWatchlist);
    }

    return (
        <WatchListContext.Provider value={{ watchListCoinId, addCoinToWatchList, removeCoinFromWatchList }}>
            {children}
        </WatchListContext.Provider>
    )

}

export default WatchlistContextProvider;