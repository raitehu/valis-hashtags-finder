import 'dotenv/config';
const twitterParser = require('twitter-text');
import { TweetUserTimelineV2Paginator, TwitterApi } from 'twitter-api-v2';

async function main(): Promise<void> {
  let hashtags: string[] = [];
  // twitter ID
  const twitterIDs: TwitterIDs = {
    chino: '1293874134393348096',
    myu:   '1294240668286480389',
    neffy: '1294112283539341312',
    nina:  '1293832387361562625',
    rara:  '1296359217373179906',
    vitte: '1294518306209067008',
  }

  for (const key of Object.keys(twitterIDs)) {
    console.log(`Start getting ${key}'s tweets.`);
    const result = await getHashtags(twitterIDs[key]);
    console.log(`Finish getting ${key}'s ${result.tweetNumber} tweets.`)
    hashtags = hashtags.concat(result.hashtags);

    console.log(`There are ${hashtags.length} hashtags.`)
  }

  uniq(hashtags).forEach(function(hashtag){
    console.log(`#${hashtag}`);
  });
}

async function getHashtags (twitterID: string): Promise<Result> {
  const hashtags: string[] = [];
  const wholeTweet: object[] = [];
  // Bearer Tokenを用いてOAuth 2.0のTwitter APIのClient作成
  const twitterClient = new TwitterApi(String(process.env.BEARER_TOKEN));
  // 1ページ目を取得
  // exclude: ['retweets', 'replies'] を入れると580件しかとれなくなるので全件取得する
  const memberTweets = await twitterClient.v2.userTimeline(twitterID, { max_results: 100 });
  // 2ページ目以降も同様に配列に入れる
  while (!memberTweets.done) {
    await memberTweets.fetchNext();
  }
  for (const tweet of memberTweets) {
    if (tweet.text.substring(0, 4) !== 'RT @') {
      hashtags.push(twitterParser.extractHashtags(tweet.text));
    }
    wholeTweet.push(tweet);
  }
  const result: Result = {
    tweetNumber: wholeTweet.length,
    hashtags: uniq(hashtags.flat()),
  }
  return result;
}

function uniq (ununiqueArray: string[]): string[] {
  return Array.from(new Set(ununiqueArray));
}

interface TwitterIDs {
  chino: string;
  myu:   string;
  neffy: string;
  nina:  string;
  rara:  string;
  vitte: string;
  [key: string]: string;
}

type Result = {
  tweetNumber: number;
  hashtags: string[];
}

main();
