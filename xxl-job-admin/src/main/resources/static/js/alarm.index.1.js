$(function() {

	// 监听执行器的change 负责初始化任务列表 和 根据执行器查找任务列表
	$("#jobGroup").on("change", function () {
		// 被选择的option执行器id
		var jobGroup = $(this).children('option:selected').val();
		// 请求：该执行器的任务列表
		$.ajax({
			type : 'POST',
            async: false,   // async, avoid js invoke pagelist before jobId data init
			url : base_url + '/joblog/getJobsByGroup',
			data : {"jobGroup":jobGroup},
			dataType : "json",
			success : function(data){
				// data.code 成功 data.content 根据执行器查找到的任务列表
				if (data.code == 200) {
					$("#jobId").html( '<option value="0" >'+ I18n.system_all +'</option>' );
					// 遍历任务信息列表
					$.each(data.content, function (n, value) {
						// 下拉框添加 值为任务信息id 内容为任务描述
                        $("#jobId").append('<option value="' + value.id + '" >' + value.jobDesc + '</option>');
                    });
					// JobInfo存在时
                    if ($("#jobId").attr("paramVal")){
                        $("#jobId").find("option[value='" + $("#jobId").attr("paramVal") + "']").attr("selected",true);
                    }
				} else {
					layer.open({
						title: I18n.system_tips ,
                        btn: [ I18n.system_ok ],
						content: (data.msg || I18n.system_api_error ),
						icon: '2'
					});
				}
			},
		});
	});
	// JobInfo存在时
	if ($("#jobGroup").attr("paramVal")){
		$("#jobGroup").find("option[value='" + $("#jobGroup").attr("paramVal") + "']").attr("selected",true);
        $("#jobGroup").change();
	}

	// filter Time
    var rangesConf = {};
    rangesConf[I18n.daterangepicker_ranges_recent_hour] = [moment().subtract(1, 'hours'), moment()];
    rangesConf[I18n.daterangepicker_ranges_today] = [moment().startOf('day'), moment().endOf('day')];
    rangesConf[I18n.daterangepicker_ranges_yesterday] = [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
    rangesConf[I18n.daterangepicker_ranges_this_month] = [moment().startOf('month'), moment().endOf('month')];
    rangesConf[I18n.daterangepicker_ranges_last_month] = [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')];
    rangesConf[I18n.daterangepicker_ranges_recent_week] = [moment().subtract(1, 'weeks').startOf('day'), moment().endOf('day')];
    rangesConf[I18n.daterangepicker_ranges_recent_month] = [moment().subtract(1, 'months').startOf('day'), moment().endOf('day')];

	$('#filterTime').daterangepicker({
        autoApply:false,
        singleDatePicker:false,
        showDropdowns:false,        // 是否显示年月选择条件
		timePicker: true, 			// 是否显示小时和分钟选择条件
		timePickerIncrement: 10, 	// 时间的增量，单位为分钟
        timePicker24Hour : true,
        opens : 'left', //日期选择框的弹出位置
		ranges: rangesConf,
        locale : {
            format: 'YYYY-MM-DD HH:mm:ss',
            separator : ' - ',
            customRangeLabel : I18n.daterangepicker_custom_name ,
            applyLabel : I18n.system_ok ,
            cancelLabel : I18n.system_cancel ,
            fromLabel : I18n.daterangepicker_custom_starttime ,
            toLabel : I18n.daterangepicker_custom_endtime ,
            daysOfWeek : I18n.daterangepicker_custom_daysofweek.split(',') ,        // '日', '一', '二', '三', '四', '五', '六'
            monthNames : I18n.daterangepicker_custom_monthnames.split(',') ,        // '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
            firstDay : 1
        },
        startDate: rangesConf[I18n.daterangepicker_ranges_today][0],
        endDate: rangesConf[I18n.daterangepicker_ranges_today][1]
	});

	// init date tables
	var logTable = $("#joblog_list").dataTable({
		"deferRender": true,
		"processing" : true,
	    "serverSide": true,
		"ajax": {
	        url: base_url + "/alarm/pageList" ,
            type:"post",
	        data : function ( d ) {
	        	var obj = {};
	        	obj.jobGroup = $('#jobGroup').val();
	        	obj.jobId = $('#jobId').val();
                obj.alarmType = $('#alarmType').val();
				obj.filterTime = $('#filterTime').val();
	        	obj.start = d.start;
	        	obj.length = d.length;
                return obj;
            }
	    },
	    "searching": false,
	    "ordering": false,
	    //"scrollX": false,
	    "columns": [
					{
						"data": 'jobId',
						"visible" : true,
                        "width":'10%'
					},
					{ "data": 'jobGroup', "visible" : false},
					{
						"data": 'jobDesc',
						"visible" : true,
						"width":'20%'
					},
					{
						"data": 'triggerMsg',
						"width":'10%',
						"render": function ( data, type, row ) {
							// 有信息：查看->调度信息 无信息：无
							return data?'<a class="logTips" href="javascript:;" >'+ I18n.system_show +'<span style="display:none;">'+ data +'</span></a>':I18n.system_empty;
						}
					},
					{
						"data": 'alarmMsg',
						"width":'15%'
					},
					{
						"data": 'alarmType',
						"width":'15%',
						"render": function ( data, type, row ) {
							var html = data;
							if (data == 1) {
								html = '<span style="color: green">'+ I18n.alarm_open +'</span>'+'&nbsp&nbsp&nbsp&nbsp'+'<span style="color: green">'+ I18n.alarm_open +'</span>';
							} else if (data == 2) {
								html = '<span style="color: green">'+ I18n.alarm_open +'</span>'+'&nbsp&nbsp&nbsp&nbsp'+'<span style="color: red">'+ I18n.alarm_colse +'</span>';
							} else if (data == 0) {
								html = '';
							}
							return html;
						}
					},
					{
						"data": 'messageId',
						"visible" : true,
						"width":'10%'
					},
					{
						"data": 'alarmTime',
                        "width":'20%',
						"render": function ( data, type, row ) {
							return data?moment(data).format("YYYY-MM-DD HH:mm:ss"):"";
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

	// xhr:dataTable请求完成时调用 .dt:定义的列表标题
	// TReturn.code:不成功  弹窗层显示：接口异常
    logTable.on('xhr.dt',function(e, settings, json, xhr) {
        if (json.code && json.code != 200) {
            layer.msg( json.msg || I18n.system_api_error );
        }
    });
	
	// logTips alert
	// .logTips:jobId列属性 'click':监听点击事件
	// span:未显示的子标签保存了任务参数 ComAlertTec:自定义的浮窗
	$('#joblog_list').on('click', '.logTips', function(){
		var msg = $(this).find('span').html();
		ComAlertTec.show(msg);
	});
	
	// search Btn
	// 搜索按钮
	$('#searchBtn').on('click', function(){
		logTable.fnDraw();
	});

});


// Com Alert by Tec theme
// 查看后显示的弹窗模板
var ComAlertTec = {
	html:function(){
		var html =
			'<div class="modal fade" id="ComAlertTec" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
			'	<div class="modal-dialog modal-lg-">' +
			'		<div class="modal-content-tec">' +
			'			<div class="modal-body">' +
			'				<div class="alert" style="color:#fff;word-wrap: break-word;">' +
			'				</div>' +
			'			</div>' +
			'				<div class="modal-footer">' +
			'				<div class="text-center" >' +
			'					<button type="button" class="btn btn-info ok" data-dismiss="modal" >'+ I18n.system_ok +'</button>' +
			'				</div>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
		return html;
	},
	show:function(msg, callback){
		// dom init
		if ($('#ComAlertTec').length == 0){
			$('body').append(ComAlertTec.html());
		}

		// init com alert
		// 往弹窗模板中加入信息
		// 如id信息 调度信息 执行信息
		$('#ComAlertTec .alert').html(msg);
		$('#ComAlertTec').modal('show');

		$('#ComAlertTec .ok').click(function(){
			$('#ComAlertTec').modal('hide');
			if(typeof callback == 'function') {
				callback();
			}
		});
	}
};
