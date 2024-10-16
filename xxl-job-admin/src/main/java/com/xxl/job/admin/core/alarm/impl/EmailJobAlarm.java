package com.xxl.job.admin.core.alarm.impl;

import com.xxl.job.admin.core.alarm.JobAlarm;
import com.xxl.job.admin.core.conf.XxlJobAdminConfig;
import com.xxl.job.admin.core.model.XxlJobAlarm;
import com.xxl.job.admin.core.model.XxlJobGroup;
import com.xxl.job.admin.core.model.XxlJobInfo;
import com.xxl.job.admin.core.model.XxlJobLog;
import com.xxl.job.admin.core.util.I18nUtil;
import com.xxl.job.admin.dao.XxlJobAlarmDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;

@Component
public class EmailJobAlarm implements JobAlarm {
    private static Logger logger = LoggerFactory.getLogger(EmailJobAlarm.class);

    @Resource
    public XxlJobAlarmDao xxlJobAlarmDao;

    @Override
    public boolean doAlarm(XxlJobInfo info, XxlJobLog jobLog){
        boolean alarmResult = true;
        // 任务信息 日志信息 执行器信息
        XxlJobGroup group = XxlJobAdminConfig.getAdminConfig().getXxlJobGroupDao().load(jobLog.getJobGroup());
        // 是否告警
        if (info!=null && "1".equals(group.getGroupAlarmFlag()) && "1".equals(info.getAlarmFlag())){
            // 告警内容
            String alarmContent = "";
            if (group.getAppname().length() + group.getTitle().length() <= 150){
                alarmContent = group.getAppname() + " " + group.getTitle() + " " + I18nUtil.getString("job_fail");
            }
            // 消息ID
            String messageId = "";
            if (!info.getMessageId().isEmpty() && info.getMessageId().length() <= 50){
                messageId = info.getMessageId();
            }
            // 添加告警类型1到告警表
            XxlJobAlarm alarm = new XxlJobAlarm();
            alarm.setJobGroup(jobLog.getJobGroup());
            alarm.setJobId(info.getId());
            alarm.setJobDesc(info.getJobDesc());
            alarm.setTriggerMsg(jobLog.getTriggerMsg());
            alarm.setAlarmMsg(I18nUtil.getString("job_fail"));
            alarm.setAlarmType("1");
            alarm.setMessageId(info.getMessageId());
            alarm.setAlarmTime(new Date());
            xxlJobAlarmDao.save(alarm);
            // 打印告警日志
            logger.warn(messageId + "#" + alarmContent);
//            Log.monitorLog.info(messageId, alarmContent);

        }else if (info!=null && "1".equals(group.getGroupAlarmFlag()) && "0".equals(info.getAlarmFlag()) && (group.getRegistryList() == null || group.getRegistryList().isEmpty())){
            // 告警内容
            String alarmContent = "";
            if (group.getAppname().length() + group.getTitle().length() <= 150){
                alarmContent = group.getAppname() + " " + group.getTitle() + " " + I18nUtil.getString("jobconf_trigger_address_empty");
                alarmContent = alarmContent.replaceAll("[<>?]", "");
            }
            // 消息ID
            String messageId = "";
            if (!group.getGroupMessageId().isEmpty() && group.getGroupMessageId().length() <= 50){
                messageId = group.getGroupMessageId();
            }
            // 添加告警类型2到告警表
            XxlJobAlarm alarm = new XxlJobAlarm();
            alarm.setJobGroup(jobLog.getJobGroup());
            alarm.setJobId(info.getId());
            alarm.setJobDesc(info.getJobDesc());
            alarm.setTriggerMsg(jobLog.getTriggerMsg());
            alarm.setAlarmMsg(I18nUtil.getString("jobconf_trigger_address_empty"));
            alarm.setAlarmType("2");
            alarm.setMessageId(group.getGroupMessageId());
            alarm.setAlarmTime(new Date());
            xxlJobAlarmDao.save(alarm);
            // 打印告警日志
            logger.warn(messageId + "#" + alarmContent);
//            Log.monitorLog.info(messageId, alarmContent);
        }
        return alarmResult;
    }
}