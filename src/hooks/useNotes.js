import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setVocabs, setNotes, setPages } from "../actions/appStatusActions";
import screencap from "../api/screencap";

export default () => {
  const [fetchFinished, setFetchFinished] = useState(false);

  const jwtToken = useSelector((state) => state.login.token);

  useEffect(() => {
    screencap
      .get("/api/screencaps/notes", {
        headers: {
          Authorization: "Bearer " + jwtToken
        }
      })
      .then((res) => {
        const notes = res.data;
        setNotes(notes);
        setFetchFinished(true);
      })
      .catch((err) => {
        console.log(err);
        setNotes([]);
      })
      .finally();
  }, []);

  return { fetchFinished };
};
