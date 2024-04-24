package com.xxl.job.admin.core.model;

import java.util.Date;

public class XxlJobAlarm {
    private long id;

    // job info
    private int jobGroup;
    private int jobId;

    // alarm info
    private Date alarmTime;
    private int alarmType;
    private String alarmMsg;

    public XxlJobAlarm(long id, int jobGroup, int jobId, Date alarmTime, int alarmType, String alarmMsg) {
        this.id = id;
        this.jobGroup = jobGroup;
        this.jobId = jobId;
        this.alarmTime = alarmTime;
        this.alarmType = alarmType;
        this.alarmMsg = alarmMsg;
    }
}

