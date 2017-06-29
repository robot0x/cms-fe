<template>
   <div class="page-video">
       <p>视频上传 {{token}}</p>
       <div>token：<input id="token"></div>
        <div>出错重试次数：<input id="retry" value="0"></div>
        <div>最大文件限制：<input id="max" value="0"> 0表示没有限制</div>
        <div>文件：<input id="file" type="file" multiple @change="upload"></div>
        <div>反馈信息：
            <div id="console"></div>
        </div>
   </div>
</template>

<script>
import Video from '../service/Video'
import uploader from '../utils/upfile'
export default {
  data () {
    return { 
      token: ''
    }
  },
  created () {
    console.log('created ....')
    // 页面一加载就要请求上传token
    Video.getToken().then(res => {
        this.token = res.token
        console.log('this.token:', this.token)
    }).catch(res => {
        console.log(res)
    })
  },
  methods: {
    upload (e) {
        console.log('upload ....')
        var files = e.target.files
        console.log('files:', files)
        //上传
        for(var i=0;i<files.length;i++){
            uploader({
                file: files[i],   //文件，必填,html5 file类型，不需要读数据流，
                token: this.token,  //token，必填
                retries: 0,  //重试次数，选填，默认0不重试
                maxSize: 0,  //上传大小限制，选填，默认0没有限制
                callback: function (percent, result) {
                    //percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
                    //result(服务端返回的responseText，json格式)
                    result = JSON.stringify(result);
                    console.log(result);
                }
            });
        }
    }
  }
}
</script>
<style scoped>

</style>
