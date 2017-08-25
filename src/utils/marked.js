import marked from 'marked';
import highlightjs from 'highlight.js';

// 配置marked
marked.setOptions({
  // 配置高亮
  highlight: function (code, lang, callback) {
    return highlightjs.highlightAuto(code).value;   // 这里highlightjs会自动给代码增加类
  }
});

export default marked;
