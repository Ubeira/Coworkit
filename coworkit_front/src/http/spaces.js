import { Redirect } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from "../shared/utils/fetchFunctions";

import queryGenerator from "../shared/utils/queryGenerator";
const endpoints = {
  reviewInfo: "/reviews/",
  spaceInfo: "/spaces/",
  filterAdmin: "/admin/spaces",
  toggleSpace: "/spaces/enable/",
  addSpace: "/spaces",
  deletePhoto: "/spaces/",
  editSpace: "/spaces/",
};
export async function filterSpaces(querys) {
  const spaceData = await fetchApi(
    `${endpoints.spaceInfo}${queryGenerator(querys)}`,
    {
      method: requestMethods.get,
    }
  );
  return spaceData.data;
}
export async function filterSpacesAdmin(
  query = "",
  order = "",
  direction = ""
) {
  const ordenation = `order=${order}&direction=${direction}`;
  const spaceData = await fetchApi(
    `${endpoints.filterAdmin}${query}${ordenation}`,
    {
      method: requestMethods.get,
    }
  );
  return spaceData.data;
}

export async function getSpaceInfo(spaceId) {
  try {
    const spaceData = await fetchApi(`${endpoints.spaceInfo}${spaceId}`, {
      method: requestMethods.get,
    });

    if ((await spaceData?.status) === "error") {
      throw new Error(spaceData.message);
    }
    return spaceData.data;
  } catch (error) {
    return <Redirect to="/error" error={error.message} />;
  }
}

export async function toggleSpaceStatus(spaceId) {
  try {
    await fetchApi(`${endpoints.toggleSpace}${spaceId}`, {
      method: requestMethods.put,
    });
  } catch (error) {
    console.error(error);
  }
}
export async function deletePhotoSpace(spaceId, url) {
  try {
    await fetchApi(`${endpoints.deletePhoto}${spaceId}`, {
      method: requestMethods.delete,
      body: { url },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function newSpace(data) {
  const body = new FormData();
  body.append("name", data.name);
  body.append("type", data.type);
  body.append("price", Number(data.price));
  body.append("capacity", Number(data.capacity));
  body.append("description", data.description);
  // data?.photos[0] && body.append("photo1", data?.photos[0]);
  // data?.photos[1] && body.append("photo2", data?.photos[1]);
  // data?.photos[2] && body.append("photo3", data?.photos[2]);
  // data?.photos[3] && body.append("photo4", data?.photos[3]);
  // console.log(body);
  const photos = data?.photos ? data?.photos : false;
  for (let i = 0; i < photos.length; i++) {
    body.append(`photo${i + 1}`, photos[i]);
  }
  return await fetchFormData(`${endpoints.addSpace}`, {
    method: requestMethods.post,
    body,
  });
}

export async function editSpace(data, spaceId) {
  const body = new FormData();
  body.append("name", data.name);
  body.append("type", data.type);
  body.append("price", Number(data.price));
  body.append("capacity", Number(data.capacity));
  body.append("description", data.description);
  const photos = data?.photos ? data?.photos : false;
  if (photos[0]) {
    for (let i = 0; i < photos.length; i++) {
      body.append(`photo${i + 1}`, photos[i]);
      console.log(`photo${i + 1}`);
    }
  }
  return await fetchFormData(`${endpoints.editSpace}${spaceId}`, {
    method: requestMethods.put,
    body,
  });
}
