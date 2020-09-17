import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ApolloProvider } from "react-apollo-hooks";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import apolloCientOptions from "./apllo";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync(Ionicons.font);
      await Asset.loadAsync([require("./assets/icon.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloCientOptions,
      });
      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);
  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
