import {
  useOkto,
  OktoContextType,
  User,
  NetworkData,
  PortfolioData,
  TokensData,
} from "okto-sdk-react";
import { useEffect, useState } from "react";

type Props = {
  tab?: string;
};

const OktoUserInfo = ({ tab = "userDetails" }: Props) => {
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
    if (tab === "userDetails") {
      getUserDetails()
        .then((result) => {
          console.log("User Details:", result);
          setUserDetails(result);
        })
        .catch((error) => {
          console.error(`Error fetching user details:`, error);
        });
    }

    if (tab === "networks") {
      getSupportedNetworks()
        .then((result) => {
          console.log("Supported Networks:", result);
          setNetworks(result);
        })
        .catch((error) => {
          console.error(`Error fetching supported networks:`, error);
        });
    }

    if (tab === "portfolio") {
      getPortfolio()
        .then((result) => {
          console.log("Portfolio:", result);
          setPortfolio(result);
        })
        .catch((error) => {
          console.error(`Error fetching portfolio:`, error);
        });
    }

    if (tab === "supportedTokens") {
      getSupportedTokens()
        .then((result) => {
          console.log("Supported Tokens:", result);
          setSupportedTokens(result);
        })
        .catch((error) => {
          console.error(`Error fetching supported tokens:`, error);
        });
    }
  }, [
    tab,
    getUserDetails,
    getSupportedNetworks,
    getPortfolio,
    getSupportedTokens,
  ]);

  return (
    <div>
      {tab === "userDetails" && userDetails && (
        <>
          <h2>User Details</h2>
          <div>
            <div className="user-detail-item">
              <strong>Email:</strong> {userDetails.email}
            </div>
            <div className="user-detail-item">
              <strong>User ID:</strong> {userDetails.user_id}
            </div>
            <div className="user-detail-item">
              <strong>Created At:</strong>{" "}
              {new Date(
                parseInt(userDetails.created_at) * 1000
              ).toLocaleString()}
            </div>
            <div className="user-detail-item">
              <strong>Freezed:</strong> {userDetails.freezed ? "Yes" : "No"}
            </div>
            {userDetails.freezed && (
              <div className="user-detail-item">
                <strong>Freeze Reason:</strong> {userDetails.freeze_reason}
              </div>
            )}
          </div>
        </>
      )}

      {tab === "networks" && networks && networks.network?.length > 0 && (
        <>
          <h2>Supported Networks</h2>
          <table>
            <thead>
              <tr>
                <th>Network Name</th>
                <th>Chain ID</th>
              </tr>
            </thead>
            <tbody>
              {networks.network.map((network, index) => (
                <tr key={index}>
                  <td>{network.network_name}</td>
                  <td>{network.chain_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "portfolio" && portfolio && (
        <>
          <h2>Portfolio</h2>
          <p>Total Portfolio Value: {portfolio.total}</p>
          <table>
            <thead>
              <tr>
                <th>Token Name</th>
                <th>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.tokens.map((token, index) => (
                <tr key={index}>
                  <td>{token.token_name}</td>
                  <td>{token.amount_in_inr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "supportedTokens" &&
        supportedTokens &&
        supportedTokens?.tokens.length > 0 && (
          <>
            <h2>Supported Tokens</h2>
            <table>
              <thead>
                <tr>
                  <th>Token Name</th>
                  <th>Network Name</th>
                  <th>Token Address</th>
                </tr>
              </thead>
              <tbody>
                {supportedTokens.tokens.map((token, index) => (
                  <tr key={index}>
                    <td>{token.token_name}</td>
                    <td>{token.network_name}</td>
                    <td>{token.token_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
    </div>
  );
};

export default OktoUserInfo;
