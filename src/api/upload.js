import AV from 'leancloud-storage';

// 上传文章列表图片
export function uploadImg(img, id) {
    let file = new AV.File(img.name, img);
    let Article = AV.Object.createWithoutData('Article', id);
    Article.set('picture', file);
    return Article.save();
}

// 上传文章图片
export function uploadArticleImg(img) {
  let file = new AV.File(img.name, img);
  return file.save();
}
