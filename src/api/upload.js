import AV from 'leancloud-storage'

// 上传图片
export function uploadImg(img,id) {
    var file = new AV.File(img.name, img);
    var Article = AV.Object.createWithoutData('Article', id);
    Article.set('picture', file);
    return Article.save();
}
