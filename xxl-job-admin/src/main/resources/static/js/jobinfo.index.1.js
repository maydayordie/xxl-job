$(function() {

	// init date tables
	var jobTable = $(".jobInfoPage .job_list").dataTable({
		"deferRender": true,
		"processing" : true,
	    "serverSide": true,
		"ajax": {
			url: base_url + "/jobinfo/pageList",
			type:"post",
	        data : function ( d ) {
	        	var obj = {};
				obj.jobGroup = 0
				var jobGroupTitle = $('.jobInfoPage .jobGroup').val();
				if (jobGroupTitle){
					var jobGroupId = $('.jobInfoPage .jobGroupList > option[value='+ jobGroupTitle +']').attr('data-id')
					if (jobGroupId){
						obj.jobGroup = jobGroupId
					}
				}
                obj.triggerStatus = $('.jobInfoPage .triggerStatus').val();
                obj.jobDesc = $('.jobInfoPage .jobDesc').val();
	        	obj.executorHandler = $('.jobInfoPage .executorHandler').val();
                obj.author = $('.jobInfoPage .author').val();
	        	obj.start = d.start;
	        	obj.length = d.length;
                return obj;
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": true,	// scroll x，close self-adaption
	    "columns": [
	                {
	                	"data": 'id',
						"bSortable": false,
						"visible" : true,
						"width":'7%'
					},
					{ "data": 'jobGroup', "visible" : false},
	                {
	                	"data": 'jobDesc',
						"visible" : true,
						"width":'15%'
					},
					{
						"data": 'scheduleType',
						"visible" : true,
						"width":'18%',
						"render": function ( data, type, row ) {
							if (row.scheduleConf) {
								return row.scheduleType + '：'+ row.scheduleConf;
							} else {
								return row.scheduleType;
							}
						}
					},
					{
						"data": 'glueType',
						"width":'25%',
						"visible" : true,
						"render": function ( data, type, row ) {
							var glueTypeTitle = findGlueTypeTitle(row.glueType);
                            if (row.executorHandler) {
                                return glueTypeTitle +"：" + row.executorHandler;
                            } else {
                                return glueTypeTitle;
                            }
						}
					},
	                { "data": 'executorParam', "visible" : false},
	                {
	                	"data": 'addTime',
	                	"visible" : false,
	                	"render": function ( data, type, row ) {
	                		return data?moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss"):"";
	                	}
	                },
	                {
	                	"data": 'updateTime',
	                	"visible" : false,
	                	"render": function ( data, type, row ) {
	                		return data?moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss"):"";
	                	}
	                },
	                { "data": 'author', "visible" : true, "width":'10%'},
	                { "data": 'alarmEmail', "visible" : false},
	                {
	                	"data": 'triggerStatus',
						"width":'10%',
	                	"visible" : true,
	                	"render": function ( data, type, row ) {
                            // status
                            if (1 == data) {
                                return '<small class="label label-success" >RUNNING</small>';
                            } else {
                                return '<small class="label label-default" >STOP</small>';
                            }
	                		return data;
	                	}
	                },
	                {
						"data": I18n.system_opt ,
						"width":'15%',
	                	"render": function ( data, type, row ) {
	                		return function(){

                                // status
                                var start_stop_div = "";
                                if (1 == row.triggerStatus ) {
                                    start_stop_div = '<li><a href="javascript:void(0);" class="job_operate" _type="job_pause" >'+ I18n.jobinfo_opt_stop +'</a></li>\n';
                                } else {
                                    start_stop_div = '<li><a href="javascript:void(0);" class="job_operate" _type="job_resume" >'+ I18n.jobinfo_opt_start +'</a></li>\n';
                                }

                                // job_next_time_html
								var job_next_time_html = '';
								if (row.scheduleType == 'CRON' || row.scheduleType == 'FIX_RATE') {
									job_next_time_html = '<li><a href="javascript:void(0);" class="job_next_time" >' + I18n.jobinfo_opt_next_time + '</a></li>\n';
								}

                                // log url
                                var logHref = base_url +'/joblog?jobId='+ row.id;

                                // code url
                                var codeBtn = "";
                                if ('BEAN' != row.glueType) {
                                    var codeUrl = base_url +'/jobcode?jobId='+ row.id;
                                    codeBtn = '<li><a href="'+ codeUrl +'" target="_blank" >GLUE IDE</a></li>\n';
                                    codeBtn += '<li class="divider"></li>\n';
                                }

                                // data
                                tableData['key'+row.id] = row;

                                // opt
                                var html = '<div class="btn-group">\n' +
                                    '     <button type="button" class="btn btn-primary btn-sm">'+ I18n.system_opt +'</button>\n' +
                                    '     <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">\n' +
                                    '       <span class="caret"></span>\n' +
                                    '       <span class="sr-only">Toggle Dropdown</span>\n' +
                                    '     </button>\n' +
                                    '     <ul class="dropdown-menu" role="menu" _id="'+ row.id +'" >\n' +
                                    '       <li><a href="javascript:void(0);" class="job_trigger" >'+ I18n.jobinfo_opt_run +'</a></li>\n' +
                                    '       <li><a href="'+ logHref +'">'+ I18n.jobinfo_opt_log +'</a></li>\n' +
                                    '       <li><a href="javascript:void(0);" class="job_registryinfo" >' + I18n.jobinfo_opt_registryinfo + '</a></li>\n' +
									job_next_time_html +
                                    '       <li class="divider"></li>\n' +
                                    codeBtn +
                                    start_stop_div +
                                    '       <li><a href="javascript:void(0);" class="update" >'+ I18n.system_opt_edit +'</a></li>\n' +
                                    '       <li><a href="javascript:void(0);" class="job_operate" _type="job_del" >'+ I18n.system_opt_del +'</a></li>\n' +
									'       <li><a href="javascript:void(0);" class="job_copy" >'+ I18n.system_opt_copy +'</a></li>\n' +
                                    '     </ul>\n' +
                                    '   </div>';

	                			return html;
							};
	                	}
	                }
	            ],
		"language" : {
			"sProcessing" : I18n.dataTable_sProcessing ,
			"sLengthMenu" : I18n.dataTable_sLengthMenu ,
			"sZeroRecords" : I18n.dataTable_sZeroRecords ,
			"sInfo" : I18n.dataTable_sInfo ,
			"sInfoEmpty" : I18n.dataTable_sInfoEmpty ,
			"sInfoFiltered" : I18n.dataTable_sInfoFiltered ,
			"sInfoPostFix" : "",
			"sSearch" : I18n.dataTable_sSearch ,
			"sUrl" : "",
			"sEmptyTable" : I18n.dataTable_sEmptyTable ,
			"sLoadingRecords" : I18n.dataTable_sLoadingRecords ,
			"sInfoThousands" : ",",
			"oPaginate" : {
				"sFirst" : I18n.dataTable_sFirst ,
				"sPrevious" : I18n.dataTable_sPrevious ,
				"sNext" : I18n.dataTable_sNext ,
				"sLast" : I18n.dataTable_sLast
			},
			"oAria" : {
				"sSortAscending" : I18n.dataTable_sSortAscending ,
				"sSortDescending" : I18n.dataTable_sSortDescending
			}
		}
	});

    // table data
    var tableData = {};

	// search btn
	$('.jobInfoPage .searchBtn').on('click', function(){
		jobTable.fnDraw();
	});

	// jobGroup change
	$('.jobInfoPage .jobGroup').on('change', function(){
        var jobGroupTitle = $('.jobInfoPage .jobGroup').val()
		if (jobGroupTitle){
			var jobGroup = $('.jobInfoPage .jobGroupList > option[value='+ jobGroupTitle +']').attr('data-id');
			if (jobGroup){
				window.location.href = base_url + "/jobinfo?jobGroup=" + jobGroup;
			}
		}
    });

	// job operate
	$(".jobInfoPage .job_list").on('click', '.job_operate',function() {
		var typeName;
		var url;
		var needFresh = false;

		var type = $(this).attr("_type");
		if ("job_pause" == type) {
			typeName = I18n.jobinfo_opt_stop ;
			url = base_url + "/jobinfo/stop";
			needFresh = true;
		} else if ("job_resume" == type) {
			typeName = I18n.jobinfo_opt_start ;
			url = base_url + "/jobinfo/start";
			needFresh = true;
		} else if ("job_del" == type) {
			typeName = I18n.system_opt_del ;
			url = base_url + "/jobinfo/remove";
			needFresh = true;
		} else {
			return;
		}

		var id = $(this).parents('ul').attr("_id");

		layer.confirm( I18n.system_ok + typeName + '?', {
			icon: 3,
			title: I18n.system_tips ,
            btn: [ I18n.system_ok, I18n.system_cancel ]
		}, function(index){
			layer.close(index);

			$.ajax({
				type : 'POST',
				url : url,
				data : {
					"id" : id
				},
				dataType : "json",
				success : function(data){
					if (data.code == 200) {
                        layer.msg( typeName + I18n.system_success );
                        if (needFresh) {
                            //window.location.reload();
                            jobTable.fnDraw(false);
                        }
					} else {
                        layer.msg( data.msg || typeName + I18n.system_fail );
					}
				}
			});
		});
	});

    // job trigger
    $(".jobInfoPage .job_list").on('click', '.job_trigger',function() {
        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

        $(".jobInfoPage .jobTriggerModal .form input[name='id']").val( row.id );
        $(".jobInfoPage .jobTriggerModal .form textarea[name='executorParam']").val( row.executorParam );

        $('.jobInfoPage .jobTriggerModal').modal({backdrop: false, keyboard: false}).modal('show');
    });
    $(".jobInfoPage .jobTriggerModal .ok").on('click',function() {
        $.ajax({
            type : 'POST',
            url : base_url + "/jobinfo/trigger",
            data : {
                "id" : $(".jobInfoPage .jobTriggerModal .form input[name='id']").val(),
                "executorParam" : $(".jobInfoPage .jobTriggerModal .textarea[name='executorParam']").val(),
				"addressList" : $(".jobInfoPage .jobTriggerModal .textarea[name='addressList']").val()
            },
            dataType : "json",
            success : function(data){
                if (data.code == 200) {
                    $('.jobInfoPage .jobTriggerModal').modal('hide');

                    layer.msg( I18n.jobinfo_opt_run + I18n.system_success );
                } else {
                    layer.msg( data.msg || I18n.jobinfo_opt_run + I18n.system_fail );
                }
            }
        });
    });
    $(".jobInfoPage .jobTriggerModal").on('hide.bs.modal', function () {
        $(".jobInfoPage .jobTriggerModal .form")[0].reset();
    });


    // job registryinfo
    $(".jobInfoPage .job_list").on('click', '.job_registryinfo',function() {
        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

        var jobGroup = row.jobGroup;

        $.ajax({
            type : 'POST',
            url : base_url + "/jobgroup/loadById",
            data : {
                "id" : jobGroup
            },
            dataType : "json",
            success : function(data){

                var html = '<div>';
                if (data.code == 200 && data.content.registryList) {
                    for (var index in data.content.registryList) {
                        html += (parseInt(index)+1) + '. <span class="badge bg-green" >' + data.content.registryList[index] + '</span><br>';
                    }
                }
                html += '</div>';

                layer.open({
                    title: I18n.jobinfo_opt_registryinfo ,
                    btn: [ I18n.system_ok ],
                    content: html
                });

            }
        });

    });

    // job_next_time
    $(".jobInfoPage .job_list").on('click', '.job_next_time',function() {
        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

        $.ajax({
            type : 'POST',
            url : base_url + "/jobinfo/nextTriggerTime",
            data : {
                "scheduleType" : row.scheduleType,
				"scheduleConf" : row.scheduleConf
            },
            dataType : "json",
            success : function(data){

            	if (data.code != 200) {
                    layer.open({
                        title: I18n.jobinfo_opt_next_time ,
                        btn: [ I18n.system_ok ],
                        content: data.msg
                    });
				} else {
                    var html = '<center>';
                    if (data.code == 200 && data.content) {
                        for (var index in data.content) {
                            html += '<span>' + data.content[index] + '</span><br>';
                        }
                    }
                    html += '</center>';

                    layer.open({
                        title: I18n.jobinfo_opt_next_time ,
                        btn: [ I18n.system_ok ],
                        content: html
                    });
				}

            }
        });

    });

	// 页面加载时显示模态框
	$(document).ready(function() {
		$('.jobInfoPage .testModal').modal({backdrop: false, keyboard: false}).modal('show');
	});

	// add
	$(".add").click(function(){

		// init-cronGen
        $(".jobInfoPage .addModal .form input[name='schedule_conf_CRON']").show().siblings().remove();
        $(".jobInfoPage .addModal .form input[name='schedule_conf_CRON']").cronGen({});

		// 》init scheduleType
		$(".jobInfoPage .updateModal .form select[name=scheduleType]").change();

		// 》init glueType
		$(".jobInfoPage .updateModal .form select[name=glueType]").change();

		$('.jobInfoPage .addModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var addModalValidate = $(".jobInfoPage .addModal .form").validate({
		errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,
        rules : {
			jobDesc : {
				required : true,
				maxlength: 50
			},
			author : {
				required : true
			}/*,
            executorTimeout : {
                digits:true
            },
            executorFailRetryCount : {
                digits:true
            }*/
        },
        messages : {
            jobDesc : {
            	required : I18n.system_please_input + I18n.jobinfo_field_jobdesc
            },
            author : {
            	required : I18n.system_please_input + I18n.jobinfo_field_author
            }/*,
            executorTimeout : {
                digits: I18n.system_please_input + I18n.system_digits
            },
            executorFailRetryCount : {
                digits: I18n.system_please_input + I18n.system_digits
            }*/
        },
		highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement : function(error, element) {
            element.parent('div').append(error);
        },
        submitHandler : function(form) {

			// process executorTimeout+executorFailRetryCount
            var executorTimeout = $(".jobInfoPage .addModal .form input[name='executorTimeout']").val();
            if(!/^\d+$/.test(executorTimeout)) {
                executorTimeout = 0;
			}
            $(".jobInfoPage .addModal .form input[name='executorTimeout']").val(executorTimeout);
            var executorFailRetryCount = $(".jobInfoPage .addModal .form input[name='executorFailRetryCount']").val();
            if(!/^\d+$/.test(executorFailRetryCount)) {
                executorFailRetryCount = 0;
            }
            $(".jobInfoPage .addModal .form input[name='executorFailRetryCount']").val(executorFailRetryCount);

            // process schedule_conf
			var scheduleType = $(".jobInfoPage .addModal .form select[name='scheduleType']").val();
			var scheduleConf;
			if (scheduleType == 'CRON') {
				scheduleConf = $(".jobInfoPage .addModal .form input[name='cronGen_display']").val();
			} else if (scheduleType == 'FIX_RATE') {
				scheduleConf = $(".jobInfoPage .addModal .form input[name='schedule_conf_FIX_RATE']").val();
			} else if (scheduleType == 'FIX_DELAY') {
				scheduleConf = $(".jobInfoPage .addModal .form input[name='schedule_conf_FIX_DELAY']").val();
			}
			$(".jobInfoPage .addModal .form input[name='scheduleConf']").val( scheduleConf );

        	$.post(base_url + "/jobinfo/add",  $(".jobInfoPage .addModal .form").serialize(), function(data, status) {
				// 任务添加成功
    			if (data.code == "200") {
					$('.jobInfoPage .addModal').modal('hide');
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: I18n.system_add_suc ,
						icon: '1',
						end: function(layero, index){
							jobTable.fnDraw();
							//window.location.reload();
						}
					});
				// 任务添加失败 如：“调度类型非法”
    			} else {
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: (data.msg || I18n.system_add_fail),
						icon: '2'
					});
    			}
    		});
		}
	});
	// 当模态框完全时 重置表单
	$(".jobInfoPage .addModal").on('hide.bs.modal', function () {
        addModalValidate.resetForm();
		$(".jobInfoPage .addModal .form")[0].reset();
		$(".jobInfoPage .addModal .form .form-group").removeClass("has-error");
		$(".remote_panel").show();	// remote

		$(".jobInfoPage .addModal .form input[name='executorHandler']").removeAttr("readonly");
	});

	// scheduleType change
	// 但调度类型改变时 调度配置全部隐藏 该类型的配置显示
	$(".scheduleType").change(function(){
		var scheduleType = $(this).val();
		$(this).parents("form").find(".schedule_conf").hide();
		$(this).parents("form").find(".schedule_conf_" + scheduleType).show();
	});
///////////////////////////
	// 消息id框显示隐藏
	$(".jobInfoPage .updateModal .form input[name='alarmFlag']").change(function(){
		if ($(this).is(':checked')){
			$(this).parents("form").find(".jobInfoPage .messageId").show();
			$(".jobInfoPage .updateModal .form input[name='messageId']").prop("disabled", false);
		}else {
			$(this).parents("form").find(".jobInfoPage .messageId").hide();
			$(".jobInfoPage .updateModal .form input[name='messageId']").prop("disabled", true);
		}
	});
/////////////////////////

	// glueType change
    $(".glueType").change(function(){
		// executorHandler
        var $executorHandler = $(this).parents("form").find("input[name='executorHandler']");
        var glueType = $(this).val();
        if ('BEAN' != glueType) {
            $executorHandler.val("");
            $executorHandler.attr("readonly","readonly");
        } else {
            $executorHandler.removeAttr("readonly");
        }
    });

	$(".jobInfoPage .addModal .glueType").change(function(){
		// glueSource
		var glueType = $(this).val();
		if ('GLUE_GROOVY'==glueType){
			$(".jobInfoPage .addModal .form textarea[name='glueSource']").val( $(".jobInfoPage .addModal .form .glueSource_java").val() );
		} else if ('GLUE_SHELL'==glueType){
			$(".jobInfoPage .addModal .form textarea[name='glueSource']").val( $(".jobInfoPage .addModal .form .glueSource_shell").val() );
		} else if ('GLUE_PYTHON'==glueType){
			$(".jobInfoPage .addModal .form textarea[name='glueSource']").val( $(".jobInfoPage .addModal .form .glueSource_python").val() );
		} else if ('GLUE_PHP'==glueType){
            $(".jobInfoPage .addModal .form textarea[name='glueSource']").val( $(".jobInfoPage .addModal .form .glueSource_php").val() );
        } else if ('GLUE_NODEJS'==glueType){
			$(".jobInfoPage .addModal .form textarea[name='glueSource']").val( $(".jobInfoPage .addModal .form .glueSource_nodejs").val() );
		} else if ('GLUE_POWERSHELL'==glueType){
            $(".jobInfoPage .addModal .form textarea[name='glueSource']").val( $(".jobInfoPage .addModal .form .glueSource_powershell").val() );
        } else {
            $(".jobInfoPage .addModal .form textarea[name='glueSource']").val("");
		}
	});

	// update
	$(".jobInfoPage .job_list").on('click', '.update',function() {

        var id = $(this).parents('ul').attr("_id");
        var row = tableData['key'+id];

		// fill base
		$(".jobInfoPage .updateModal .form input[name='id']").val( row.id );
		$('.jobInfoPage .updateModal .form select[name=jobGroup] option[value='+ row.jobGroup +']').prop('selected', true);
		$(".jobInfoPage .updateModal .form input[name='jobDesc']").val( row.jobDesc );
		$(".jobInfoPage .updateModal .form input[name='author']").val( row.author );
		$(".jobInfoPage .updateModal .form input[name='alarmEmail']").val( row.alarmEmail );
///////////////////////////////
		$(document).ready(function() {
			console.log(row);
		});
		// 初始化滑动开关是否选中
		if (row.alarmFlag == '1'){
			$(".jobInfoPage .updateModal .form input[name='alarmFlag']").prop("checked", true);
		} else{
			$(".jobInfoPage .updateModal .form input[name='alarmFlag']").prop("checked", false);
		}
		// 初始化消息id
		$(".jobInfoPage .updateModal .form input[name='messageId']").val( row.messageId );
		// 初始化消息id框显示隐藏
		$(".jobInfoPage .updateModal .form input[name='alarmFlag']").change();
/////////////////////////////////////
		// fill trigger
		$('.jobInfoPage .updateModal .form select[name=scheduleType] option[value='+ row.scheduleType +']').prop('selected', true);
		$(".jobInfoPage .updateModal .form input[name='scheduleConf']").val( row.scheduleConf );
		if (row.scheduleType == 'CRON') {
			$(".jobInfoPage .updateModal .form input[name='schedule_conf_CRON']").val( row.scheduleConf );
		} else if (row.scheduleType == 'FIX_RATE') {
			$(".jobInfoPage .updateModal .form input[name='schedule_conf_FIX_RATE']").val( row.scheduleConf );
		} else if (row.scheduleType == 'FIX_DELAY') {
			$(".jobInfoPage .updateModal .form input[name='schedule_conf_FIX_DELAY']").val( row.scheduleConf );
		}

		// 》init scheduleType
		// 因为Conf的值只有在change后才有 所以加载页面时需要change获取Conf值
		$(".jobInfoPage .updateModal .form select[name=scheduleType]").change();

		// fill job
		$('.jobInfoPage .updateModal .form select[name=glueType] option[value='+ row.glueType +']').prop('selected', true);
		$(".jobInfoPage .updateModal .form input[name='executorHandler']").val( row.executorHandler );
		$(".jobInfoPage .updateModal .form textarea[name='executorParam']").val( row.executorParam );

		// 》init glueType
		$(".jobInfoPage .updateModal .form select[name=glueType]").change();

		// 》init-cronGen
		$(".jobInfoPage .updateModal .form input[name='schedule_conf_CRON']").show().siblings().remove();
		$(".jobInfoPage .updateModal .form input[name='schedule_conf_CRON']").cronGen({});

		// fill advanced
		$('.jobInfoPage .updateModal .form select[name=executorRouteStrategy] option[value='+ row.executorRouteStrategy +']').prop('selected', true);
		$(".jobInfoPage .updateModal .form input[name='childJobId']").val( row.childJobId );
		$('.jobInfoPage .updateModal .form select[name=misfireStrategy] option[value='+ row.misfireStrategy +']').prop('selected', true);
		$('.jobInfoPage .updateModal .form select[name=executorBlockStrategy] option[value='+ row.executorBlockStrategy +']').prop('selected', true);
		$(".jobInfoPage .updateModal .form input[name='executorTimeout']").val( row.executorTimeout );
        $(".jobInfoPage .updateModal .form input[name='executorFailRetryCount']").val( row.executorFailRetryCount );
        // $(".jobInfoPage .updateModal .form input[name='alarmFlag']").val( 'on' );

		// show
		$('.jobInfoPage .updateModal').modal({backdrop: false, keyboard: false}).modal('show');
	});

	var updateModalValidate = $(".jobInfoPage .updateModal .form").validate({
		errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,

		rules : {
			jobDesc : {
				required : true,
				maxlength: 50
			},
			author : {
				required : true
			}
		},
		messages : {
			jobDesc : {
                required : I18n.system_please_input + I18n.jobinfo_field_jobdesc
			},
			author : {
				required : I18n.system_please_input + I18n.jobinfo_field_author
			}
		},
		highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement : function(error, element) {
            element.parent('div').append(error);
        },
        submitHandler : function(form) {

            // process executorTimeout + executorFailRetryCount
            var executorTimeout = $(".jobInfoPage .updateModal .form input[name='executorTimeout']").val();
            if(!/^\d+$/.test(executorTimeout)) {
                executorTimeout = 0;
            }
            $(".jobInfoPage .updateModal .form input[name='executorTimeout']").val(executorTimeout);
            var executorFailRetryCount = $(".jobInfoPage .updateModal .form input[name='executorFailRetryCount']").val();
            if(!/^\d+$/.test(executorFailRetryCount)) {
                executorFailRetryCount = 0;
            }
            $(".jobInfoPage .updateModal .form input[name='executorFailRetryCount']").val(executorFailRetryCount);

			// process schedule_conf
			var scheduleType = $(".jobInfoPage .updateModal .form select[name='scheduleType']").val();
			var scheduleConf;
			if (scheduleType == 'CRON') {
				scheduleConf = $(".jobInfoPage .updateModal .form input[name='cronGen_display']").val();
			} else if (scheduleType == 'FIX_RATE') {
				scheduleConf = $(".jobInfoPage .updateModal .form input[name='schedule_conf_FIX_RATE']").val();
			} else if (scheduleType == 'FIX_DELAY') {
				scheduleConf = $(".jobInfoPage .updateModal .form input[name='schedule_conf_FIX_DELAY']").val();
			}
			$(".jobInfoPage .updateModal .form input[name='scheduleConf']").val( scheduleConf );

			// post
    		$.post(base_url + "/jobinfo/update", $(".jobInfoPage .updateModal .form").serialize(), function(data, status) {
				// 更新成功弹窗 icon打勾勾
    			if (data.code == "200") {
					$('.jobInfoPage .updateModal').modal('hide');
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: I18n.system_update_suc ,
						icon: '1',
						end: function(layero, index){
							//window.location.reload();
							jobTable.fnDraw();
						}
					});
				// 任务更新失败 如：“调度类型非法” icon打叉叉
    			} else {
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: (data.msg || I18n.system_update_fail ),
						icon: '2'
					});
    			}
    		});
		}
	});
	// 更新框完全隐藏时 重置表单
	$(".jobInfoPage .updateModal").on('hide.bs.modal', function () {
        updateModalValidate.resetForm();
        $(".jobInfoPage .updateModal .form")[0].reset();
        $(".jobInfoPage .updateModal .form .form-group").removeClass("has-error");
	});

    /**
	 * find title by name, GlueType
     */
	function findGlueTypeTitle(glueType) {
		var glueTypeTitle;
        $(".jobInfoPage .addModal .form select[name=glueType] option").each(function () {
            var name = $(this).val();
            var title = $(this).text();
            if (glueType == name) {
                glueTypeTitle = title;
                return false
            }
        });
        return glueTypeTitle;
    }

    // job_copy
	$(".jobInfoPage .job_list").on('click', '.job_copy',function() {

		var id = $(this).parents('ul').attr("_id");
		var row = tableData['key'+id];

		// fill base
		$('.jobInfoPage .addModal .form select[name=jobGroup] option[value='+ row.jobGroup +']').prop('selected', true);
		$(".jobInfoPage .addModal .form input[name='jobDesc']").val( row.jobDesc );
		$(".jobInfoPage .addModal .form input[name='author']").val( row.author );
		$(".jobInfoPage .addModal .form input[name='alarmEmail']").val( row.alarmEmail );

		// fill trigger
		$('.jobInfoPage .addModal .form select[name=scheduleType] option[value='+ row.scheduleType +']').prop('selected', true);
		$(".jobInfoPage .addModal .form input[name='scheduleConf']").val( row.scheduleConf );
		if (row.scheduleType == 'CRON') {
			$(".jobInfoPage .addModal .form input[name='schedule_conf_CRON']").val( row.scheduleConf );
		} else if (row.scheduleType == 'FIX_RATE') {
			$(".jobInfoPage .addModal .form input[name='schedule_conf_FIX_RATE']").val( row.scheduleConf );
		} else if (row.scheduleType == 'FIX_DELAY') {
			$(".jobInfoPage .addModal .form input[name='schedule_conf_FIX_DELAY']").val( row.scheduleConf );
		}

		// 》init scheduleType
		$(".jobInfoPage .addModal .form select[name=scheduleType]").change();

		// fill job
		$('.jobInfoPage .addModal .form select[name=glueType] option[value='+ row.glueType +']').prop('selected', true);
		$(".jobInfoPage .addModal .form input[name='executorHandler']").val( row.executorHandler );
		$(".jobInfoPage .addModal .form textarea[name='executorParam']").val( row.executorParam );

		// 》init glueType
		$(".jobInfoPage .addModal .form select[name=glueType]").change();

		// 》init-cronGen
		$(".jobInfoPage .addModal .form input[name='schedule_conf_CRON']").show().siblings().remove();
		$(".jobInfoPage .addModal .form input[name='schedule_conf_CRON']").cronGen({});

		// fill advanced
		$('.jobInfoPage .addModal .form select[name=executorRouteStrategy] option[value='+ row.executorRouteStrategy +']').prop('selected', true);
		$(".jobInfoPage .addModal .form input[name='childJobId']").val( row.childJobId );
		$('.jobInfoPage .addModal .form select[name=misfireStrategy] option[value='+ row.misfireStrategy +']').prop('selected', true);
		$('.jobInfoPage .addModal .form select[name=executorBlockStrategy] option[value='+ row.executorBlockStrategy +']').prop('selected', true);
		$(".jobInfoPage .addModal .form input[name='executorTimeout']").val( row.executorTimeout );
		$(".jobInfoPage .addModal .form input[name='executorFailRetryCount']").val( row.executorFailRetryCount );

		// show
		$('.jobInfoPage .addModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
});
