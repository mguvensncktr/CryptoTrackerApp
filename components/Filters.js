import { View, Text, Pressable } from 'react-native'
import React, { memo } from 'react'

const Filters = (props) => {

    const { filterText, filterDay, selectedFilter, setSelectedFilter } = props;

    const isSelected = (filter) => filter === selectedFilter;

    return (
        <Pressable
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                backgroundColor: isSelected(filterDay) ? '#1e1e1e' : 'transparent',
            }}
            onPress={() => setSelectedFilter(filterDay)}
        >
            <Text style={{ color: isSelected(filterDay) ? 'white' : 'grey' }}>{filterText}</Text>
        </Pressable>
    )
}

export default memo(Filters);