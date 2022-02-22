import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

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

export default PortfolioAssetItem;