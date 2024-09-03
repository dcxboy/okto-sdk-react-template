import {
  useOkto,
  OktoContextType,
  User,
  NetworkData,
  PortfolioData,
  TokensData,
} from "okto-sdk-react";
import { useEffect, useState } from "react";

type Props = {};

const OktoUserInfo = ({}: Props) => {
  const {
    getUserDetails,
    getSupportedNetworks,
    getPortfolio,
    getSupportedTokens,
  } = useOkto() as OktoContextType;

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [networks, setNetworks] = useState<NetworkData | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [supportedTokens, setSupportedTokens] = useState<TokensData | null>(
    null
  );

  useEffect(() => {
    getUserDetails()
      .then((result) => {
        console.log("User Details:", result);
        setUserDetails(result);
      })
      .catch((error) => {
        console.error(`Error fetching user details:`, error);
      });
  }, [getUserDetails]);

  useEffect(() => {
    getSupportedNetworks()
      .then((result) => {
        console.log("Supported Networks:", result);
        setNetworks(result);
      })
      .catch((error) => {
        console.error(`Error fetching supported networks:`, error);
      });
  }, [getSupportedNetworks]);

  useEffect(() => {
    getPortfolio()
      .then((result) => {
        console.log("Portfolio:", result);
        setPortfolio(result);
      })
      .catch((error) => {
        console.error(`Error fetching portfolio:`, error);
      });
  }, [getPortfolio]);

  useEffect(() => {
    getSupportedTokens()
      .then((result) => {
        console.log("Supported Tokens:", result);
        setSupportedTokens(result);
      })
      .catch((error) => {
        console.error(`Error fetching supported tokens:`, error);
      });
  }, [getSupportedTokens]);

  return (
    <div>
      <h2>User Details</h2>
      {userDetails ? (
        <ul>
          <li>Email: {userDetails.email}</li>
          <li>User ID: {userDetails.user_id}</li>
          <li>
            Created At:{" "}
            {new Date(parseInt(userDetails.created_at) * 1000).toLocaleString()}
          </li>
          <li>Freezed: {userDetails.freezed ? "Yes" : "No"}</li>
          {userDetails.freezed && (
            <li>Freeze Reason: {userDetails.freeze_reason}</li>
          )}
        </ul>
      ) : (
        <p>Loading user details...</p>
      )}

      <h2>Supported Networks</h2>
      {networks && networks.network?.length > 0 ? (
        <ul>
          {networks?.network.map((network, index) => (
            <li key={index}>
              {network.network_name} (Chain ID: {network.chain_id})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading supported networks...</p>
      )}

      <h2>Portfolio</h2>
      {portfolio ? (
        <div>
          <p>Total Portfolio Value: {portfolio.total}</p>
          <ul>
            {portfolio.tokens.map((token, index) => (
              <li key={index}>
                {token.token_name}: {token.amount_in_inr}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading portfolio...</p>
      )}

      <h2>Supported Tokens</h2>
      {supportedTokens && supportedTokens?.tokens.length > 0 ? (
        <ul>
          {supportedTokens.tokens.map((token, index) => (
            <li key={index}>
              {token.token_name} (Network: {token.network_name}, Address:{" "}
              {token.token_address})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading supported tokens...</p>
      )}
    </div>
  );
};

export default OktoUserInfo;
