import React, { useState } from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const { TextArea } = Input;

function RecoverAccount({ setWallet, setSeedPhrase }) {
  const navigate = useNavigate();
  const [typeSeed, setTypeSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function seedAdjust(e) {
    setNonValid(false);
    setTypeSeed(e.target.value);
  }

  function recoverWallet() {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typeSeed);
    } catch (err) {
      setNonValid(true);
      return;
    }

    setSeedPhrase(typeSeed);
    setWallet(recoveredWallet.address);
    localStorage.setItem("wallet", recoveredWallet.address);
    localStorage.setItem("seedPhrase", typeSeed);
    navigate("/yourwallet");
    return;
  }
  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined style={{ fontSize: "20px" }} />
          <div>
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words separated with space)
          </div>
        </div>
        <TextArea
          value={typeSeed}
          onChange={seedAdjust}
          rows={4}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />
        <Button
          disabled={
            typeSeed.split(" ").length !== 12 || typeSeed.slice(-1) === " "
          }
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>
        {nonValid && <p style={{ color: "red" }}>Invalid Seed Phrase</p>}
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          <span>Back Home</span>
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
