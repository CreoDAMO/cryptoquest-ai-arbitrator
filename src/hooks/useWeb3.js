import { useState, useEffect, useCallback } from '"react"';
import { ethers } from '"ethers"';
import API_CONFIG from '"../config/api"';

export const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = useCallback(async () => {
    try {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await web3Provider.send('eth_requestAccounts', []);
        const chainId = await web3Provider.getNetwork().then((net) => net.chainId);

        if (chainId !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
          setError(`Please switch to the correct network: ${process.env.REACT_APP_NETWORK_NAME}`);
          return;
        }

        setProvider(web3Provider);
        setAccount(accounts[0]);
      } else {
        setError('MetaMask not found. Please install it.');
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    connectWallet();

    if (window.ethereum) {
      window.ethereum.on('"accountsChanged"', connectWallet);
      window.ethereum.on('"chainChanged"', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('"accountsChanged"', connectWallet);
      }
    };
  }, [connectWallet]);

  return { provider, account, error, connectWallet };
};
