import { ShdwDrive, ShadowFile} from "@shadow-drive/sdk";
import {clusterApiUrl, Connection, Keypair, PublicKey} from "@solana/web3.js";
const fs = require("fs");
const anchor = require("@project-serum/anchor");
function loadKeypair(filename: string):Keypair{
    const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[]
    const secretKey = Uint8Array.from(secret)
    return Keypair.fromSecretKey(secretKey)
}
const connection = new Connection(clusterApiUrl("mainnet-beta")); 
const kp = loadKeypair("minf8m9eFyp7292L77V9yfTYEgUoDW476ZkqoXng9Bi.json");
const wallet = new anchor.Wallet(kp);

async function createAccountBucket(): Promise<string>{
    const drive = await new ShdwDrive(connection, wallet).init();
    const resp = await drive.createStorageAccount("Recipe Book","100MB","v2");
    console.log(resp.transaction_signature);
    console.log(resp.shdw_bucket);
    return resp.shdw_bucket;
}


async function UploadCollectionImage(){
    const drive = await new ShdwDrive(connection, wallet).init();
    const bucket = "CL4s5cFeeRe4tc4ihrPkNpbqWNVykKyZRtHvdwTSWDnH";//createAccountBucket();
    const fileBuff = fs.readFileSync("orca.png"); 
    const fileToUpload: ShadowFile = {
        name:'orca.png',
        file:fileBuff
    }
const resp = await drive.uploadFile(new PublicKey(bucket), fileToUpload, "v2");
console.log(resp.message);
console.log(resp.finalized_locations);
};
UploadCollectionImage();