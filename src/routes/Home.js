import { dbService } from "../fbase";
import React, { useEffect, useState } from "react";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");

  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets &&
          tweets.map((item) => (
            <div key={item.id}>
              <h4>{item.text}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
