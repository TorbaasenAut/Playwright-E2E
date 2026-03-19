import { type FullConfig } from '@playwright/test';
import { exec } from "child_process"
import { Console, error } from 'console';
import { promisify } from 'util';

export default async function globalTeardown(config: FullConfig) {
    console.log(`[INFO]: Starting the global teardown process...`);

    if (process.env.RUNNER?.toUpperCase() === 'LOCAL') {
        //Generating Allure report for local runs
        console.log(">>  local run detected - starting allure server...");
        const { exec } = require(`child_process`);
        //const command = "C:\\Users\\Torbaas\\AppData\\Roaming\\npm\\allure.cmd serve";
        //       console.log("Current Directory: ", process.cwd());
        //      console.log("Environment Variables: ", process.env);
        // console.log(`\nCommand: ${command} \n`);
        const execPromise = (cmd: string) => {
            return new Promise((resolve, reject) => {
                exec(cmd, (error: any, stdout: any, stderr: any) => {
                    if (error) {
                        reject(error);
                    }
                    resolve({ stdout, stderr });
                });
            });
        };

        try {
            const { stdout, stderr } = await execPromise("allure serve");
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        } catch (error) {
            console.error("Execution error: ", error.message);
        }
    };

}