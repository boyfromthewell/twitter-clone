import { dbService, storageService } from "../fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");

  const [tweets, setTweets] = useState([]);
  const [fileString, setFileString] = useState("");

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
    let attachmentUrl = "";
    if (fileString !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(fileString, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setTweet("");
    setFileString("");
  };

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileString(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setFileString(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {fileString && <img src={fileString} width="50px" height="50px" />}
        <button onClick={onClearAttachment}>Clear</button>
      </form>
      <div>
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
