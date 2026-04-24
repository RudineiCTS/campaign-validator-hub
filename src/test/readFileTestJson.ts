import { readFile } from "fs/promises";

async function ReadFileTeste(){
    try{
        const data = await readFile("./campanhas.json","utf-8");
        const campanhas = JSON.parse(data);
        return campanhas;
    }catch(err){
        console.log(err);
    }
}
export default ReadFileTeste
