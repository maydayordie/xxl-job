<!DOCTYPE html>
<html>
<head>
  	<#import "../common/common.macro.ftl" as netCommon>
	<@netCommon.commonStyle />
	<!-- DataTables -->
  	<link rel="stylesheet" href="${request.contextPath}/static/adminlte/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  	<!-- daterangepicker -->
  	<link rel="stylesheet" href="${request.contextPath}/static/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.css">
    <title>${I18n.admin_name}</title>
</head>
<body class="hold-transition skin-blue sidebar-mini <#if cookieMap?exists && cookieMap["xxljob_adminlte_settings"]?exists && "off" == cookieMap["xxljob_adminlte_settings"].value >sidebar-collapse</#if> ">

<#macro jobAlarmContent>
    <div class="wrapper">
        <!-- header -->
        <@netCommon.commonHeader />
        <!-- left -->
        <@netCommon.commonLeft "alarm" />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1>${I18n.alarm_name}</h1>
            </section>

            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <div class="col-xs-2">
                        <div class="input-group">
                            <span class="input-group-addon">${I18n.jobinfo_field_jobgroup}</span>
                            <select class="jobGroup form-control" paramVal="<#if jobInfo?exists>${jobInfo.jobGroup}</#if>" >
                                <#if Request["XXL_JOB_LOGIN_IDENTITY"].role == 1>
                                    <option value="0" >${I18n.system_all}</option>  <#-- 仅管理员支持查询全部；普通用户仅支持查询有权限的 jobGroup -->
                                </#if>
                                <#list JobGroupList as group>
                                    <option value="${group.id}" >${group.title}</option>
                                </#list>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-2">
                        <div class="input-group">
                            <span class="input-group-addon">${I18n.jobinfo_job}</span>
                            <select class="jobId form-control" paramVal="<#if jobInfo?exists>${jobInfo.id}</#if>" >
                                <option value="0" >${I18n.system_all}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xs-2">
                        <div class="input-group">
                            <span class="input-group-addon">${I18n.alarm_type}</span>
                            <select class="alarmType form-control">
                                <option value="0" >${I18n.joblog_status_all}</option>
                                <option value="1" >${I18n.alarm_type1}</option>
                                <option value="2" >${I18n.alarm_type2}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xs-4">
                        <div class="input-group">
                		<span class="input-group-addon">
	                  		${I18n.alarm_time}
	                	</span>
                            <input type="text" class="filterTime form-control" readonly >
                        </div>
                    </div>

                    <div class="col-xs-1">
                        <button class="searchBtn btn btn-block btn-info">${I18n.system_search}</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="box">
                            <div class="box-body">
                                <table class="joblog_list table table-bordered table-striped display" width="100%" >
                                    <thead>
                                    <tr>
                                        <th name="jobId" >${I18n.jobinfo_field_id}</th>
                                        <th name="jobGroup" >jobGroup</th>
                                        <th name="jobDesc" >${I18n.jobinfo_field_jobdesc}</th>
                                        <th name="triggerMsg" >${I18n.joblog_field_triggerMsg}</th>
                                        <th name="alarmMsg" >${I18n.alarm_field_alarmMsg}</th>
                                        <th name="alarmType" >${I18n.alarm_field_alarmType}</th>
                                        <th name="alarmMsgId" >${I18n.alarm_field_alarmMsgId}</th>
                                        <th name="alarmTime" >${I18n.alarm_field_alarmTime}</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- footer -->
        <@netCommon.commonFooter />
    </div>

    <!-- 日志清理.模态框 -->
    <div class="clearLogModal modal fade" tabindex="-1" role="dialog"  aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" >${I18n.joblog_clean_log}</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal form" role="form" >
                        <div class="form-group">
                            <label class="col-sm-3 control-label">${I18n.jobinfo_field_jobgroup}：</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control jobGroupText" readonly >
                                <input type="hidden" name="jobGroup" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">${I18n.jobinfo_job}：</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control jobIdText" readonly >
                                <input type="hidden" name="jobId" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">${I18n.joblog_clean_type}：</label>
                            <div class="col-sm-9">
                                <select class="form-control" name="type" >
                                    <option value="1" >${I18n.joblog_clean_type_1}</option>
                                    <option value="2" >${I18n.joblog_clean_type_2}</option>
                                    <option value="3" >${I18n.joblog_clean_type_3}</option>
                                    <option value="4" >${I18n.joblog_clean_type_4}</option>
                                    <option value="5" >${I18n.joblog_clean_type_5}</option>
                                    <option value="6" >${I18n.joblog_clean_type_6}</option>
                                    <option value="7" >${I18n.joblog_clean_type_7}</option>
                                    <option value="8" >${I18n.joblog_clean_type_8}</option>
                                    <option value="9" >${I18n.joblog_clean_type_9}</option>
                                </select>
                            </div>
                        </div>

                        <hr>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-6">
                                <button type="button" class="btn btn-primary ok" >${I18n.system_ok}</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">${I18n.system_cancel}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</#macro>

<@netCommon.commonScript />
<!-- DataTables -->
<script src="${request.contextPath}/static/adminlte/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="${request.contextPath}/static/adminlte/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<!-- daterangepicker -->
<script src="${request.contextPath}/static/adminlte/bower_components/moment/moment.min.js"></script>
<script src="${request.contextPath}/static/adminlte/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="${request.contextPath}/static/js/alarm.index.1.js"></script>
</body>
</html>