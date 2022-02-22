import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const PortfolioAssetItem = ({ assetItem }) => {

    const { currentPrice, image, name, price, priceChangePercentage, quantity, ticker } = assetItem;

    const totalPrice = (price * quantity).toFixed(2);
    const isChangePositive = priceChangePercentage >= 0;

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
                    source={{ uri: image }}
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ color: 'grey', fontWeight: '600' }}>{ticker}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>${currentPrice}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign
                        name={isChangePositive ? 'caretup' : 'caretdown'}
                        size={12}
                        color={isChangePositive ? '#16c784' : '#ea3943'}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: isChangePositive ? '#16c784' : '#ea3943', fontWeight: '600' }}>{priceChangePercentage.toFixed(2)} %</Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: 'white' }}>${totalPrice}</Text>
                <Text style={{ color: 'grey', fontWeight: '600' }}>{quantity} {ticker}</Text>
            </View>
        </View>
    )
}

export default PortfolioAssetItem;