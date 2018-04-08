import AV from 'leancloud-storage';

// 上传文章图片
export function uploadArticleImg(img) {
  let file = new AV.File(img.name, img);
  return file.save();
}
