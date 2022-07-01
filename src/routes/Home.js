import { dbService, storageService } from "../fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

function Home({ userObj }) {
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

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets &&
          tweets.map((item) => (
            <Nweet
              KEY={item.id}
              nweetObj={item}
              isOwner={item.creatorId === userObj.uid}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
