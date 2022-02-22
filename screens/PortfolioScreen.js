import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React, { Suspense } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { allPortfolioAssets } from '../atoms/PortfolioAssets';
import PortfolioAssetItem from '../components/PortfolioAssetItem';

const PortfolioScreen = () => {

    const navigation = useNavigation();
    const assets = useRecoilValue(allPortfolioAssets);

    const currentBalance = assets.reduce((a, b) => a + (b.currentPrice * b.quantity), 0).toFixed(2);
    const valueChange = () => {
        const boughtBalance = assets.reduce((total, currentAsset) => total + (currentAsset.price * currentAsset.quantity), 0);
        return (currentBalance - boughtBalance).toFixed(2);
    }

    const currentPercentageChange = () => {
        const boughtBalance = assets.reduce((total, currentAsset) => total + (currentAsset.price * currentAsset.quantity), 0);
        return ((currentBalance - boughtBalance) / boughtBalance * 100).toFixed(2) || 0;
    }

    function renderPortfolioAssets() {

        function renderHeader() {
            return (
                <>
                    <View
                        style={{
                            margin: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <View>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Current Balance</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: currentBalance.length > 10 ? 20 : 35, letterSpacing: 1 }}>${currentBalance}</Text>
                            <Text style={{ color: valueChange() > 0 ? '#16c784' : '#ea3943', fontWeight: '600', fontSize: 16 }}>${valueChange()} (All Time)</Text>
                        </View>
                        {
                            currentPercentageChange() > 0 ?
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: valueChange() > 0 ? '#16c784' : '#ea3943',
                                        paddingHorizontal: 5,
                                        paddingVertical: 6,
                                        borderRadius: 5
                                    }}>
                                    <AntDesign
                                        name={valueChange() > 0 ? "caretup" : "caretdown"}
                                        size={12}
                                        color={"white"}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 17 }}>{currentPercentageChange()} %</Text>
                                </View>
                                : null
                        }
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 23 }}>Your Assets</Text>
                    </View>
                </>
            )
        }

        function renderFooter() {
            return (
                <Pressable
                    style={{
                        backgroundColor: '#4169e1',
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginVertical: 25,
                        marginHorizontal: 20,
                    }}
                    onPress={() => navigation.navigate('Assets')}
                >
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '600' }}>Add new Asset</Text>
                </Pressable>
            )
        }

        return (
            <>
                <FlatList
                    data={assets}
                    renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderHeader()}
                    ListFooterComponent={renderFooter()}
                />
            </>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: '#121212' }}>
            {renderPortfolioAssets()}
        </View>
    )
}

export default PortfolioScreen