import express from "express";
import fs from "node:fs";

const app = express();
const content = "Some content";

// fs.writeFile('/Users/joe/test.txt', content, err => {
//     if(err){
//         console.error(err)
//     }else{

//     }
// })

async function writeFile() {
  try {
    const content = "Write file content";
    await fs.writeFile("/Users/joe/test.txt", content);
  } catch (error) {
    console.log(error);
  }
}
