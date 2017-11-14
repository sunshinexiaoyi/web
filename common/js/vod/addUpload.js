$(function() {
	var uploadSuccess = $("#uploadSuccess").val();
	var promptbox = $("#prompt_box").val();
	var resourceTypes = $("#no68").val();
	var Pleaseselect = $("#prompt_pleaseselect").val();
	var surebutton = $("#surebutton").val();
	var canclebutton = $("#canclebutton").val();
	var uploadFalse = $("#uploadFalse").val();
	var repeatUpload = $('#repeatUpload').val();
	var limitTip = $('#movielimitTip').val();
	var fileTotal = 0;
	$(":file").uploadify({
		// 是组件自带的flash，用于打开选取本地文件的按钮
		'swf' : '/ottprj/js/uploadify/uploadify.swf?var=' + (new Date()).getTime(),
		// 服务器端 脚本文件路径，后面加入jsessionid的目的是解决firefox浏览器兼容问题
		'uploader' : '/ottprj/movie/addBroadcastAdd.action',
		// 和input的name属性值保持一致就好，Struts2就能处理了
		'fileObjName' : 'data',
		// 按钮上的文字
		'buttonText' : Pleaseselect,
		// 是否选取文件后自动上传
		'auto' : false,
		// 上传文件大小限制 10g
		'fileSizeLimit' : 0,
		'sizeLimit' : 3000000000000000000000,
		'allBytesTotal' : 999999999999,
		// 允许多文件上传
		'multi' : true,
		onSelect : function() {
			$('#bigFile').hide();
		},
		"preventCaching" : true,
		// 一次最多允许上传多少个文件
		'queueSizeLimit' : '1',
		// 有speed和percentage两种，一个显示速度，一个显示完成百分比
		'progressData' : 'percentage',
		// 如果配置了以下的'fileExt'属性，那么这个属性是必须的
		'fileTypeDesc' : resourceTypes,
		// 允许的格式
		/* 'fileTypeExts': '*.mp4;*.rmvb;*.AVI;*.mp3', */
		'fileTypeExts' : '*.mp4',
		// 显示待上传文件列表的div区域
		'queueID' : 'uploadifyProgress',
		// 是否自动移除进度条
		'removeCompleted' : false,
		// 几秒后移除进度条
		'removeTimeout' : 0.5,
		// 上传按钮的宽度
		'width' : 140,
		'successTimeout' : 12000,
		// 上传按钮的高度
		'height' : 17,
		'method' : "GET",
		'onQueueComplete' : function(queueData) {
			// 0:失败/1:成功
			var state = queueData.uploadsSuccessful;
			alert(queueData.up);
			if (state != 0) {
				if (state == fileTotal) {
					fileTotal = 0;
				} else {
					uploads();
				}
			} else {
				fileTotal = 0;
			}
		},
		'onDialogClose' : function(queueData) {
			fileTotal = fileTotal + queueData.filesQueued;
		},
		'onQueueComplete' : function(queueData) {},
		'onUploadError' : function(event, queueId, fileObj,	errorObj) {
			if (fileObj == "File Cancelled") {
				return;
			}
			top.$.messager.defaults = {
				ok : surebutton
			}; // 修改显示文字
			var img = "/ottserver/images/ico_ts.gif";
			top.$.messager.alert(promptbox, uploadFalse, img);
		},
		'onUploadSuccess' : function(file, data, response) {
			top.$.messager.defaults = {
				ok : surebutton
			}; // 修改显示文字
			var img = "/ottserver/images/ico_ts.gif";
			if (data == "" || data == null) {
				top.$.messager.alert(promptbox, uploadFalse,img);
			} else {
				var data = eval("(" + data + ")");
				if (data.state == 1) {
					top.$.messager.alert(promptbox,uploadSuccess,img,
						function() {
							ownerDialog.close();
							var flag = $("#fl").val();
							if (flag == 1) {
								ownerDialog.openerWindow.location.reload();
							}
						});
				} else {
					top.$.messager.alert(promptbox,uploadFalse, img);
				}
			}
		}
	});
	$("#upload").click(function() {
		var img = "/ottserver/images/ico_ts.gif";
		var limit = $("#limit").val();		
		uploadFile();
	});
	$("#cancel").click(function() {
		$('#fileUploadify').uploadify('cancel');
	});
	function uploads() {
		$('#fileUploadify').uploadify('upload');
	}
});

function uploads() {
	$('#fileUploadify').uploadify('upload');
}
function quit(flag) {
	if (flag == 1) {
		ownerDialog.openerWindow.location.reload();
	}
	ownerDialog.close();
}
function uploadFile() {
	var promptbox = $("#no9").val();
	var metaSubmitTip = $("#no48").val();
	var episodeId = $("#episodeId").val();	
	var plsChoice = $("#plsChoice").val();
	var plsInput = $("#plsInput").val();
	var languages = $("#languages_").val();
	var serverip = $("#serverip_").val();
	var files = $("#files_").val();
	var fileError = $("#fileError").val();
	var fileFormate = $("#fileFormate").val();
	var surebutton = $("#no2").val();
	var uploadSuccess = $("#no61").val();
	// 分辨率
	var defaultStream = $("#codeId").combobox('getText');
	var movieName = $("#movieName").val();
	var codeid = $("#codeId").combobox('getValue');
	// 语言
	var langua = $("#language").val();
	// 服务器IP
	var serverIP = $('#serverId').combobox('getText');	
	// 影片时长
	var mcoms = 0;
	// 开始时间
	var videoHeadTime = 0;
	// 结束时间
	var videoTailTime = 0;
	// var file =$("#fileUploadify").val();
	// 能否播放
	var canPlay = $("input[name='canPlay']:checked").val();
	var serverId = $("#serverId").combobox('getValue');
	var fileId = $("#SWFUpload_0_0").html();
	var img = "/ottserver/images/ico_ts.gif";
	if (defaultStream != "" && langua != "" && serverIP != "") {
		$("#serverId_vili").html("");
		$("#language_vili").html("");
		$("#fileUploadify_vili").html("");		
		if ($('#bigFile').length == 1 && !$('#bigFile').is(':hidden')) {
			var bigFile_ = $("#bigFile_").val();
			if (bigFile_ == '') {
				top.$.messager.alert(promptbox, fileFormate, img);
			} else {
				// 验证输入的文件名类型是否合法
				var ff = fileTypeVili(bigFile_);
				if (ff) {
					$.ajax({
						type : 'post',
						url : '/ottserver/movie/isFileExis.action',
						data : 'serverid=' + serverId + "&bigFile="	+ bigFile_,
						dataType : 'text',
						cache : false,
						success : function(data) {
							if ("yes" == data) {
								var obj = document.forms[0];
								$(obj).append("<input type='hidden' name='defaultStream' value='" + defaultStream	+ "' />");
								$(obj).append("<input type='hidden' name='serverIp' value='"+ serverIP + "' />");
								$(obj).append("<input type='hidden' name='mcoms' value='"	+ mcoms + "' />");
								$(obj).append("<input type='hidden' name='videoHeadTime' value='"	+ videoHeadTime	+ "' />");
								$(obj).append("<input type='hidden' name='videoTailTime' value='"	+ videoTailTime	+ "' />");
								$(obj).ajaxSubmit({
									url : '/ottserver/movie/uploadFilm.action',
									dataType : 'json',
									cache : false,
									success : function(data) {
										top.$.messager.defaults = {
											ok : surebutton
										}; // 修改显示文字
										if (data == "" || data == null) {
											top.$.messager.alert(promptbox,uploadFalse,img);
										} else {															
											if (data.state == 1) {
												top.$.messager.alert(promptbox,uploadSuccess,img,
													function() {
														ownerDialog.close();
														var flag = $("#fl").val();
														if (flag == 1) {
															ownerDialog.openerWindow.location.reload();
														}
													});
											} else {
												top.$.messager.alert(promptbox,uploadFalse,img);
											}
										}
									}
								});
							} else {
								top.$.messager.alert(promptbox,fileError, img);
							}
						}
					});
				} else {
					top.$.messager.alert(promptbox, fileFormate, img);
				}
			}
		} else {
			$('#fileUploadify').uploadify('settings', 'formData', {
				'defaultStream' : defaultStream,
				'language' : langua,
				'serverIp' : serverIP,
				'episodeId' : episodeId,
				'mcoms' : mcoms,
				'videoHeadTime' : videoHeadTime,
				'videoTailTime' : videoTailTime,
				'canPlay' : canPlay,
				'serverid' : serverId,
				'codeid' : codeid,
				'movieName' : movieName
			});
			uploads();
		}
	} else if (serverIP == "") {
		$("#serverId_vili").html(plsChoice + serverip);
	} else if (langua == "") {
		$("#language_vili").html(plsInput + languages);
	} else if (fileId == null) {
		$("#fileUploadify_vili").html(plsInput + files);
	}else {
		// 输入不正确
		top.$.messager.defaults = {
			ok : surebutton
		}; // 修改显示文字
		var img = "/ottserver/images/ico_ts.gif";
		top.$.messager.alert(promptbox, '&nbsp;' + metaSubmitTip, img);
	}
}

function uploadBigFile() {
	$('#bigFile').show();
	$('#fileId').hide();
	$('#fileUploadify').uploadify("cancel");
	$('#uploadifyProgress').html("");
}
/**
 * 文件类型验证
 * 
 * @return
 */
function fileTypeVili(image) {
	var extName = image.substring(image.lastIndexOf(".") + 1, image.length);	
	extName = extName.toLowerCase();
	if (extName != "mp4") {
		return false;
	} else {
		return true;
	}
}