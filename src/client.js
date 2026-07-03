import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

export const getClient = (apiKey) =>
  new NeynarAPIClient(new Configuration({ apiKey }));
