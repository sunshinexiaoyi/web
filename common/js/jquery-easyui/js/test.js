//ajax的处理
function ajax(type,url,data,fn,fn1){
	//alert(type);
	$.ajax({
		type : type,
		url : url,
		cache : false,
		data:data,
		success : function(msg){
		
			fn(msg);
		},
		error : function() {
			fn1();
		}
			
	});
}
function remove() {
	
	var te ="";
	var row = $('#test').datagrid('getChecked');
	//支持多删除
	$.each(row,function(i,n){
		
		te+=n.pk_aid+"_";
		
	});
	
	if (row.length>=1) {
	
		$.messager.confirm('提示框',
				'您确定要删除吗?', function(
						r) {
					if (r) {
						ajax('post','/general/case/delete.action?te='+te,'',fn1,'');
					}
				});
	}else{
		var img ="images/ico_ts.gif";
		$.messager.alert('提示框','请选择一条记录',img);
	}
}
//需要处理的回调函数
function fn1(msg){
//alert(1111);
	$('#test').datagrid('reload'); // reload the user data 
	var p = $('#test').datagrid('getPager');
	//保证在操作之后还在当前页面
	var num=$(p).pagination("options").pageNumber;
	var si = $(p).pagination("options").pageSize;
	fupage(num,si);
}
function failse(){
	$.messager.show({
		title:'错误提示',
		msg:'数据操作失败',
		timeout:5000,
		showType:'slide'
	});
}
