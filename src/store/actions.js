import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  postAccessToken,
  postReview,
} from '../services/api';

export function setRegions(regions) {
  return {
    type: 'setRegions',
    payload: { regions },
  };
}

export function setCategories(categories) {
  return {
    type: 'setCategories',
    payload: { categories },
  };
}

export function setRestaurants(restaurants) {
  return {
    type: 'setRestaurants',
    payload: { restaurants },
  };
}

export function setRestaurant(restaurant) {
  return {
    type: 'setRestaurant',
    payload: { restaurant },
  };
}

export function selectRegion(regionId) {
  return {
    type: 'selectRegion',
    payload: { regionId },
  };
}

export function selectCategory(categoryId) {
  return {
    type: 'selectCategory',
    payload: { categoryId },
  };
}

export function loadInitialData() {
  return async (dispatch) => {
    const regions = await fetchRegions();
    dispatch(setRegions(regions));

    const categories = await fetchCategories();
    dispatch(setCategories(categories));
  };
}

export function loadRestaurants() {
  return async (dispatch, getState) => {
    const {
      selectedRegion: region,
      selectedCategory: category,
    } = getState();

    if (!region || !category) {
      return;
    }

    const restaurants = await fetchRestaurants({
      regionName: region.name,
      categoryId: category.id,
    });
    dispatch(setRestaurants(restaurants));
  };
}

export function loadRestaurant({ restaurantId }) {
  return async (dispatch) => {
    dispatch(setRestaurant(null));

    const restaurant = await fetchRestaurant({ restaurantId });

    dispatch(setRestaurant(restaurant));
  };
}

export function login({ accessToken }) {
  return {
    type: 'login',
    payload: { accessToken },
  };
}

export function logout() {
  return {
    type: 'logout',
  };
}

export function postLogin({ email, password }) {
  return async (dispatch) => {
    const { accessToken } = await postAccessToken({ email, password });

    dispatch(login({ accessToken }));
  };
}

export function postNewReview({ restaurantId, review }) {
  return async (dispatch, getState) => {
    const { accessToken } = getState();

    await postReview({ restaurantId, accessToken, review });

    const restaurant = fetchRestaurant({ restaurantId });
    dispatch(setRestaurant(restaurant));
  };
}
