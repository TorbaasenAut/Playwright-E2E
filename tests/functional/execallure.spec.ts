//import { type FullConfig } from '@playwright/test';
import {test,expect} from "@playwright/test";

 import { Console } from 'console';

const { exec } = require('child_process');

test("Should login successfully",async({page}) => {
 
exec("allure serve", (error: { message: any; }, stdout: any, stderr: any) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    console.log(`Output: ${stdout}`);
    console.error(`Error Output: ${stderr}`);
});

});

