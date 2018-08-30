<template>
  <div class="hello-wrapper">
    <canvas id="canvas"></canvas>
    <div class="account">
      <img src="./../../assets/avatar.png" alt=""/>
      <h4>Mondo</h4>
      <p>生活已然尽兴，何必畏首畏尾。</p>
      <ul class="tag-li">
        <li class="tag"><router-link to="/index"><i class="el-icon-fa-home"></i></router-link></li>
        <li class="tag"><a href="https://github.com/one-pupil"><i class="el-icon-fa-github"></i></a></li>
      </ul>
    </div>
    <div class="login">
      <router-link to="/login"><i class="el-icon-fa-user-circle"></i></router-link>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
  .hello-wrapper {
    overflow: hidden;
    .account {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      text-align: center;
      color: rgb(51, 51, 51);
      font-size: 16px;
      img {
        width: 80px;
        border-radius: 40px;
        margin-top: 25vh;
      }
      .tag-li {
        width: 150px;
        margin: 0 auto;
      }
      .tag {
        display: inline-block;
        float: left;
        width: 50%;
        font-size: 20px;
        text-align: center;       
      }
    }
    .login {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      a {
        display: none;
      }
      &:hover {
        a {
          display: block;
        }
      }
    }
  }
</style>

<script type='text/ecmascript-6'>
  export default {
    created() {
      document.body.setAttribute('style', 'overflow: hidden');
    },
    mounted() {
      let step = 0;
      // 定义两条不同波浪的颜色
      let lines = [
        'rgba(19, 94, 148, .9)',
        'rgba(19, 94, 148, .9  )'
      ];
      let loop = () => {
        let canvas = document.getElementById('canvas');
        if (canvas) {
          let ctx = canvas.getContext('2d');
          let height = document.body.offsetHeight;
          canvas.width = document.body.offsetWidth;
          canvas.height = height;
          ctx.clearRect(0, 0, canvas.width, height);
          // 波浪大小
          let boHeight = height / 20;
          let posHeight = height / 1.3;
          // 初始角度为0
          step++;
          for (let j = lines.length - 1; j >= 0; j--) {
            ctx.fillStyle = lines[j];
            // 每个矩形的角度都不同，每个之间相差45度
            let angle = (step + j * 50) * Math.PI / 120;
            let deltaHeight = Math.sin(angle) * boHeight;
            let deltaHeightRight = Math.cos(angle) * boHeight;
            ctx.beginPath();
            ctx.moveTo(0, posHeight + deltaHeight);
            ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, posHeight + deltaHeight);
            ctx.closePath();
            ctx.fill();
          }
        }
        this.$requestAnimFrame(loop);
      };
      loop();
    },
    destroyed() {
      document.body.setAttribute('style', 'overflow: auto');
    }
  };
</script>
