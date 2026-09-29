import {
  FetchFeedFeedTypeEnum,
  FetchFeedFilterTypeEnum,
} from "@neynar/nodejs-sdk/build/api/index.js";
import { getClient } from "./client.js";

function isCastValid(cast, likeThreshold, recastThreshold, followerCountThreshold) {
  return (
    (cast.reactions.likes_count > likeThreshold ||
      cast.reactions.recasts_count > recastThreshold) &&
    cast.author.follower_count > followerCountThreshold
  );
}

async function fetchCasts({
  apiKey,
  channelId,
  limit,
  likeThreshold,
  recastThreshold,
  followerCountThreshold,
  urlDomainFilter,
  maxResults,
  maxQueries,
}) {
  const client = getClient(apiKey);

  let allResults = [];
  let nextCursor = null;
  let queryCount = 0;

  do {
    const { casts, next } = await client.fetchFeed({
      feedType: FetchFeedFeedTypeEnum.Filter,
      filterType: FetchFeedFilterTypeEnum.ChannelId,
      channelId: channelId,
      withRecasts: true,
      withReplies: false,
      limit: limit,
      cursor: nextCursor,
    });

    queryCount++;

    const memeUrls = casts
      .filter((cast) => isCastValid(cast, likeThreshold, recastThreshold, followerCountThreshold))
      .flatMap((cast) => cast.embeds ?? [])
      .map(({ url }) => url)
      .filter((url) => url && url.includes(urlDomainFilter));

    allResults.push(...memeUrls);
    nextCursor = next && next.cursor;
  } while (
    nextCursor &&
    (!maxResults || allResults.length < maxResults) &&
    (!maxQueries || queryCount < maxQueries)
  );

  return maxResults ? allResults.slice(0, maxResults) : allResults;
}

export function logResults(urls) {
  const uniqueResults = [...new Set(urls)];
  if (uniqueResults.length === 0) {
    console.error(
      "No matching URLs found. Try lowering the thresholds or widening the domain filter."
    );
    return;
  }
  uniqueResults.forEach((url) => console.log(url));
}

export async function fetchCastsHandler(argv) {
  if (!process.env.NEYNAR_API_KEY) {
    console.error("Missing NEYNAR_API_KEY. Add it to your .env file (see .env.example).");
    process.exitCode = 1;
    return;
  }
  try {
    const results = await fetchCasts({
      apiKey: process.env.NEYNAR_API_KEY,
      channelId: argv.channelId,
      limit: argv.limit,
      likeThreshold: argv.likeThreshold,
      recastThreshold: argv.recastThreshold,
      followerCountThreshold: argv.followerCountThreshold,
      urlDomainFilter: argv.urlDomainFilter,
      maxResults: argv.maxResults,
      maxQueries: argv.maxQueries,
    });

    logResults(results);
  } catch (err) {
    // Print a one-line message: the raw Axios error dumps config and stack.
    console.error(`Fetch failed: ${err?.response?.data?.message ?? err.message}`);
    if ([401, 402, 403].includes(err?.response?.status)) {
      console.error("Verify your Neynar API key and plan.");
    }
    process.exitCode = 1;
  }
}
