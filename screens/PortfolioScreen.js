import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React, { Suspense } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { allPortfolioAssets } from '../atoms/PortfolioAssets';
import PortfolioAssetItem from '../components/PortfolioAssetItem';

const PortfolioScreen = () => {

    const navigation = useNavigation();
    const assets = useRecoilValue(allPortfolioAssets);

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
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, letterSpacing: 1 }}>$20000</Text>
                            <Text style={{ color: '#16c784', fontWeight: '600', fontSize: 16 }}>$1000 (All Time)</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#16c784',
                                paddingHorizontal: 5,
                                paddingVertical: 6,
                                borderRadius: 5
                            }}>
                            <AntDesign
                                name={"caretup"}
                                size={12}
                                color={"white"}
                                style={{ marginRight: 5 }}
                            />
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 17 }}>1.2%</Text>
                        </View>
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