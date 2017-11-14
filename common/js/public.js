/**********工具*****************/

var http = {
    get:function(url,data,success,fail){
        this.request(url,data,function(data){   //get请求
            http.callback(data,success,fail);
        },fail,"get","json");
    },
    post:function(url,data,success,fail){       //post请求
        this.request(url,data,function(data){
            http.callback(data,success,fail);
        },fail,"post","json");
    },
    callback:function(retData,success,fail){        //回调处理函数
        if("fail" == retData.code){         //返回错误
            var msg =   "请求 "+url+' 失败';
            console.error(msg);
            if(typeof fail == "function"){   //如果是回调函数
                fail(msg);
            }
            return;
        }
        if(typeof success == "function"){   //如果是回调函数
            success(retData);
        }
    },
    request:function(url,data,success,fail,type,dataType){
        $.ajax({
            url:url,
            data:data,
            type:type,
            async:true,
            dataType:dataType,
            cache: false,
            success:function(data){
                success(data);
            },
            error:function(){
                var msg = "请求 "+url+' 错误';
                console.error(msg);
                if(typeof fail == "function"){   //如果是回调函数
                    fail(msg);
                }
            }

        });
    }
};

/*获取url中的参数*/
function getQueryString(name)
{
    return location.href.match(new RegExp('[?&]' + name + '=([^?&]+)', 'i')) ? decodeURIComponent(RegExp.$1) : '';
}

/** 格式化输入字符串**/
//用法: "hello{0}".format('world')；返回'hello world'
String.prototype.format= function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(s,i){
        return args[i];
    });
};

/**********1.1.1.点播节目管理*****************/
var STATE = ["否","是"];




/**********1.1.1.点播节目管理*****************/

/*片源基本信息表*/
var MOVIE_ID = 0;
function MOVIE(movieName,isPay,referencePrice,isReferral,isMultyBitrate,drmState){
    this.movieId = MOVIE_ID++;              //电影ID
    this.movieName = movieName;
    this.director = "导演";
    this.actor = "演员";
    this.releaseDate = "上映日期";
    this.isPay = isPay;                     // 是否付费：0否、1是
    this.referencePrice = referencePrice;   //参考价格
    this.categoryId = "影片分类";
    this.classId = "影片类型";
    this.isReferral = isReferral;           //是否推荐 0否、1是
    this.isMultyBitrate = isMultyBitrate;   // VBR或者“多分辨率” 0否、1是
    this.drmState = drmState;               //DRM状态 0否、1是
}

/*影片分类信息表*/
function MOVIE_CATEGORY(cid,categoryName){
    this.cid = cid;                     // BIGINT(11) UNSIGNED	非空	主键	由系统生成。
    this.categoryname = categoryName;   // VARCHAR(255)	非空		分类名称
    this.type = 1;	                    // int(11)	非空		视屏类型：1:直播 2：点播 3：其他
}

/*影片类型表*/
function MOVIE_CLASS(classId,className,cid){
    this.classid	 = classId ;    // BIGINT(11) UNSIGNED	非空	主键	系统生成
    this.classname = className ;    // VARCHAR(255)	非空		类型名称
    this.cid = cid;                 // bigint(11)	非空	外键ott_ movieCategory的id	分类ID
    this.islock = 0;                // int(11)	非空		（系统级）是否加锁：0表示不加锁、1表示加锁
}