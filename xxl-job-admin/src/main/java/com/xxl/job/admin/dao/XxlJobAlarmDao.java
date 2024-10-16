package com.xxl.job.admin.dao;

import com.xxl.job.admin.core.model.XxlJobAlarm;
import com.xxl.job.admin.core.model.XxlJobInfo;
import com.xxl.job.admin.core.model.XxlJobLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
@Mapper
public interface XxlJobAlarmDao {
    public List<XxlJobAlarm> pageList(@Param("offset") int offset,
                                      @Param("pagesize") int pagesize,
                                      @Param("jobGroup") int jobGroup,
                                      @Param("jobId") int jobId,
                                      @Param("alarmType") String alarmType,
                                      @Param("alarmTimeStart") Date alarmTimeStart,
                                      @Param("alarmTimeEnd") Date alarmTimeEnd);

    public int pageListCount(@Param("jobGroup") int jobGroup,
                             @Param("jobId") int jobId,
                             @Param("alarmType") String alarmType,
                             @Param("alarmTimeStart") Date alarmTimeStart,
                             @Param("alarmTimeEnd") Date alarmTimeEnd);

    public long save(XxlJobAlarm xxlJobAlarm);
}