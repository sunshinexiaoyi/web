var canclebutton = $("#no3").val();
var surebutton = $("#no2").val();
var sureDelete = $("#no16").val();
var promptbox = $("#no9").val();
var imgTip =$("#no66").val();
var formsubmit=$("#no7").val();
var formFalse=$("#no67").val();
var metaSubmitTip=$('#no48').val();
var resourceTypes = $("#no68").val();
var fileTotal = 0;
var urlid;
$(function(){
	
	var uploadSuccess = $("#no61").val();
	var promptbox= $("#no9").val();
	var resourceTypes = $("#no68").val();
	var Pleaseselect=$("#no69").val();
	var surebutton = $("#no2").val();
	var canclebutton = $("#no3").val();
	var uploadFalse=$("#uploadFalse").val();
	var repeatUpload = $('#repeatUpload').val();
	var fileTotal = 0;
	var repeatUpload = $('#repeatUpload').val();
	var formsubmit=$("#no7").val();
	$(":file").each(function(i){
		var fileBar = $(this).attr('lang');
		var bfid = fileBar.substring(fileBar.indexOf('_')+1);
		$(this).uploadify({
		    // 是组件自带的flash，用于打开选取本地文件的按钮 
		    'swf': '/ottserver/admin/am/receive/uploadify/uploadify.swf?var='+(new Date()).getTime(),
		    // 服务器端 脚本文件路径，后面加入jsessionid的目的是解决firefox浏览器兼容问题 
		    'uploader':"/ottserver/movie/movieBroadcastAddEdit.action",
		    // 和input的name属性值保持一致就好，Struts2就能处理了 
		    'fileObjName': 'data',
		    // 按钮上的文字 
		    'buttonText': repeatUpload,
		    // 是否选取文件后自动上传 
		    'auto': false,
		    // 上传文件大小限制 10g
		    'fileSizeLimit':0,
		    'sizeLimit':3000000000000000000000 ,
		    'allBytesTotal':999999999999,
		    // 允许多文件上传 
		    'multi':true,
		    "preventCaching":true, 
		    // 一次最多允许上传多少个文件 
		    'queueSizeLimit': '1',
			 onSelect:function(){
				 $('#'+fileBar).show();
				 $('#bigFile_'+bfid).val("");
				 $('#bigFile_'+bfid).hide();
				 $('#dataFileName_'+bfid).show();
			 },
			 onInit:function(){
				 $('#'+fileBar).append('<div id="uploadifyProgress_'+fileBar+'"></div>');
			 },
		    // 有speed和percentage两种，一个显示速度，一个显示完成百分比 
		    'progressData': 'percentage',
		    // 如果配置了以下的'fileExt'属性，那么这个属性是必须的 
		    'fileTypeDesc': resourceTypes,
		    // 允许的格式 
		    /*'fileTypeExts': '*.mp4;*.rmvb;*.AVI;*.mp3',*/
		    'fileTypeExts': '*.mp4',
		    // 显示待上传文件列表的div区域 
		    'queueID':'uploadifyProgress_'+fileBar,
		    //是否自动移除进度条
		    'removeCompleted': false,
		    //几秒后移除进度条
		    'removeTimeout':0.5,
		    //上传按钮的宽度
		    'width': 140,
		    'successTimeout' :12000,
		    //上传按钮的高度
		    'height': 17,
		    'method':"GET",   
		    'onQueueComplete':function(queueData) {
				// 0:失败/1:成功
				var state = queueData.uploadsSuccessful;
				//alert(queueData.up);
				
				if(state!=0){
					if(state==fileTotal){
						fileTotal = 0;
					}else{
						uploads();
					}
				}else{
					fileTotal = 0;
				}
			},
			'onDialogClose':function(queueData){
				fileTotal = fileTotal + queueData.filesQueued;
			},
			'onQueueComplete':function (queueData){
			},
			'onUploadError': function (event, queueId, fileObj, errorObj) {
				if(fileObj=="File Cancelled"){
					return;
				}
				top.$.messager.defaults = { ok: surebutton};  //修改显示文字
	        	var img ="/ottserver/images/ico_ts.gif";
				top.$.messager.alert(promptbox,uploadFalse,img);
			},
			'onUploadSuccess':function(file, data, response){
				data = eval("("+data+")");
				var urlid = fileBar.substring(fileBar.indexOf('_')+1);
				$('#bigFile_'+urlid).hide();
				$('#dataFileName_'+urlid).val(data.fileName);
				$('#dataFileName_'+urlid).show();
				var img = "/ottserver/images/ico_ts.gif";
				$('#uploadifyProgress_'+fileBar).html("");
				top.$.messager.defaults = { ok: surebutton};  //修改显示文字
				if(data.status =="ok"){
					top.$.messager.alert(promptbox, formsubmit, img);
				}else{
					top.$.messager.alert(promptbox, formFalse, img);
				}
	        }
	    });
	});
});

function editeUpload(obj){
	var urlId= (obj.id).substring((obj.id).indexOf('_')+1);
	var queryString = $('#movieAdd_'+urlId).formSerialize();
	var formsubmit=$("#no7").val();
	var surebutton = $("#no2").val();
	var canclebutton = $("#no3").val();
	var languages_=$("#languages_").val();
	var serverip_=$("#serverip_").val();
	var streams= $("#streams_").val();
	var fileError=$("#fileError").val();
	var fileFormate=$("#fileFormate").val();
	var plsInput=$("#plsInput").val();
	var plsChoice=$("#plsChoice").val();
	var not_null=$('#not_null').val();
	
	var episodeId = $("#episodeId").val();
	var codeId = $('#codeId_'+urlId).combobox("getValue");
	var streaName =$('#codeId_'+urlId).combobox("getText");
	var langu =$("#language"+urlId).val();
	var serverId=$("#serverId_"+urlId).combobox("getValue");
	var serverIp=$("#serverId_"+urlId).combobox("getText");
	var canPlay = $("input[name='canPlay']:checked").val();
	var movieName=$("#movieName").val();
	var img = "/ottserver/images/ico_ts.gif"	
	var format = $('#dataFileName_'+urlId).val();	
	var val = $('#uploadifyProgress_pro_' + urlId).html();		
	if(format!='' && format!=null){
		if(val!='' && val!=null){//重新上传视屏文件
			$('#fileUploadify_'+urlId).uploadify('settings', 'formData', {
				'urlid':urlId,
				'episodeId':episodeId,
				'movieName':movieName,
				'format':format,
				'codeid':codeId,
				'streamName':streaName,
				'serverid':serverId,
				'serverIp':serverIp,
				'language':langu,
				'canPlay':canPlay
			}); 
			$('#fileUploadify_'+urlId).uploadify('upload');
		}else{//视屏文件不变，修改视屏源信息
			if(streaName==""){
				top.$.messager.alert(tip,plsChoice+streams);
				return;
			}
			if(langu==""){
				$("#language_vili"+urlId).html(plsInput+languages);
				return;
			}
			if(serverIp==""){
				top.$.messager.alert(tip,plsChoice+serverip_);
				return;
			}
			$.ajax({
				type:'post',
				url:'/ottserver/movie/updateBroadcastAdd',
				data:{'urlid':urlId,'episodeId':episodeId,'format':format,'codeid':codeId,'streamName':streaName,'serverid':serverId,'language':langu,'canPlay':canPlay},				
				cache:false,
				success:function(data){
					top.$.messager.defaults = { ok: surebutton};  //修改显示文字
					var img = "/ottserver/images/ico_ts.gif";
					if(data=="success"){
						top.$.messager.alert(promptbox,formsubmit,img,function(){
	        				ownerDialog.close();
	        				ownerDialog.openerWindow.location.reload();	                				
	        			});
					}else{
						top.$.messager.alert(promptbox, formFalse, img);
					}
				}
			});
		}		
	}else{
		if(val!=''&&val!=null){//重新上传视屏文件
			$('#fileUploadify_'+urlId).uploadify('settings', 'formData', {
				'urlid':urlId,
				'episodeId':episodeId,
				'movieName':movieName,
				'format':format,
				'codeid':codeId,
				'streamName':streaName,
				'serverid':serverId,
				'serverIp':serverIp,
				'language':langu,
				'canPlay':canPlay
			}); 
			$('#fileUploadify_'+urlId).uploadify('upload');
		}else{
			top.$.messager.alert(promptbox, fileFormate, img);
		}
	}
};
/**
 * 上传大文件 
 */
function uploadBigFile(urlid){
	urlid = urlid;
	$('#bigFile_'+urlid).show();
	$('#dataFileName_'+urlid).hide();
	$('#fileUploadify_'+urlid).uploadify("cancel");
	$('#uploadifyProgress_pro_'+urlid).html("");
}
/**
 * 文件类型验证
 * @return
 */
function fileTypeVili(fileName){	 	
	var extName = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
	extName = extName.toLowerCase();
	if(extName !="mp4"){
		return  false;
	}else{
		return true;
	}
}