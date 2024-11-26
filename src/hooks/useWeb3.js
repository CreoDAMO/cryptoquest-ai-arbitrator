import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import API_CONFIG from '../config/api';

export const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
      setError('Please connect your wallet.');
    } else {
      setAccount(accounts[0]);
    }
  }, []);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await web3Provider.send('eth_requestAccounts', []);
          setProvider(web3Provider);
          setAccount(accounts[0]);
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', () => window.location.reload());
        } else {
          setProvider(new ethers.providers.JsonRpcProvider(API_CONFIG.INFURA_ENDPOINT));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    initWeb3();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [handleAccountsChanged]);

  return { provider, account, error };
};
