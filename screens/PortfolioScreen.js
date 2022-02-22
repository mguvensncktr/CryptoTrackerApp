import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PortfolioAssetItem = () => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
            paddingVertical: 10
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: "" }}
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Bitcoin</Text>
                    <Text style={{ color: 'grey', fontWeight: '600' }}>BTC</Text>
                </View>
            </View>
            <View>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>$4000</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign
                        name={"caretup"}
                        size={12}
                        color={'#16c784'}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: '#16c784', fontWeight: '600' }}>1.2%</Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: 'white' }}>$80000</Text>
                <Text style={{ color: 'grey', fontWeight: '600' }}>2 BTC</Text>
            </View>
        </View>
    )
}

const PortfolioScreen = () => {

    const navigation = useNavigation();

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
                    data={[{ id: 'bitcoin' }]}
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