import {
  fetchApi,
  //fetchFormData,
  requestMethods,
} from "../shared/utils/fetchFunctions";

const endpoints = {
  reviewInfo: "/reviews/",
  filterAdmin: "/reviews",
  editReview: "/review/",
  userReview: "/reviews/",
  deleteReview: "/review/",
};

export async function getReviewInfo(spaceId) {
  const reviewData = await fetchApi(`${endpoints.reviewInfo}${spaceId}`, {
    method: requestMethods.get,
  });
  return reviewData.data;
}

export async function getUserReviewInfo(data) {
  const { userId, reviewId } = data;
  const reviewData = await fetchApi(
    `${endpoints.userReview}${reviewId}/${userId}`,
    {
      method: requestMethods.get,
    }
  );
  return reviewData.data;
}

export async function newReview(data) {
  const { userId, spaceId, comment } = data;
  const score = data.score ? Number(data.score) : 0;
  const reviewData = await fetchApi(
    `${endpoints.createReview}${spaceId}/${userId}`,
    {
      method: requestMethods.post,
      body: { comment, score },
    }
  );
  return reviewData.data;
}

export async function editReview(data) {
  const { userId, reviewId, comment } = data;
  const score = data.score ? Number(data.score) : 1;
  console.log(score);
  const reviewData = await fetchApi(
    `${endpoints.editReview}${reviewId}/${userId}`,
    {
      method: requestMethods.put,
      body: { comment, score },
    }
  );
  return reviewData.data;
}
export async function filterReviewsAdmin(
  query = "",
  order = "",
  direction = ""
) {
  const ordenation = `order=${order}&direction=${direction}`;
  const reviewData = await fetchApi(
    `${endpoints.filterAdmin}${query}${ordenation}`,
    {
      method: requestMethods.get,
    }
  );
  return reviewData.data;
}

export async function deleteReview(reviewId, userId) {
  try {
    await fetchApi(`${endpoints.deleteReview}${reviewId}/${userId}`, {
      method: requestMethods.delete,
    });
  } catch (error) {
    console.error(error);
  }
}
