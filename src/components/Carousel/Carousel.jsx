import { useEffect, useRef, useState } from "react";

const Carousel = ({
  autoPlay = true,
  autoplayInterval = 3000,
  isLoop = true,
  initialIndex = 0,
  itemsArr = [],
  transitionTime = 0.4,
}) => {
  const [items, setItems] = useState(itemsArr);
  const [currItemIndex, setCurrItemIndex] = useState(initialIndex);
  const interval = useRef();

  const nextItem = () => {
    pauseAutoPlay();
    setCurrItemIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    pauseAutoPlay();
    setCurrItemIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const autoPlayHandler = () => {
    interval.current = setInterval(() => {
      setCurrItemIndex((prev) => {
        console.log((prev + 1) % items.length);
        return (prev + 1) % items.length;
      });
    }, autoplayInterval);
  };

  const pauseAutoPlay = () => {
    clearInterval(interval.current);
    interval.current = null;
  };

  const Dot = ({ active, id }) => (
    <span
      style={{
        height: "10px",
        width: "10px",
        margin: "0 5px",
        borderRadius: "50%",
        background: active ? "black" : "white",
        display: "inline-block",
        transition: `background ${transitionTime}s ease-in-out`,
        cursor: "pointer",
      }}
      onClick={(e) => setCurrItemIndex(id)}
    />
  );
  const CarouselElement = ({ index, item }) => {
    return (
      <div
        style={{
          flex: "0 0 100%",
          maxWidth: "100%",
          height: "60vh",
          transform: `translateX(-${currItemIndex * 100}%)`,
          opacity: index === currItemIndex ? 1 : 0,
          transition: `opacity ${transitionTime}s ease-in-out`,
        }}
      >
        {item.type === "image" && (
          <img
            src={item.content}
            alt={`Carousel Item ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
        {item.type === "video" && (
          <video
            src={item.content}
            controls
            onPlay={pauseAutoPlay}
            onEnded={autoPlayHandler}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    if (autoPlay) {
      autoPlayHandler();
    }
  }, [autoPlay]);

  useEffect(() => {
    if (currItemIndex === items.length - 1 && !isLoop) {
      pauseAutoPlay();
    }
  }, [currItemIndex, isLoop]);
  useEffect(() => {
    return () => {
      pauseAutoPlay();
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-row align-items-center text-center">
        <div>
          <div onClick={prevItem} style={{ cursor: "pointer" }}>
            <span className="carousel-control-prev-icon"></span>
          </div>
        </div>
        <div
          className="text-center"
          style={{
            overflow: "hidden",
            transition: `transform ${transitionTime}s ease-in-out`,
            display: "flex",
          }}
        >
          {items.map((item, index) => (
            <CarouselElement key={index} item={item} index={index} />
          ))}
        </div>
        <div>
          <div onClick={nextItem} style={{ cursor: "pointer" }}>
            <span className="carousel-control-next-icon"></span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        {items.map((item, index) => (
          <Dot key={index} active={index === currItemIndex} id={index} />
        ))}
      </div>
    </>
  );
};

export default Carousel;
