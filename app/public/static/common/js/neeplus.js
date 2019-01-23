
(function() {

    jp = {

	   /**使用jp.open代替top.layer.open，参数使用完全一致，请参照layer官网, 不在直接暴露layer在，neeplus对layer进行统一封装**/
	   open:top.layer.open,

	   /**通知方法，不阻塞浏览器当前窗口，四个级别 info,warning,error,success，图标不同，其余用法完全相同*/
	   info:function(msg){
			return top.layer.msg(msg);
	   },

	   warning: function(msg){//通知
		   return top.layer.msg(msg, {icon:0});
	   },

	   success:function(msg){
		   return top.layer.msg(msg, {icon:1});
	   },

	   error:function(msg){
		   return top.layer.msg(msg, {icon:2});
	   },

	   nexjump:function(){
	   	 return window.location.reload()
	   },
	   //layer之外的另一个选择toast风格消息提示框,直接使用jp.toastr调用
	   toastr:(function(){
		   top.toastr.options = {
					  "closeButton": true,
					  "debug": false,
					  "progressBar": true,
					  "positionClass": "toast-top-right",
					  "onclick": null,
					  "showDuration": "400",
					  "hideDuration": "5000",
					  "timeOut": "10000",
					  "extendedTimeOut": "1000",
					  "showEasing": "swing",
					  "hideEasing": "linear",
					  "showMethod": "fadeIn",
					  "hideMethod": "fadeOut"
					}
		   return top.toastr;
	   })(),

	   //页面提示声音
	   voice:function() {
		    var audio = document.createElement("audio");
		    audio.src = ctxStatic+"/common/voice/default.wav";
		    audio.play();
	  },

	   /**加载层，一直阻塞浏览器窗口，必须手动调用close方法关闭*/
	   loading:function(msg){
		   if(!msg){
			   msg = '正在提交，请稍等...';
		   }

		  var index = top.layer.msg(msg, {
			  icon: 16
			  ,shade: 0.01,
			  time:999999999//设置超长时间
			});

		  return index;
	   },

	   close:function(index){
		   if(index){
			   top.layer.close(index);
		   }else{
			   top.layer.closeAll();
		   }

	   },


	   /**alert弹出框，阻塞浏览器窗口*/
	   alert:function(msg){
		   top.layer.alert(msg, {
			    skin: 'layui-layer-lan'
			    ,area:['auto', 'auto']
			    ,icon: 0
			    ,closeBtn: 0
			    ,anim: 4 //动画类型
			  });
	   },

	   /**询问框，阻塞浏览器窗口*/
	   confirm:function(msg, succFuc, cancelFuc){//msg:询问信息， succFuc：点‘是’调用的函数， errFuc:点‘否’调用的函数
		   top.layer.confirm(msg,
		     {icon: 3, title:'系统提示', btn: ['是','否'] //按钮
		     }, function(index){
		    	 if (typeof succFuc == 'function') {
		    		 succFuc();
		 		}else{

		 			location = succFuc;
		 			jp.success("操作成功！", {icon:1});
		 		}
			     top.layer.close(index);
			 }, function(index){
				 if(cancelFuc)
					 cancelFuc();
			     top.layer.close(index);
			 });

		   return false;
	   },

        prompt:function (title, href) {
            var index = top.layer.prompt({title: title, formType: 2}, function(text){
                if (typeof href == 'function') {
                    href(text);
                }else{
                    location = href + encodeURIComponent(text);
                }

                top.layer.close(index);
            });

        },
        //打开一个窗体
        windowOpen:function(url, name, width, height){
        var top=parseInt((window.screen.height-height)/2,10),left=parseInt((window.screen.width-width)/2,10),
            options="location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,"+
                "resizable=yes,scrollbars=yes,"+"width="+width+",height="+height+",top="+top+",left="+left;
        window.open(url ,name , options);
   	 },

    //打开对话框(添加修改)
	  openDialog: function(title,url,width,height, $table){
		var auto = true;//是否使用响应式，使用百分比时，应设置为false
		if(width.indexOf("%")>=0 || height.indexOf("%")>=0 ){
			auto =false;
		}
	   	top.layer.open({
	   	    type: 2,
	   	    area: [width, height],
	   	    title: title,
	   	    auto:auto,
	   	    maxmin: true, //开启最大化最小化按钮
	   	    content: url ,
	   	    btn: ['确定', '关闭'],
	   	    yes: function(index, layero){
	   	         var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
	   	         if(!$table){//如果不传递table对象过来，按约定的默认id获取table对象
	   	        	 $table = $('#table')
	   	         }
	   	         iframeWin.contentWindow.doSubmit($table, index);
	   		  },
	   	   cancel: function(index){
	   	      }
	   	});
	   },

	   //打开对话框(查看)
	   openDialogView :function(title,url,width,height){
		   var auto = true;//是否使用响应式，使用百分比时，应设置为false
           if(width.indexOf("%")>=0 || height.indexOf("%")>=0 ){
               auto =false;
           }
			top.layer.open({
				type: 2,
				area: [width, height],
				title: title,
				auto:auto,
				maxmin: true, //开启最大化最小化按钮
				content: url ,
				btn: ['关闭'],
				cancel: function(index){
				   }
			});

	   },

	   /**打开图片预览框**/
	   showPic:function(url){
		   var json = {
				   "data": [   //相册包含的图片，数组格式
				     {
				       "src": url, //原图地址
				     }
				   ]
				 };
		   top.layer.photos({
			    photos: json
			    ,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			  });

	   },

	   /**用户选择框**/
	   openUserSelectDialog:function(isMultiSelect, yesFuc){
		   top.layer.open({
			    type: 2,
			    area: ['900px', '560px'],
			    title:"选择用户",
			    auto:true,
		        maxmin: true, //开启最大化最小化按钮
			    content: ctx+"/sys/user/userSelect?isMultiSelect="+isMultiSelect,
			    btn: ['确定', '关闭'],
			    yes: function(index, layero){
			    	var ids = layero.find("iframe")[0].contentWindow.getIdSelections();
			    	var names = layero.find("iframe")[0].contentWindow.getNameSelections();
					if(ids.length ==0){
						jp.warning("请选择至少一个用户!");
						return;
					}
			    	// 执行保存
			    	yesFuc(ids.join(","), names.join(","));

			    	top.layer.close(index);
				  },
				  cancel: function(index){
					  //取消默认为空，如需要请自行扩展。
					  top.layer.close(index);
	   	         }
			});
	   },
	   dateFormat:function (timestamp, format) {
          var _this =  new Date(timestamp);
           var o = {
               "M+": _this.getMonth() + 1,
               // month
               "d+": _this.getDate(),
               // day
               "h+": _this.getHours(),
               // hour
               "m+": _this.getMinutes(),
               // minute
               "s+": _this.getSeconds(),
               // second
               "q+": Math.floor((_this.getMonth() + 3) / 3),
               // quarter
               "S": _this.getMilliseconds()
               // millisecond
           };
           if (/(y+)/.test(format) || /(Y+)/.test(format)) {
               format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
           }
           for (var k in o) {
               if (new RegExp("(" + k + ")").test(format)) {
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
               }
           }
           return format;
       },
	    escapeHTML: function(a){
	        a = "" + a;
	        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
	    },
	    /**
	     * @function unescapeHTML 还原html脚本 < > & " '
	     * @param a -
	     *            字符串
	     */
	    unescapeHTML: function(a){
	        a = "" + a;
	        return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
	    },
	  //获取字典标签
	    getDictLabel : function(data, value, defaultValue){
	    	for (var i=0; i<data.length; i++){
	    		var row = data[i];
	    		if (row.value == value){
	    			return row.label;
	    		}
	    	}
	    	return defaultValue;
	    },

	    post:function(url,data,callback){
			$.ajax({
	                url:url,
	                method:"post",
	                data:data,
	                error:function(xhr,textStatus){
	                	if(xhr.status == 0){
	                		jp.info("连接失败，请检查网络!")
	                	}else if(xhr.status == 404){
	                		var errDetail ="<font color='red'>404,请求地址不存在！</font>";
		                	top.layer.alert(errDetail , {
		                		  icon: 2,
		                		  area:['auto','auto'],
		                		  title:"请求出错"
		                	})
	                	}else if(xhr.status == 500){
	                		var errDetail ="<font color='red'>"+ xhr.responseText.replace(/[\r\n]/g,"<br>").replace(/[\r]/g,"<br>").replace(/[\n]/g,"<br>")+"</font>";

	                		top.layer.alert(errDetail , {
		                		  icon: 2,
		                		  area:['80%','70%'],
		                		  title:"内部错误"
		                	})
	                	}else{
	                		var errDetail ="<font color='red'>未知错误!</font>";
		                	top.layer.alert(errDetail , {
		                		  icon: 2,
		                		  area:['auto','auto'],
		                		  title:"真悲剧，后台抛出异常了"
		                		})
	                	}
	                },
	                success:function(data,textStatus,jqXHR){
	                	if(data.indexOf == "_login_page_"){//登录超时
	                		location.reload(true);
	                	}else{
	                		callback(data);
	                	}
	                }
           		 });
	    },

	    get:function(url,callback){
			$.ajax({
	                url:url,
	                method:"get",
	                error:function(xhr,textStatus){
	                	if(xhr.status == 0){
	                		jp.info("连接失败，请检查网络!")
	                	}else if(xhr.status == 404){
	                		var errDetail ="<font color='red'>404,请求地址不存在！</font>";
		                	top.layer.alert(errDetail , {
		                		  icon: 2,
		                		  area:['auto','auto'],
		                		  title:"请求出错"
		                	})
	                	}else if(xhr.status == 500){
	                		var errDetail ="<font color='red'>"+ xhr.responseText.replace(/[\r\n]/g,"<br>").replace(/[\r]/g,"<br>").replace(/[\n]/g,"<br>")+"</font>";
		                	top.layer.alert(errDetail , {
		                		  icon: 2,
		                		  area:['80%','70%'],
		                		  title:"内部错误"
		                	})
	                	}else{
	                		var errDetail ="<font color='red'>未知错误!</font>";
		                	top.layer.alert(errDetail , {
		                		  icon: 2,
		                		  area:['auto','auto'],
		                		  title:"真悲剧，后台抛出异常了"
		                		})
	                	}

	                },
	                success:function(data,textStatus,jqXHR){
                        if(data.indexOf == "_login_page_"){//返回首页内容代表登录超时
							top.layer.alert("登录超时！")
	                		location.reload(true);
	                	}else{
	                		callback(data);
	                	}

	                }
           		 });
	    },

	    openTab:function(url,title, isNew){//isNew 为true时，打开一个新的选项卡；为false时，如果选项卡不存在，打开一个新的选项卡，如果已经存在，使已经存在的选项卡变为活跃状态。
	    	top.openTab(url,title,isNew);
	    }
	}



})(jQuery);
