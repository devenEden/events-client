import { Button, Image, Tag, Typography } from "antd";
import React from "react";
import BgContainer from "../shared/BgContainer";
import Image2 from "../../assets/image_1.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const EventCard = ({ title, summary, address, category, id }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/tickets/${id}`);
  };
  return (
    <div className="event-card rounded shadow-sm m-1 w-100">
      <BgContainer>
        <div className="w-100 d-flex">
          <div className="event-card-image-container ml-2 p-1">
            <Image className="rounded-2" height={230} src={Image2} />
          </div>
          <div className="even-card-content py-2 px-3">
            <h3 className="fw-normal">{title}</h3>
            <div className="d-flex mb-3">
              <Tag color={"processing"}>{category}</Tag>
              <Tag>{address}</Tag>
            </div>
            <Typography.Paragraph color="gray">{summary}</Typography.Paragraph>
            <Typography.Text>Start Time</Typography.Text>
            <br />
            <Typography.Text>{new Date().toDateString()}</Typography.Text>
            <br />
            <Button onClick={goToDetails} className="mx-0 my-2" type="primary">
              {" "}
              Get Tickets
            </Button>
          </div>
        </div>
      </BgContainer>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  address: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
};

export default EventCard;
