import { injected, useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { User } from "@supabase/supabase-js";
import supabase from "../utils/supabase";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  // The current Supabase user
  const [user, setUser] = useState<User | null>(null);

  // The wallet address we have on file in Supabase for this user
  const [attachedWallet, setAttachedWallet] = useState<string | null>(null);

  // Fetch the Supabase user and any attached wallet on mount
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      }
      if (data?.user) {
        setUser(data.user);

        // Fetch the wallet address from the user_wallets table
        const { data: walletData, error: walletError } = await supabase
          .from("user_wallets")
          .select("wallet_address")
          .eq("user_id", data.user.id)
          // If you expect only one wallet per user, you can use .single()
          .single();

        if (walletError && walletError.code !== "PGRST116") {
          // PGRST116 means no rows returned from .single(), which isn't necessarily an error
          console.error("Error fetching wallet address:", walletError.message);
        }

        // If a record is found, store the wallet address
        if (walletData) {
          setAttachedWallet(walletData.wallet_address);
        }
      }
    }
    getUser();
  }, []);

  /**
   * attachWallet: Asks the user to sign a message to prove ownership,
   * then adds a record in the user_wallets table with user_id and wallet_address.
   */
  async function attachWallet() {
    if (!isConnected || !address) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!user) {
      alert("You must be signed in to Supabase first!");
      return;
    }

    try {
      // Prepare SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign this message to verify ownership of your wallet.",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
      });

      // User signs the message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // (Optional) You could verify the signature in a Supabase Edge Function
      // or an API route before inserting into the database.

      // Insert the new wallet record into user_wallets
      const { error } = await supabase.from("user_wallets").insert([
        {
          user_id: user.id,
          wallet_address: address,
          // Optional: store the signature for future verification
          // signature
        },
      ]);

      if (error) throw error;

      // Update local state to reflect the newly-attached wallet
      setAttachedWallet(address);
      alert("Wallet linked successfully!");
    } catch (error) {
      console.error("Error linking wallet:", error);
      alert("Error linking wallet. Check console for more details.");
    }
  }

  /**
   * detachWallet: Removes the wallet record from user_wallets, i.e., unlinks the wallet.
   */
  async function detachWallet() {
    if (!user) {
      alert("No user found in Supabase.");
      return;
    }

    try {
      // Delete the wallet record for this user
      const { error } = await supabase
        .from("user_wallets")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      // Update state to remove the local record of the wallet
      setAttachedWallet(null);
      alert("Wallet unattached successfully!");
    } catch (error) {
      console.error("Error unattaching wallet:", error);
      alert("Error unattaching wallet. Check console for more details.");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        {/* Connect or Disconnect button */}
        {!isConnected ? (
          <button onClick={() => connect({ connector: injected() })}>
            Connect Wallet
          </button>
        ) : (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </div>

      <div>
        {/* Attach button */}
        <button onClick={attachWallet} disabled={!user || !isConnected}>
          {!user
            ? "Sign in to attach wallet"
            : !isConnected
            ? "Connect your wallet first"
            : "Attach Wallet"}
        </button>
      </div>

      <div>
        {/* Show attached wallet address (if any) and Unattach button */}
        {attachedWallet ? (
          <div>
            <p>
              <strong>Attached wallet:</strong> {attachedWallet} <br />
              <a href="/game">to the game</a>
            </p>
            <button onClick={detachWallet}>Unattach Wallet</button>
          </div>
        ) : (
          <p>No wallet attached in Supabase yet.</p>
        )}
      </div>
    </div>
  );
}
