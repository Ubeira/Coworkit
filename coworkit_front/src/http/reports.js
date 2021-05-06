import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from "../shared/utils/fetchFunctions";

const endpoints = {
  createReport: "/report/",
  filterAdmin: "/report",
  toggleReport: "/report/",
  deleteReport: "/report/",
  answer: "/report/",
};

export async function newReport(data) {
  console.log(data);
  const { userId, spaceId } = data;
  const body = new FormData();
  body.append("category", data.category);
  body.append("description", data.description);
  data?.photo && body.append("photo", data?.photo);
  return await fetchFormData(`${endpoints.createReport}${userId}/${spaceId}`, {
    method: requestMethods.post,
    body,
  });
}
export async function filterReportsAdmin(
  query = "",
  order = "",
  direction = ""
) {
  const ordenation = `order=${order}&direction=${direction}`;
  const reportData = await fetchApi(
    `${endpoints.filterAdmin}${query}${ordenation}`,
    {
      method: requestMethods.get,
    }
  );
  return reportData.data;
}

export async function toggleReportStatus(reportId) {
  try {
    await fetchApi(`${endpoints.toggleReport}${reportId}`, {
      method: requestMethods.put,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteReport(reportId) {
  try {
    await fetchApi(`${endpoints.deleteReport}${reportId}`, {
      method: requestMethods.delete,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function answerReport(body, reportId) {
  await fetchApi(`${endpoints.answer}${reportId}`, {
    method: requestMethods.post,
    body,
  });
}
