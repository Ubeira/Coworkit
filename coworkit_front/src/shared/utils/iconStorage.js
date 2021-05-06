import AlertUser from "../../components/admin/AlertUser";

export function iconStorage(iconName, newClass = "") {
  const icons = {
    delete: <i className={"fas fa-trash-alt " + newClass}></i>,
    edit: <i className={"far fa-edit " + newClass}></i>,
    save: <i className={"far fa-save " + newClass}></i>,
    undo: <i className={"fas fa-undo " + newClass}></i>,
    showPic: <i className={"far fa-image " + newClass}></i>,
    check: <i className={"fas fa-check " + newClass}></i>,
    contact: <i className={"far fa-envelope " + newClass}></i>,
    multiSort: <i class={"fas fa-sort " + newClass}></i>,
    sort: <i class={"fas fa-sort-up " + newClass}></i>,
    fieldChecked: <i class={"fas fa-check-circle " + newClass}></i>,
    fieldUnchecked: <i class={"far fa-check-circle " + newClass}></i>,
    alertUser: <AlertUser />,
    addIcon: <i class={"fas fa-plus " + newClass}></i>,
  };

  return icons[iconName];
}
