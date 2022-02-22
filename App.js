import { StatusBar } from 'expo-status-bar';
import Router from './navigation/Router';
import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WatchlistContextProvider from './context/WatchlistContext';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <>
      <RecoilRoot>
        <WatchlistContextProvider>
          <Suspense fallback={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#121212'
              }}
            >
              <ActivityIndicator size="large" color="#16c784" />
            </View>
          }>
            <Router />
          </Suspense>
          <StatusBar style="light" />
        </WatchlistContextProvider>
      </RecoilRoot>
    </>
  );
}

