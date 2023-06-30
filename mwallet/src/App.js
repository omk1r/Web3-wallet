import "./App.css";
import { useState, useEffect } from "react";
import logo from "./moralisLogo.svg";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    const storedSeedPhrase = localStorage.getItem("seedPhrase");
    if (storedWallet && storedSeedPhrase) {
      setWallet(JSON.parse(storedWallet));
      setSeedPhrase(storedSeedPhrase);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
    localStorage.setItem("seedPhrase", seedPhrase);
  }, [wallet, seedPhrase]);

  return (
    <div className="App">
      <header>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Mumbai testnet",
              value: "0x13881",
            },
            {
              label: "Polygon",
              value: "0x89",
            },
            {
              label: "Avalanche",
              value: "0xa86a",
            },
            {
              label: "Sepolia Tetsnet",
              value: "0xaa36a7",
            },
          ]}
          className="dropdown"
        ></Select>
      </header>
      {wallet && seedPhrase ? (
        <WalletView
          wallet={wallet}
          setWallet={setWallet}
          seedPhrase={seedPhrase}
          setSeedPhrase={setSeedPhrase}
          selectedChain={selectedChain}
        />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recover"
            element={
              <RecoverAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            }
          />
          <Route
            path="/yourwallet"
            element={
              <CreateAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
