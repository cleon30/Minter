import {keypairIdentity, Metaplex} from "@metaplex-foundation/js";
import {clusterApiUrl, Connection, Keypair} from "@solana/web3.js";
const fs = require("fs");
const anchor = require("@project-serum/anchor");
const connection = new Connection(clusterApiUrl("devnet")); 
const metaplex = new Metaplex(connection);
function loadKeypair(filename: string):Keypair{
  const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[]
  const secretKey = Uint8Array.from(secret)
  return Keypair.fromSecretKey(secretKey)
}
async function main(){
const collectionAuthority = loadKeypair("minf8m9eFyp7292L77V9yfTYEgUoDW476ZkqoXng9Bi.json");
metaplex.use(keypairIdentity(collectionAuthority));
// CandyMachine configuration 
const { nft: collectionNft } = await metaplex.nfts().create({
    name: "My Collection NFT",
    uri: "https://shdw-drive.genesysgo.net/CL4s5cFeeRe4tc4ihrPkNpbqWNVykKyZRtHvdwTSWDnH/orca.json",
    sellerFeeBasisPoints: 0,
    isCollection: true,
    updateAuthority: collectionAuthority,
});
console.log(collectionNft.address.toBase58());

};

main();