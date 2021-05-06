import "../css/users/profile.css";
import { Suspense, lazy } from "react";
import LogoGif from "../components/LogoGif";

import { ProfileProvider } from "../shared/context/profileContext";

const PasswordModal = lazy(() => import("../components/modales/PasswordModal"));
const PhotoProfileModal = lazy(() =>
  import("../components/modales/PhotoProfileModal")
);
const DeletePhotoModal = lazy(() =>
  import("../components/modales/DeletePhotoModal")
);
const InfoModalsGroup = lazy(() =>
  import("../components/users/InfoModalsGroup")
);
const UserInfoContainer = lazy(() =>
  import("../components/users/UserInfoContainer")
);

export default function Profile() {
  return (
    <>
      <Suspense fallback={<LogoGif />}>
        <ProfileProvider>
          <PasswordModal />
          <DeletePhotoModal />
          <PhotoProfileModal />
          <InfoModalsGroup />
          <UserInfoContainer />
        </ProfileProvider>
      </Suspense>
    </>
  );
}
