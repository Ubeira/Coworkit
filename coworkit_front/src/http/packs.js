import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from "../shared/utils/fetchFunctions";
const endpoints = {
  packsInfo: "/packs/",
  filterPacks: "/admin/packs/",
  togglePack: "/packs/",
  editPack: "/packs/",
};

export async function getPacksInfo() {
  const reviewData = await fetchApi(`${endpoints.packsInfo}`, {
    method: requestMethods.get,
  });
  if (reviewData.status === "error") {
    return reviewData;
  }
  return reviewData.data;
}

export async function filterPacksAdmin(query = "", order = "", direction = "") {
  const ordenation = `order=${order}&direction=${direction}`;
  const reviewData = await fetchApi(
    `${endpoints.filterPacks}${query}${ordenation}`,
    {
      method: requestMethods.get,
    }
  );
  return reviewData.data;
}

export async function togglePackStatus(packId) {
  try {
    await fetchApi(`${endpoints.togglePack}${packId}`, {
      method: requestMethods.delete,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updatePack(data, packId) {
  packId = packId ? packId : data.packId;
  const body = new FormData();
  body.append("type", data.type);
  body.append("content", data.content);
  body.append("price", data.price);

  data?.photo && body.append("photo", data?.photo);

  return await fetchFormData(`${endpoints.editPack}${packId}`, {
    method: requestMethods.put,
    body,
  });
}
