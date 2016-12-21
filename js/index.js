//****根据data数据生成左边的列表

//获取各级的父级
function getChildren(pid) {
            var arr = [];
            for (var i=0; i<data.length; i++) {
                if (data[i].pid == pid) {
                    arr.push(data[i]);
                }
            }
            return arr;
        }

        function getChildrenAll(pid,level) {
            var level = level || 0;
            var children = getChildren(pid);//获取pid的集合
            var childrenAll = [];
            for (var i=0; i<children.length; i++) {
                children[i]._level = level;
                // console.log( level)
                childrenAll.push(children[i]);
                childrenAll = childrenAll.concat( getChildrenAll( children[i].id, level + 1 ) );//获取每一级的 低一级level就加1
            }
            return childrenAll;
        }

//在添加新的数据时候 判断最大的id 
function getMaxId(){
	var MaxId=0;
	for(var i=0;i<data.length;i++){
		if(data[i].id>MaxId){
			MaxId=data[i].id
		}
	}
	return MaxId
}

//判断是否有子级目录
//
function checkChild(id){
	for(var i=0;i<data.length;i++){
		// console.log(i)
		if(data[i].pid==id){
			return true
		}
	}
	return false
}


 	 // var treeElement = document.querySelector('#treeElement');

 	 

//根据数据生成树状结构
//
    function setSelect() {
        var treeData = getChildrenAll(0);
        // console.log(getChildAll[0])
        $("#treeElement").innerHTML = '';
        for (var i=0; i<treeData.length; i++) {
            var lis = document.createElement('li');
            var ps=document.createElement("p");
            lis.appendChild(ps);
            ps.id = treeData[i].id;

            var sp = '';
            for (var j=0; j<treeData[i]._level; j++) {
                sp += '&nbsp&nbsp&nbsp';
            }
            if(checkChild(treeData[i].id)){
            	console.log(1)
            	ps.innerHTML = sp +'<i class="sprit1 sprit"></i><i class="sprit2 sprit"></i>'+ treeData[i].name;
            }else{
           		 ps.innerHTML = sp +'</i><i class="sprit2 sprit"></i>'+ treeData[i].name;
            	}
            $("#treeElement").append(lis);
        }
    }
    var folderUl=document.querySelector('#folder ul');

    //根据pid生成文件加
    function creatFolder(pid){
    	folderUl.innerHTML="";
    	for(var i=0;i<data.length;i++){
    		if(data[i].pid==pid){
    			var html=`<li id=`+data[i].id+` pid=`+data[i].pid+`>
					<a style="display:none" href="javascript:;"></a>
					<img src="img/list.png" alt="">
					<p>`+data[i].name+`</p>
					<input style="display:none" type="text">
				</li>`;

    			folderUl.innerHTML+=html
    		}
    	}

    }
 
    //*******生成左侧树结构
     setSelect();
     $(".content-left-all").click(function(){
     	$("#treeElement li").each(function(i,elem){
     		$(elem).css({"background":"#fff"})
     	})
     	$(this).css({'background':"#f0f3f6"});
     	creatFolder("0")
     	
     })
     //点击时候根据id 生成右侧的文件夹
     $("#treeElement ").delegate("li","click",function(){
     	$("#treeElement li").each(function(i,elem){
     		$(elem).css({"background":"#fff"})
     	})
     	$(this).css({'background':"#f0f3f6"})
     	$(".content-left-all").css({"background":"#fff"})
     	creatFolder( $("#treeElement li p").eq($(this).index("#treeElement li"))[0].id)
    	
     })

    //****设置右边文件夹
   
    var documentW=Number(document.documentElement.clientWidth)
    $('.content-right').width(documentW-$(".content-left").width()-2);


    //初始化 生成默认的文件夹
    creatFolder("0");

    //右侧文件夹移入移出效果
    $("#folder ul").delegate("li","mouseover",function(){
        $(this).css({"backgroundColor":"#fff"});
        $("#folder ul a").eq($(this).index()).show();
    }).on("mouseout",function(){
    	if($("#folder ul a").eq($(this).index()).hasClass("click")){
    		console.log($("#folder ul a").eq($(this).index()))
    		$(this).css({"backgroundColor":"#fff"});
        	$("#folder ul a").eq($(this).index()).show();
    	}else{
	    	$("#folder ul li").css({"backgroundColor":"#ebeff0"});	
	    	$("#folder ul a").hide();

    	}
    })

    //双击文件夹进入下一级
    $("#folder ul").delegate("li","dblclick",function(){
     	creatFolder( $(this)[0].id)	
    })
    $("#folder ul a").click(function(){
    // 	$("#folder ul a").removeClass("click");
    // 	$("#folder ul li").css({"background":"#ebeff0"})
    	if($(this).hasClass("click")){
    		$(this).removeClass("click")
    		return
    	}
    		$(this).addClass("click")
    	})
   

    