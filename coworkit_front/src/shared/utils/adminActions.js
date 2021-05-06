import { togglePackStatus, updatePack } from "../../http/packs";
import { toggleSpaceStatus } from "../../http/spaces";
import {
  toggleReportStatus,
  deleteReport,
  answerReport,
} from "../../http/reports";
import { contactUsers, deleteUser, updateUserInfo } from "../../http/users";
import { deleteReview } from "../../http/reviews";
import { deleteReservation } from "../../http/orders";
import { editbooking } from "../../http/bookings";

export const sectionActions = {
  users: ["edit", "delete", "contact"],
  spaces: ["edit", "check"],
  packs: ["edit", "check"],
  reviews: ["delete"],
  reports: ["contact", "check", "showPic", "delete"],
  orders: ["edit", "delete"],
  edit: ["save", "undo"],
};

export const checkActions = {
  packs: togglePackStatus,
  spaces: toggleSpaceStatus,
  reports: toggleReportStatus,
};

export const deleteActions = {
  users: deleteUser,
  reports: deleteReport,
  reviews: deleteReview,
  orders: deleteReservation,
};

export const editActions = {
  orders: editbooking,
  users: updateUserInfo,
  packs: updatePack,
};

export const contactActions = {
  reports: answerReport,
  users: contactUsers,
};
