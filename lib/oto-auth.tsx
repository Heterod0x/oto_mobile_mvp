"use client";

import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePrivy } from '@privy-io/expo';
import { startWalletAuth, verifyWalletAuth } from "@/services/api";
import * as SecureStore from 'expo-secure-store';

export const APP_IDENTITY = {
  name: 'oto',
  uri:  'https://www.oto.earth',
  icon: "favicon.ico",
};

interface User {
    id: string;
}

interface AuthContextType {
    user: User | null;
    isReady: boolean;
    authType: "email" | "solana" | "";
    getAccessToken: () => Promise<string | null>;
    logout: () => Promise<void>;
    loginWithSolana: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [authType, setAuthType] = useState<"" | "email" | "solana">("");
    const [walletToken, setWalletToken] = useState<string | null>(null);
    const { user: privyUser, isReady: privyIsReady, logout: privyLogout, getAccessToken: privyGetAccessToken } = usePrivy();

    useEffect(() => {
        if (privyUser) {
            setUser({
                id: privyUser.id,
            });
            setAuthType("email");
        }
    }, [privyUser]);

    
    useEffect(() => {
        if (privyIsReady) {
            setIsReady(privyIsReady);
        }

        const walletToken = SecureStore.getItem("wallet_token");
        const walletAddress = SecureStore.getItem("wallet_address");
        if (walletToken && walletAddress) {
            setWalletToken(walletToken);
            setUser({
                id: walletAddress,
            });
            setAuthType("solana");
        }
    }, [privyIsReady]);

    const getAccessToken = async () => {
        if (authType === "email") {
            return await privyGetAccessToken();
        }else if (authType === "solana") {
            return walletToken;
        }
        return "";
    };

    const logout = async () => {
        if (authType === "email") {
            await privyLogout();
        }else if (authType === "solana") {
            setWalletToken("");
            setUser(null);
            setAuthType("");
            await SecureStore.deleteItemAsync("wallet_token");
            await SecureStore.deleteItemAsync("wallet_address");
        }
    };

    const loginWithSolana = async () => {
        const challenge = await startWalletAuth();

        const authorizationResult = await transact(async (wallet: Web3MobileWallet) => {
            const authorizationResult = await wallet.authorize({
                chain: 'solana:devnet',
                identity: APP_IDENTITY,
                sign_in_payload: {
                domain: 'www.oto.earth',
                statement: 'Sign into oto',
                uri: 'https://www.oto.earth',
                nonce: challenge.nonce,
                },
            });
            return authorizationResult;
        });

        const verifyResult = await verifyWalletAuth(authorizationResult.sign_in_result?.address || "", challenge.challenge_id, authorizationResult.sign_in_result?.signature || "", authorizationResult.sign_in_result?.signed_message || "");
        if (verifyResult.success) {
            await SecureStore.setItemAsync("wallet_token", verifyResult.token);
            await SecureStore.setItemAsync("wallet_address", authorizationResult.sign_in_result?.address || "");
            setWalletToken(verifyResult.token);
            setAuthType("solana");
            setUser({
                id: authorizationResult.sign_in_result?.address || "",
            });
        }else {
            throw new Error("Failed to verify wallet auth");
        }
  };

    const value: AuthContextType = {
        user,
        isReady,
        authType,
        getAccessToken,
        logout,
        loginWithSolana,
    };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
