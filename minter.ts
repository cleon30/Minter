import {keypairIdentity, Metaplex,MintAuthorityMustBeSignerToMintInitialSupplyError,mintCandyMachineV2Operation,sol,toBigNumber, toDateTime} from "@metaplex-foundation/js";
import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";
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
// const { nft: collectionNft } = await metaplex.nfts().create({
//     name: "My Collection NFT",
//     uri: "https://shdw-drive.genesysgo.net/CL4s5cFeeRe4tc4ihrPkNpbqWNVykKyZRtHvdwTSWDnH/orca.json",
//     sellerFeeBasisPoints: 0,
//     isCollection: true,
//     updateAuthority: collectionAuthority,
// });
const collectionNft = new PublicKey("BrJH63SoYNHYGAWA2FDGUkctkKaVi3xAosnc4URuoWVr");
// console.log(collectionNft.address.toBase58());
const { candyMachine } = await metaplex.candyMachines().create({
  itemsAvailable: toBigNumber(100),
  sellerFeeBasisPoints: 333, // 3.33%
  collection: {
    address: collectionNft,
    updateAuthority: metaplex.identity(),
  },
  isMutable : true,
  symbol:"PROJECT",
   maxEditionSupply:toBigNumber(0),
   creators:[
     {
       address: collectionAuthority.publicKey,
       share:100
     }
   ],
   itemSettings:{
     type:"configLines",
     prefixName:"Orca Number #$ID+1$",
     nameLength:0,
     prefixUri:"https://shdw-drive.genesysgo.net/CL4s5cFeeRe4tc4ihrPkNpbqWNVykKyZRtHvdwTSWDnH/$ID$.json",
     uriLength:43,
     isSequential:false,
   },
  guards:{
    solPayment:{amount: sol(0.01), destination : collectionAuthority.publicKey},
  }
});
};

main();