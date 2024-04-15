"use client";
import { getRecommendedSongs, getlyricsData } from "@/services/dataAPI";
import { useState } from "react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SongsList from "../SongsList";
import { useDispatch } from "react-redux";
import { setAutoAdd } from "@/redux/features/playerSlice";

const Lyrics = ({ activeSong }) => {
  const dispatch = useDispatch();
  const { currentSongs, autoAdd } = useSelector((state) => state.player);
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("queue");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getlyricsData(activeSong?.id);
      setLyrics(res);
      setLoading(false);
    };
    if (activeSong?.id) fetchData();
  }, [activeSong?.id]);

  const handleAutoAdd = (checked) => {
    console.log(autoAdd);
    if (checked) {
      dispatch(setAutoAdd(true));
      localStorage.setItem("autoAdd", true);
    } else {
      dispatch(setAutoAdd(false));
      localStorage.setItem("autoAdd", false);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-center items-center w-full">
        <button
          onClick={() => {
            setActiveTab("queue");
          }}
          className={`${
            activeTab === "queue" ? "border-[#00e6e6] border-b-2" : ""
          } text-white text-xl m-3 mt-20 sm:mt-0 font-medium `}
        >
          Queue
        </button>
        <button
          onClick={() => {
            setActiveTab("lyrics");
          }}
          className={`${
            activeTab === "lyrics" ? "border-[#00e6e6] border-b-2" : ""
          } text-white text-xl m-3 mt-20 sm:mt-0  font-medium`}
        >
          Lyrics
        </button>
      </div>
      <div>
        {activeTab === "lyrics" ? (
          lyrics?.success ? (
            <div className="text-white text-sm sm:text-base p-4 sm:p-0 mt-5 md:w-[450px] md:h-[530px] overflow-y-scroll hideScrollBar text-center">
              {lyrics?.data?.lyrics?.split("<br>").map((line, index) => {
                return <p key={index}>{line}</p>;
              })}
            </div>
          ) : (
            <div className="text-white text-lg p-4 sm:p-0 mt-5 md:w-[450px] md:h-[530px] overflow-y-scroll hideScrollBar text-center">
              No Lyrics Found
            </div>
          )
        ) : (
          <div>
            <div
              className=" flex justify-between gap-7 mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className=" text-white font-medium">
                Auto add similar songs to queue
              </p>

              <label
                htmlFor="autoAddButton"
                className="relative inline-flex items-center mb-1 cursor-pointer mr-4"
              >
                <input
                  onChange={(e) => {
                    handleAutoAdd(e.target.checked);
                  }}
                  type="checkbox"
                  checked={autoAdd}
                  className="sr-only peer"
                  name="autoAddButton"
                  id="autoAddButton"
                  placeholder="autoAddButton"
                  title={autoAdd ? "on" : "off"}
                ></input>
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none ring-2  ring-gray-500 ch rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#00e6e6]"></div>
              </label>
            </div>
            {currentSongs?.length > 0 ? (
              <div className=" text-white p- mt- md:w-[450px] md:h-[530px] overflow-y-scroll hideScrollBar ">
                <SongsList
                  SongData={currentSongs}
                  loading={false}
                  hidePlays={true}
                  activeSong={activeSong}
                />
              </div>
            ) : (
              <div className="text-white text-lg p-4 sm:p-0 mt-5 md:w-[450px] md:h-[500px] overflow-y-scroll hideScrollBar text-center">
                No Songs
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lyrics;
