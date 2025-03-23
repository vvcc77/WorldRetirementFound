# WorldRetirementFound
World Retirement Fund (WRF) is the first decentralized retirement solution designed for the crypto era. A model that eliminates intermediaries, ensures full transparency, and empowers individuals to plan their financial future with autonomy. No more empty promises. No more uncertainty. Just real control over your retirement.

1. README.md: This guide.2. package.json: Dependencies and scripts (Parcel as the bundler).
3. public/index.html: The base HTML where the app is injected.4. src/App.js: Main logic that references WorldCoin’s Minikit and your contract on WorldChain.
## Requirements
- Node.js (version 14 or 16+).
- A wallet (e.g., Metamask) configured for WorldChain (with the correct RPC and Chain ID).- Some WLD or native token on WorldChain to pay gas when interacting with the contract.
## How to Use This Prototype
1. Clone the repository:
   ```bash   git clone https://github.com/vvcc77/WorldRetirementFound.git
   cd WorldRetirementFound
Install dependencies:

npm install

Configure src/App.js:

    CONTRACT_ADDRESS: the address of your deployed contract on WorldChain.

    CONTRACT_ABI: the functions you need (e.g., deposit, withdraw, etc.).

Start the local dev server:

    npm run dev

    Open http://localhost:3000 in your browser.

    Test:

        Click “Init World App” to initialize the Minikit.

        Connect your wallet on the correct WorldChain network.

        Deposit tokens to the contract or call other functions as needed.

Deployment for Testing

If you want others to test this Mini App without cloning, you can deploy it to a static hosting service (Netlify, Vercel, GitHub Pages, etc.):

    npm run build

    Upload the resulting dist/ folder to your chosen hosting platform.

    Share the resulting URL, which can be embedded in a WebView within the World App.
