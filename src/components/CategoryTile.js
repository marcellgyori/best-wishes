import React from "react";
import {
  FaBirthdayCake,
  FaHeart,
  FaGift,
  FaTree,
  FaUserFriends,
  FaRegSmileBeam,
  FaRegFrownOpen,
  FaHeartBroken,
} from "react-icons/fa";

function CategoryTile({ category, label, wishCount }) {
  // Az ikonok kiválasztása kategóriánként
  let Icon;
  switch (category) {
    case "birthday":
      Icon = FaBirthdayCake;
      break;
    case "anniversary":
      Icon = FaHeart;
      break;
    case "christmas":
      Icon = FaTree;
      break;
    case "congratulations":
      Icon = FaGift;
      break;
    case "nameDay":
      Icon = FaRegSmileBeam; // Névnap ikon
      break;
    case "illness":
      Icon = FaRegFrownOpen; // Betegség ikon
      break;
    case "breakup":
      Icon = FaHeartBroken; // Szakítás ikon
      break;
    default:
      Icon = FaUserFriends; // Alapértelmezett ikon
  }
  return (
    <div className="category-tile">
      <Icon size={48} /> {/* Ikon méretének növelése */}
      <div className="category-label">{label}</div> {/* Kategória elnevezése */}
      <div className="wish-count">{wishCount} kívánság</div>{" "}
      {/* Kívánságok száma */}
    </div>
  );
}

export default CategoryTile;
