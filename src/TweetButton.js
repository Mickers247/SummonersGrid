import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const TweetButton = ({ text }) => {
  const tweetText = encodeURIComponent(text);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div>
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
        <button className="btn" ><div>Share Results <FaTwitter/></div></button>
      </a>
    </div>
  );
};

export default TweetButton;
