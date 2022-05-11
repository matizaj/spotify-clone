import { ButtonGroup, Box, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderTrack, RangeSliderThumb, Center, Flex, Text } from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import { MdShuffle, MdSkipNext, MdSkipPrevious, MdOutlinePlayCircleFilled, MdOutlinePauseCircleFilled, MdOutlineRepeat } from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { sendEtagResponse } from "next/dist/server/send-payload";
import { formatTime } from "../lib/formattres";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(songs.findIndex((s) => s.id === activeSong.id));
  const [seek, setSeek] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
    }
    return () => {
      cancelAnimationFrame(timerId);
    };
  }, [playing, isSeeking]);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  const isPlaiyng = playing ? (
    <IconButton
      outline="none"
      variant="link"
      aria-label="play"
      fontSize="36px"
      icon={<MdOutlinePauseCircleFilled />}
      color="white"
      onClick={() => setPlayState(false)}
    />
  ) : (
    <IconButton
      outline="none"
      variant="link"
      aria-label="play"
      fontSize="36px"
      icon={<MdOutlinePlayCircleFilled />}
      color="white"
      onClick={() => setPlayState(true)}
    />
  );
  const prevSong = () => {
    setIndex((state) => (state ? state - 1 : sendEtagResponse.length - 1));
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          return nextSong();
        }
        return next;
      }
    });
  };

  const handleEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const handleLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const handleSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} ref={soundRef} onLoad={handleLoad} onEnd={handleEnd} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
            color={shuffle && "white"}
            onClick={() => {
              setShuffle((prev) => !prev);
            }}
          />
          <IconButton outline="none" variant="link" aria-label="previous" fontSize="24px" icon={<MdSkipPrevious />} onClick={prevSong} />
          {isPlaiyng}
          <IconButton outline="none" variant="link" aria-label="next" fontSize="24px" icon={<MdSkipNext />} onClick={nextSong} />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            color={repeat && "white"}
            onClick={() => {
              setRepeat((prev) => !prev);
            }}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              id="player-range"
              onChange={handleSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.500" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
