import request from "./request";

export function getCategory() {
  return request.get('/category')
}

export function getSubcategory(maitKey) {
  return request.get('/subcategory', {
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request.get('/subcategory/detail', {
    params: {
      miniWallkey,
      type
    }
  })
}
