import 'dotenv/config';
import Twitter from 'twitter-api-v2';

function main(): void {
  const twitterCredential: any = {
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
  };

  const twitterClient = new Twitter(twitterCredential);
  twitterClient.v2.tweetThread(['nice boat!']);
}

main();
