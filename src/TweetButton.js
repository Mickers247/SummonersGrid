import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Modal, Button } from 'react-bootstrap';

const TweetButton = ({ text }) => {
  const tweetText = encodeURIComponent(text);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div>
      <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="secondary" className="btn" ><FaTwitter/></Button>
      </a>
    </div>
  );
};

export default TweetButton;
