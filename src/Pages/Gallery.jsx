import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ButtonSend from "../components/ButtonSend";
import ButtonRequest from "../components/ButtonRequest";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSpring, animated } from "@react-spring/web";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const modalFade = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  });

  // Ambil data gambar dari Firebase
  const fetchImagesFromFirebase = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, "GambarAman/");
      const imagesList = await listAll(storageRef);

      const imageURLs = await Promise.all(
        imagesList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );

      setImages(imageURLs);
    } catch (error) {
      console.error("Error fetching images from Firebase Storage:", error);
    }
  };

  useEffect(() => {
    fetchImagesFromFirebase();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div
        className="text-white opacity-80 text-base font-semibold mb-6 mx-[10%] mt-10 lg:text-center lg:text-3xl lg:mb-10"
        id="Gallery"
      >
        Class Gallery
      </div>

      {/* Swiper Gallery */}
      <div className="px-6 lg:px-20">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="mySwiper"
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                onClick={() => handleImageClick(imageUrl)}
                className="rounded-xl w-full aspect-square object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tombol */}
      <div className="flex justify-center items-center gap-6 text-base mt-6 lg:mt-10">
        <ButtonSend />
        <ButtonRequest />
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        className="flex justify-center items-center"
      >
        <animated.div
          style={{
            ...modalFade,
            maxWidth: "90vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
          className="p-2 rounded-lg"
        >
          <IconButton
            edge="end"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: "12px",
              right: "23px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </animated.div>
      </Modal>
    </>
  );
};

export default Carousel;
