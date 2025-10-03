import React from "react";
import PowerStationImg from "../../assets/powerstation.jpg";

export const PowerStation: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 4,
      left: 4,
      width: 18,
      height: 18,
      backgroundColor: "#ffff008a",
      zIndex: 3,
      borderRadius: "50%",
    }}
  >
    <div
      style={{
        width: 18,
        height: 18,
        backgroundImage: `url(${PowerStationImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 3,
      }}
    />
  </div>
);
