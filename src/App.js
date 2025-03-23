/*******************************************************
 * App.js - Main logic for the WorldRetirementFound Mini App
 * This version references a hypothetical @worldcoin/minikit
 * and a deployed retirement contract on WorldChain.
 *******************************************************/
import { initMiniApp } from "@worldcoin/minikit"; // Adjust if official SDK differs
import { ethers } from "ethers";

// Replace with your actual contract address on WorldChain
const CONTRACT_ADDRESS = "<<<YOUR_CONTRACT_ADDRESS>>>";

// Minimal ABI for the functions you need:
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "token", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "planYears", "type": "uint256" }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
  // Add other functions like "withdraw" or "distributeIfInactive" if needed
];

let provider;
let signer;
let contract;

/*******************************************************
 * initWorldApp - Initializes the WorldCoin Mini App
 *******************************************************/
async function initWorldApp() {
  try {
    await initMiniApp({
      projectId: "<<<YOUR_PROJECT_ID>>>", // Provided by WorldCoin if applicable
      onInitSuccess: () => console.log("WorldCoin Mini App initialized"),
      onInitError: (err) => console.error("Error initializing Mini App:", err)
    });
  } catch (err) {
    console.error("initWorldApp failed:", err);
  }
}

/*******************************************************
 * connectWallet - Requests wallet access and sets up
 *                 the contract instance for WorldChain
 *******************************************************/
async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const address = await signer.getAddress();
    console.log("Connected wallet:", address);
    alert(`Wallet connected: ${address}`);
  } else {
    alert("Please install Metamask or another compatible wallet for WorldChain.");
  }
}

/*******************************************************
 * depositToContract - Calls the deposit(...) function
 *******************************************************/
async function depositToContract() {
  if (!contract) return alert("Connect your wallet first.");

  try {
    const tokenAddress = document.getElementById("tokenAddress").value;
    const amount = document.getElementById("amount").value;
    const planYears = document.getElementById("planYears").value;

    const tx = await contract.deposit(tokenAddress, amount, planYears);
    await tx.wait();
    alert("Deposit successful!");
  } catch (err) {
    console.error("Error depositing:", err);
    alert("Deposit failed.");
  }
}

/*******************************************************
 * renderApp - Renders a simple UI in the #app div
 *******************************************************/
function renderApp() {
  const appDiv = document.getElementById("app");

  appDiv.innerHTML = `
    <h1>WorldRetirementFound - Mini App</h1>
    <button id="btnInit">Init World App</button>
    <button id="btnConnect">Connect Wallet</button>
    <br/><br/>
    <input id="tokenAddress" placeholder="Token Address (ERC20)" />
    <input id="amount" placeholder="Amount to deposit" />
    <input id="planYears" placeholder="Years (10 - 40)" />
    <button id="btnDeposit">Deposit</button>
  `;

  document.getElementById("btnInit").onclick = initWorldApp;
  document.getElementById("btnConnect").onclick = connectWallet;
  document.getElementById("btnDeposit").onclick = depositToContract;
}

/*******************************************************
 * Entry point on window load
 *******************************************************/
window.onload = () => {
  renderApp();
};
