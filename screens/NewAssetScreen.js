import { View, Text, TextInput, Pressable, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchableDropDown from 'react-native-searchable-dropdown'
import { useNavigation } from '@react-navigation/native'
import { useRecoilState } from 'recoil';
import { allPortfolioBoughtAssetsInStorage } from '../atoms/PortfolioAssets';
import { getAllCoins, getSingleCoinData } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'uuid/v4';


const NewAssetScreen = () => {

    const [allCoins, setAllCoins] = useState([]);
    const [assetQty, setAssetQty] = useState('');
    const navigation = useNavigation();
    const [assetsInStorage, setAssetsInStorage] = useRecoilState(allPortfolioBoughtAssetsInStorage);
    const [loading, setLoading] = useState(false);
    const [selectedCoinId, setSelectedCoinId] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const fetchAllCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const allCoins = await getAllCoins();
        setAllCoins(allCoins)
        setLoading(false)
    }

    const fetchCoinInfo = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const coinInfo = await getSingleCoinData(selectedCoinId);
        setSelectedCoin(coinInfo)
        setLoading(false)
    }

    useEffect(() => {
        fetchAllCoins();
    }, [])

    useEffect(() => {
        if (selectedCoinId) {
            fetchCoinInfo()
        }
    }, [selectedCoinId])

    const onAddAsset = async () => {
        const newAsset = {
            id: selectedCoin.id,
            unique_id: selectedCoin.id + uuid.v4(),
            name: selectedCoin.name,
            image: selectedCoin.image.small,
            ticker: selectedCoin.symbol.toUpperCase(),
            quantity: assetQty,
            price: selectedCoin.market_data.current_price.usd,
        }
        const newAssets = [...assetsInStorage, newAsset];
        const jsonValue = JSON.stringify(newAssets);
        await AsyncStorage.setItem('@portfolio_coins', jsonValue);
        setAssetsInStorage(newAssets);
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#121212', paddingTop: 30 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={60}
        >
            <SearchableDropDown
                items={allCoins}
                onItemSelect={(item) => setSelectedCoinId(item.id)}
                containerStyle={{
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    zIndex: 1
                }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#1e1e1e',
                    borderWidth: 1,
                    borderColor: '#444444',
                    borderRadius: 5
                }}
                itemTextStyle={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '600'
                }}
                resetValue={false}
                placeholder={selectedCoinId || "Search for a coin"}
                placeholderTextColor="#fff"
                textInputProps={{
                    underlineColorAndroid: 'transparent',
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#444444',
                        borderRadius: 5,
                        color: '#fff',
                        backgroundColor: '#1e1e1e',
                        fontSize: 16,
                        fontWeight: '600'
                    }
                }}
            />
            {
                selectedCoinId && (
                    <>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                <TextInput
                                    value={assetQty}
                                    placeholder='0'
                                    keyboardType='numeric'
                                    style={{
                                        color: 'white',
                                        fontSize: assetQty.length > 7 ? 20 : 90,
                                    }}
                                    onChangeText={setAssetQty}
                                />
                                <Text style={{ color: 'grey', marginLeft: 10, fontSize: 30, fontWeight: 'bold' }}>{selectedCoin?.symbol.toUpperCase()}</Text>
                            </View>
                            <Text style={{ color: 'grey', fontWeight: '600', fontSize: 17, letterSpacing: 0.5 }}>${selectedCoin?.market_data?.current_price.usd} per coin</Text>
                        </View>
                        <Pressable
                            style={{
                                backgroundColor: assetQty ? '#4169E1' : '#303030',
                                padding: 10,
                                alignItems: 'center',
                                marginVertical: 15,
                                marginHorizontal: 10,
                                borderRadius: 10,
                                justifyContent: 'flex-end',
                                zIndex: 1,
                            }}
                            onPress={onAddAsset}
                            disabled={!assetQty}
                        >
                            <Text style={{ color: assetQty ? 'white' : 'grey', fontSize: 17, fontWeight: '600' }}>Add new Asset</Text>
                        </Pressable>
                        <Pressable
                            style={{
                                position: 'absolute',
                                top: '67%',
                                bottom: '50%',
                                left: 0,
                                right: 0,
                            }}
                            onPress={Keyboard.dismiss}
                        />
                    </>
                )
            }

        </KeyboardAvoidingView>
    )
}

export default NewAssetScreen