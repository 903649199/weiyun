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

	//根据数据生成树状结构
	//
    function setSelect() {
        // $("#treeElement").innerHTML = '';
        $("#treeElement").empty();
        var treeData = getChildrenAll(0);
        for (var i=0; i<treeData.length; i++) {
            var lis = document.createElement('li');
            var ps=document.createElement("p");
            lis.appendChild(ps);
            // ps.pid= treeData[i].pid;
            ps.id = treeData[i].id;

            var sp = '';
            for (var j=0; j<treeData[i]._level; j++) {
                sp += '&nbsp&nbsp&nbsp';
            }
            if(checkChild(treeData[i].id)){
            	ps.innerHTML = sp +'<i class="sprit1 sprit"></i><i class="sprit2 sprit"></i>'+ treeData[i].name;
            }else{
           		 ps.innerHTML = sp +'</i><i class="sprit2 sprit"></i>'+ treeData[i].name;
            	}
            $("#treeElement").append(lis);
        }
    }
    var folderUl1=document.querySelector('#folder-block');
    var folderUl2=document.querySelector('#folder-list');
    //根据pid生成文件加
    function creatFolder(pid){
    	folderUl1.innerHTML="";
    	folderUl2.innerHTML="";
    	for(var i=0;i<data.length;i++){
    		if(data[i].pid==pid){
    			// console.log(1)
    			var html1=`<li id=`+data[i].id+` pid=`+data[i].pid+`>
					<a style="display:none" href="javascript:;"></a>
					<img src="img/list.png" alt="">
					<p>`+data[i].name+`</p>
					<input style="display:none" type="text">
				</li>`;
				var html2=`<li id=`+data[i].id+` pid=`+data[i].pid+`>
					<a style="display:block" href="javascript:;"></a>
					<img src="img/list.png" alt="">
					<p>`+data[i].name+`</p>
					<input style="display:none" type="text">
				</li>`;

    			folderUl1.innerHTML+=html1;
    			folderUl2.innerHTML+=html2
    		}
    	}

    }

    //删除操作执行后 删除数据中的相关信息
    
    function delatData(id){
        for(var i=0;i<data.length;i++){
            if(data[i].id==id||data[i].pid==id){
                data.splice(i,1)
            }
        }
        return data
    }

    //在添加新的数据时候 判断最大的id 
    //
    function getMaxId(){
        var MaxId=0;
        for(var i=0;i<data.length;i++){
            if(data[i].id>MaxId){
                MaxId=data[i].id
            }
        }
        return MaxId
    }
    
    function addData(pid,val){
        data.push({
            "id":getMaxId()+1,
            "pid":pid,
            "name":val
        })
        return data
    }
    
    //重新命名时候改变data中的name值
    function changeName(id){
    	for(var str in data){
			if(data[str].id==id){
				return data[str]
			}
		}
    }


    //根据arr内的数据使a被选中
    var arr=[];
    function Acheack(ele){
    	if(arr.length==0){
    		for(var i=0;i<ele.length;i++){
    			ele[i].className="";
    			// ele[i].parent.style.background="#f0f3f6";
    		}
    	}else {

    		for(var i=0;i<ele.length;i++){
    			ele[i].className=""
    			for(var j=0;j<arr.length;j++){
					ele[arr[j]].className="click"

    			}
			}
    	}
    }

//在点击被选中的a标签的时候，要确定其index在arr数组的i值
	
	function makeSureI(index){
		for(var i=0;i<arr.length;i++){
          		if(arr[i]==index){
          			return i
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
     var pidArr=[0];
     //点击左侧时候根据id 生成右侧的文件夹
     $("#treeElement ").delegate("li","click",function(){
     	$("#treeElement li").each(function(i,elem){
     		$(elem).css({"background":"#fff"})
     	})
     	$(this).css({'background':"#f0f3f6"})
     	$(".content-left-all").css({"background":"#fff"})
     	creatFolder( $("#treeElement li p").eq($(this).index())[0].id);
     	pidArr=[];
     	pidArr.push($("#treeElement li p").eq($(this).index())[0].id)
    	console.log(pidArr)
     })

    //****设置右边文件夹
   
    var documentW=Number(document.documentElement.clientWidth)
    $('.content-right').width(documentW-$(".content-left").width()-2);


    //初始化 生成默认的文件夹
    creatFolder("0");

    //右侧文件夹移入移出效果
    $("#folder-block").delegate("li","mouseover",function(){
        $(this).css({"backgroundColor":"#fff"});
        $("#folder-block a").eq($(this).index()).show();
    }).delegate("li","mouseout",function(){
    	if($("#folder-block a").eq($(this).index()).hasClass("click")){
    		$(this).css({"backgroundColor":"#fff"});
        	$("#folder-block a").eq($(this).index()).show();
    	}else{
	    	$(this).css({"backgroundColor":"#ebeff0"});	
	    	$("#folder-block a").eq($(this).index()).hide();

    	}
    })
    //双击文件夹进入下一级
    $("#folder-block").add("#folder-list").delegate("li","dblclick",function(e){
     	creatFolder( $(this)[0].id);	
     	pidArr=[];
     	pidArr.push($(this)[0].id);
      e.stopPropagation();
      return false
     	// console.log(pidArr)
    })


    //单击选中标签
    //
    //
    $("#folder-block").add("#folder-list").delegate("a","click",function(){
      // console.log($(this).index())
		console.log(makeSureI($(this).parent().index()),arr,$(this).parent().index())
    	if($(this).hasClass("click")){
          	$(".nav a").removeClass("click");
  			$("#folder-block li").eq($(this).parent().index()).css("background","#ebeff0");
  			$("#folder-block a").eq($(this).parent().index()).hide();
          	$(this).parent().css("background","#ebeff0");
          	arr.splice(makeSureI($(this).parent().index()),1)
    	}else{
			$("#folder ul li").eq($(this).parent().index()).css("background","#fff");
			$("#folder-block a").eq($(this).parent().index()).show();
	        arr.push($(this).parent().index())
	        if(arr.length==$("#folder-block li").length){
		          $(".nav a").addClass("click")
	        }
		}
    		Acheack($("#folder-block  a"))
    		Acheack($("#folder-list  a"))
    		
    	})


    //功能按钮操作
    
    //删除
    $("#delete").click(function(){
        $("#folder-block a").add("#folder-list a").each(function(i,elem){
            if($(elem).hasClass("click")){
                $(elem).parent().remove();
                 data=delatData($(elem).parent().attr("id"));
            }
            creatFolder($(elem).parent().attr("pid"));
        })

        setSelect()
    })
    

    //新建
    var n=''
    $("#newfile").click(function(){
    	// if(!onoff){
    	// 	return
    	// }
    	// onoff=false
    	$("#folder-block").add("#folder-list").append(`<li>
							<a style="display:none" href="javascript:;"></a>
							<img src="img/list.png" alt="">
							<p></p>
							<input style="display:block" type="text" placeholder="新建文件夹">
						</li>`);
    	$("#folder-block input").add("#folder-list input").focus();
    	$("#folder-block input").add("#folder-list input").blur(function(){
    		if($(this).val()){
    			addData(pidArr[0],$(this).val());
    		}else{
    			n++	
    			addData(pidArr[0],"新建文件夹("+n+")");
    		}
    		creatFolder(pidArr[0])
    			setSelect()
    		// onoff=true
    	})
          
           
    })
    
    //重新命名
    //
    $("#rename").click(function(){
        $("#folder-block a").add("#folder-list a").each(function(i,elem){
            if($(elem).hasClass("click")){
                $(elem).parent().find("input").show().val($(elem).parent().find("p").html()).select();
                $(elem).parent().find("input").blur(function(){
	               	if($(this).val()){
      	        			$(elem).parent().find("p").html($(this).val())
      	        			changeName($(elem).parent().attr("id")).name=$(this).val();
      	        			creatFolder($(elem).parent().attr("pid"))
      	        			setSelect()
	        		}else{
	        			$(this).val($(elem).parent().find("p").html())
	        		}
	        		$(elem).removeClass("click").hide().parent().css("background","#ebeff0");
	        		$(this).css("display","none");
                })	
            }
        })
    })
   
	//全选按钮
	//
	$(function(){
		$(".nav a").click(function(){
			if($(this).hasClass("click")){
				arr=[];
				$(this).removeClass("click");
				$("#folder-list a").removeClass("click")
				$("#folder-block a").removeClass("click").hide();
				$("#folder-block li").css("background","#ebeff0");
			}else{
				arr=[];
				for(var i=0;i<$("#folder-list a").length;i++){
					arr.push(i)
				}
				console.log(arr)
				$(this).addClass("click");
				$("#folder-list a").addClass("click")
				$("#folder-block a").addClass("click").show();
				$("#folder-block li").css("background","#fff");
			}
		})
    
	})
  
    
    //下载
   $(function(){
   		$("#downLoad").click(function(){
   			alert("没有下载链接，请连续管理员！！")
   		})
   })



   //搜索
   $(function(){
   		$(".search button").click(function(){
   				
			if($(".search input").val()){
				$(data).each(function(index){
   					if($(".search input").val()==$(this).name){
   						$("#folder ul").empty();
   						$("#folder ul").append()
   					}
   				})
			}
   		})
   })


   //变换视图
   var onoff=false;
   $(function(){
   		$(".conversion ").click(function(){
   			if(onoff){
   				$("#folder-block").css("display","block");
   				$("#folder-list").css("display","none");

   			}else{
   				$("#folder-block").css("display","none");
   				$("#folder-list").css("display","block");
   			}
   			onoff=!onoff
   		})
   })




   //分享
   //
  $(function(){
      $("#share").click(function(){
          $("#wrap").show()
      })
      $("#non").click(function(){
          $("#wrap").hide()
      })
  })

   //拖拽
   var starX=0;
   var moveX=0;
   var endX=0
   var starY=0;
   var moveY=0;
   var endY=0
   $(function(){
        $("#folder").on("mousedown",function(e){
          // var arr=[];
           starX=e.pageX;
           starY=e.pageY;
       		$(this).append("<div id='drag'></div>");
           $(this).on("mousemove",function(e){
               			moveX=e.pageX;
               			moveY=e.pageY;
               			var W=Math.abs(moveX-starX)
               			var H=Math.abs(moveY-starY)   
           				$("#drag").css({
           					'left': Math.min(starX,moveX),
           					"top": Math.min(starY,moveY)	,
           					"width":W,
           					"height":H	
           				});
                  var T1 = $("#drag").offset().top;
                  var L1 = $("#drag").offset().left;
                  var B1 = T1 + $("#drag").height();
                  var R1 = L1 + $("#drag").width();
                  $("#folder-block li").each(function(i,elem){
	                    var T2 = $(elem).offset().top;
	                    var L2 = $(elem).offset().left;
	                    var B2 = T2 + $(elem).height();
	                    var R2 = L2 + $(elem).height();
	                    // console.log(T2,L2,B2,R2)
	                    if(R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
	                          // console.log("没有")
	                        $(elem).css("background","#ebeff0");
	                        $("#folder-block a").eq($(this).index()).hide().removeClass("click");
	                        arr.splice(makeSureI($(this).index()),1);
	                        $(".nav a").removeClass("click")
	                    }else{
	                      	// console.log($(this).index())
	                        $(elem).css("background","#fff");
	                        $("#folder-block a").eq($(this).index()).show().addClass("click");
	                        if(arr.indexOf($(this).index())==-1){
	                            arr.push($(this).index())
	                           if(arr.length==$("#folder-block li").length){
	                                $(".nav a").addClass("click")
	                             }else{
	                                $(".nav a").removeClass("click")
	                             }
	                        } 
	                      }
                        // console.log(arr)
                  		Acheack($("#folder-block  a"))
                  		Acheack($("#folder-list  a"))
           		    })
            e.preventDefault()
                  // return false
                  // e.stopPropagation() 
           })
           $(document).on("mouseup",function(e){
                $("#folder").unbind("mousemove")
                $("#drag").remove()
                e.preventDefault()
              });
            // e.preventDefault()
           // e.stopPropagation()		
           // return false
        })
   })
   
   
   
   
   