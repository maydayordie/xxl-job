package com.xxl.job.admin.core.model;

import java.util.Date;

public class XxlJobAlarm {
    private long id;
    private int jobGroup;
    private int jobId;
    private String jobDesc;
    private String triggerMsg;
    private String alarmMsg;
    private String alarmType;
    private String messageId;
    private Date alarmTime;

    public XxlJobAlarm() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getJobGroup() {
        return jobGroup;
    }

    public void setJobGroup(int jobGroup) {
        this.jobGroup = jobGroup;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getJobDesc() {
        return jobDesc;
    }

    public void setJobDesc(String jobDesc) {
        this.jobDesc = jobDesc;
    }

    public String getTriggerMsg() {
        return triggerMsg;
    }

    public void setTriggerMsg(String triggerMsg) {
        this.triggerMsg = triggerMsg;
    }

    public String getAlarmMsg() {
        return alarmMsg;
    }

    public void setAlarmMsg(String alarmMsg) {
        this.alarmMsg = alarmMsg;
    }

    public String getAlarmType() {
        return alarmType;
    }

    public void setAlarmType(String alarmType) {
        this.alarmType = alarmType;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public Date getAlarmTime() {
        return alarmTime;
    }

    public void setAlarmTime(Date alarmTime) {
        this.alarmTime = alarmTime;
    }

    @Override
    public String toString() {
        return "XxlJobAlarm{" +
                "id=" + id +
                ", jobGroup=" + jobGroup +
                ", jobId=" + jobId +
                ", jobDesc='" + jobDesc + '\'' +
                ", triggerMsg='" + triggerMsg + '\'' +
                ", alarmMsg='" + alarmMsg + '\'' +
                ", alarmType='" + alarmType + '\'' +
                ", messageId='" + messageId + '\'' +
                ", alarmTime=" + alarmTime +
                '}';
    }
}

