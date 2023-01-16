import { Button, Image } from "antd";
import React from "react";
import Image2 from "../../assets/image_1.png";
import config from "../../../env.json";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EventCard = ({ title, summary, category, id, images }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/events/${id}`);
  };
  return (
    <div
      key={id}
      data-aos="fade-up"
      className="p-3  rounded-5 border events-card w-sm-100"
    >
      <div className="event-card-image">
        <Image
          className="rounded-4"
          fallback={Image2}
          src={`${config.IMAGE_BASE_URL}/${images?.[0]?.file_path}`}
        />
      </div>
      <div className="event-card-top mt-4 mb-2 px-2 d-flex">
        <div className="d-flex w-50 justify-content-left">
          <Button className="" shape="round">
            {category}
          </Button>
        </div>
        <h4 className="w-50 d-flex justify-content-end">
          <AiOutlineHeart className="text-right" />
        </h4>
      </div>
      <div className="px-2">
        <h4 className="fw-bold">{title}</h4>
        <p>{summary}</p>
        <Button
          onClick={goToDetails}
          shape="round"
          className="w-100"
          type="primary"
          size="large"
        >
          Book Ticket
        </Button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  address: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  images: PropTypes.array,
};

export default EventCard;
