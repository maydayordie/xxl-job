package com.xxl.job.admin.dao;

import com.xxl.job.admin.core.model.XxlJobAlarm;
import com.xxl.job.admin.core.model.XxlJobLog;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class XxlJobAlarmDaoTest {

    @Resource
    private XxlJobAlarmDao xxlJobAlarmDao;

    @Test
    public void test(){
        // save
        XxlJobAlarm alarm = new XxlJobAlarm();
        alarm.setJobGroup(1);
        alarm.setJobId(1);
        alarm.setJobDesc("市场采购");
        alarm.setTriggerMsg("调度备注");
        alarm.setAlarmMsg("执行器地址为空");
        alarm.setAlarmType("2");
        alarm.setMessageId("101");
        alarm.setAlarmTime(new Date());
        long ret = xxlJobAlarmDao.save(alarm);
        System.out.println(ret);

        // pageList
        List<XxlJobAlarm> list = xxlJobAlarmDao.pageList(0, 10, 1, 1, "0", null, null);
        System.out.println(list);

        // pageListCount
        int list_count = xxlJobAlarmDao.pageListCount(1, 1, "0", null, null);
        System.out.println(list_count);
    }
}
