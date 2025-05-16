import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { getFaucetHost, requestSuiFromFaucetV2 } from "@mysten/sui/faucet";
import { MIST_PER_SUI } from "@mysten/sui/utils";

const MY_ADDRESS = '0x57af34386ce16e4734f22f4fbf6d2052ec2db365dc687f3588c0cc2347275ea2';

// New Suiclient object ponting the network I want to see e.g 'devnet' 
const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

// Convert mist to sui
const balance =(balance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
};

// STore the JSON representation for the sui the addres owns before using faucet
const suiBefore = await suiClient.getBalance({
    owner: MY_ADDRESS,
});

await requestSuiFromFaucetV2({
    // getFaucetHost used make sure one uses correct faucet address
    host: getFaucetHost('testnet'),
    recipient: MY_ADDRESS,
});

// Store the JSON representation for the sui the addres owns after using faucet
const suiAfter = await suiClient.getBalance({
    owner: MY_ADDRESS,
});

// Output result to console
console.log(
    `Balance before faucet: ${balance(suiBefore)} SUI. Balance after: ${balance(suiAfter)} 
    SUI. Hello, SUI!`,
)