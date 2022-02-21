import { StatusBar } from 'expo-status-bar';
import Router from './navigation/Router';

export default function App() {
  return (
    <>
      <Router />
      <StatusBar style="light" />
    </>
  );
}

