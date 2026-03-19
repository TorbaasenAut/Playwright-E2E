import { type FullConfig } from '@playwright/test';
import path from 'path';
import fs from "fs"

export default async function globalSetup(config: FullConfig) {
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>>resultsDir: ${resultsDir}`);

    if(fs.existsSync(resultsDir)){
      fs.rmSync(resultsDir,{recursive:true,force:true})  
    }
}

