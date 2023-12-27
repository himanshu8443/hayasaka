import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import getPixels from "get-pixels";
import { extractColors } from "extract-colors";

const SongBar = ({ playlist, i }) => {
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    const src = playlist?.image?.[1]?.link;
    getPixels(src, (err, pixels) => {
      if (!err) {
        const data = [...pixels.data];
        const width = Math.round(Math.sqrt(data.length / 4));
        const height = width;

        extractColors({ data, width, height })
          .then((colors) => {
            setCardColor(colors);
            console.log(colors[0].red, colors[0].blue, colors[0].green);
          })
          .catch(console.log);
      }
    });
  }, []);

  return (
    <Link href={`/playlist/${playlist?.id}`}>
      <div
        className={`w-full flex flex-row items-center group bg-opacity-20 py-2 p-4 rounded-lg cursor-pointer mb-2 `}
        style={{
          background:
            cardColor &&
            `linear-gradient(90deg, rgba(${cardColor[0].red}, ${cardColor[0].green}, ${cardColor[0].blue}, 0.2) 0%, rgba(${cardColor[1].red}, ${cardColor[1].green}, ${cardColor[1].blue}, 0.3) 5%,
              rgba(${cardColor[2].red}, ${cardColor[2].green}, ${cardColor[2].blue}, 0.2 
              ) 100%)`,
        }}
      >
        <h3 className=" text-base text-white mr-3 font-extrabold">{i + 1}.</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
          <img
            width={80}
            height={80}
            loading="lazy"
            alt="song_img"
            srcSet={`${playlist.image?.[0]?.link} 320w, ${playlist.image?.[1]?.link} 480w, ${playlist.image?.[2]?.link} 800w`}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
            src={playlist.image?.[1]?.link}
            className=" w-20 h-20 rounded-lg"
          />
          <div className="flex-1 flex flex-col justify-center mx-3">
            <p className="font-semibold text-base w-40 lg:text-xl text-white truncate md:w-full">
              {playlist?.title}
            </p>
            <p className="md:text-base text-sm text-gray-300 mt-1 capitalize">
              {playlist?.language}
            </p>
          </div>
        </div>
        <FaPlayCircle
          size={35}
          className="text-gray-300 group-hover:scale-125 transform transition-all duration-300 ease-in-out"
        />
      </div>
    </Link>
  );
};

export default SongBar;
