import { OktoContextType, TransferTokensData, useOkto } from "okto-sdk-react";
import React, { useState } from "react";

type Props = {};

const TransferTokens = ({}: Props) => {
  const { transferTokens } = useOkto() as OktoContextType;

  const [transferData, setTransferData] = useState({
    network_name: "",
    token_address: "",
    quantity: "",
    recipient_address: "",
  });
  const [transferResponse, setTransferResponse] =
    useState<TransferTokensData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransferTokens = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await transferTokens(transferData);
      setTransferResponse(response);
    } catch (error) {
      setError(`Failed to transfer tokens: ${error}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Transfer Tokens</h2>
      <form onSubmit={handleTransferTokens}>
        <input
          type="text"
          name="network_name"
          placeholder="Network Name"
          value={transferData.network_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="token_address"
          placeholder="Token Address"
          value={transferData.token_address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={transferData.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="recipient_address"
          placeholder="Recipient Address"
          value={transferData.recipient_address}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Transfer Tokens</button>
      </form>
      {transferResponse && (
        <div>
          <h2>Transfer Response:</h2>
          <pre>{JSON.stringify(transferResponse, null, 2)}</pre>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default TransferTokens;
