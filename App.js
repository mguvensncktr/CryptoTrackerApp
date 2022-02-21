import { StatusBar } from 'expo-status-bar';
import Router from './navigation/Router';
import WatchlistContextProvider from './context/WatchlistContext';

export default function App() {
  return (
    <>
      <WatchlistContextProvider>
        <Router />
        <StatusBar style="light" />
      </WatchlistContextProvider>
    </>
  );
}

