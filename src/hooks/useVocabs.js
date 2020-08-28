import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setVocabs } from "../actions/appStatusActions";
import screencap from "../api/screencap";

export default ({ sqliteNoteId }) => {
  const [fetchFinished, setFetchFinished] = useState(false);
  const { token } = useSelector((state) => state.login);

  useEffect(() => {
    console.log("sqliteNoteId", sqliteNoteId);
    screencap
      .get("/api/screencaps/vocabs/byNoteId/" + sqliteNoteId, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((res) => {
        setFetchFinished(false);
        const vocabs = res.data;
        console.log(vocabs);
        setVocabs(vocabs);
        setFetchFinished(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return { fetchFinished };
};
