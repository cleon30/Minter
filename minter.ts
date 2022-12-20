import {Metaplex} from "@metaplex-foundation/js";
import {clusterApiUrl, Connection, Keypair} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet")); 
const metaplex = new Metaplex(connection);

// CandyMachine configuration 
const collectionAuthority = Keypair.generate();
const { nft: collectionNft } = await metaplex.nfts().create({
    name: "My Collection NFT",
    uri: "https://example.com/path/to/some/json/metadata.json",
    sellerFeeBasisPoints: 0,
    isCollection: true,
    updateAuthority: collectionAuthority,
  });

