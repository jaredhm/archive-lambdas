import { LambdaClient, GetFunctionCommand } from "@aws-sdk/client-lambda";
import https from 'https';
import http from 'http';
import { promises as fs } from 'fs';
import assert from "assert";
import path from "path";
import lambdaNames from './config/lambdas.json';

const OUTPUT_DIRECTORY = path.join(__dirname, "output");

const client = new LambdaClient({});

const run = async (): Promise<void> => {
  for (const lambdaName of lambdaNames) {
    const lambdaDirectory = path.join(OUTPUT_DIRECTORY, lambdaName);
    await fs.mkdir(lambdaDirectory, { recursive: true });
    const getFunctionResult = await client.send(
      new GetFunctionCommand({
        FunctionName: lambdaName
      })
    );
    assert(getFunctionResult?.Configuration);
    await fs.writeFile(
      path.join(lambdaDirectory, `${lambdaName}.conf.json`),
      JSON.stringify(getFunctionResult.Configuration, undefined, 2),
      { encoding: 'utf-8' }
    );
    assert(getFunctionResult.Code?.Location);
    const presignedUrl = getFunctionResult.Code.Location;
    const response = await new Promise<http.IncomingMessage>(
      (resolve) => https.get(presignedUrl, resolve)
    );
    await fs.writeFile(
      path.join(lambdaDirectory, `${lambdaName}.zip`),
      response,
    );
  }
}

if (require.main === module) {
  run();
}