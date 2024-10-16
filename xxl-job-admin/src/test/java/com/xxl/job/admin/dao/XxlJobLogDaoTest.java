package com.xxl.job.admin.dao;

import com.xxl.job.admin.core.model.XxlJobLog;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class XxlJobLogDaoTest {

    @Resource
    private XxlJobLogDao xxlJobLogDao;

    @Test
    public void test(){
        List<XxlJobLog> list = xxlJobLogDao.pageList(0, 10, 1, 1, null, null, 1);
        int list_count = xxlJobLogDao.pageListCount(0, 10, 1, 1, null, null, 1);

        XxlJobLog log = new XxlJobLog();
        log.setJobGroup(1);
        log.setJobId(1);

        long ret1 = xxlJobLogDao.save(log);
        XxlJobLog dto = xxlJobLogDao.load(log.getId());

        log.setTriggerTime(new Date());
        log.setTriggerCode(1);
        log.setTriggerMsg("1");
        log.setExecutorAddress("1");
        log.setExecutorHandler("1");
        log.setExecutorParam("1");
        ret1 = xxlJobLogDao.updateTriggerInfo(log);
        dto = xxlJobLogDao.load(log.getId());


        log.setHandleTime(new Date());
        log.setHandleCode(2);
        log.setHandleMsg("2");
        ret1 = xxlJobLogDao.updateHandleInfo(log);
        dto = xxlJobLogDao.load(log.getId());


        List<Long> ret4 = xxlJobLogDao.findClearLogIds(1, 1, new Date(), 100, 100);

        int ret2 = xxlJobLogDao.delete(log.getJobId());

    }

    @Test
    public void addTest(){
        List<XxlJobLog> list = xxlJobLogDao.pageList(0, 10, 1, 1, null, null, 1);

        // 制造一条可以用来告警的数据
        XxlJobLog log = new XxlJobLog();
        log.setJobGroup(1);
        log.setJobId(1);
        log.setTriggerTime(new Date());
        // 调度码：调度失败
        log.setTriggerCode(500);
        log.setTriggerMsg("111111");
        log.setExecutorAddress("1111");
        log.setExecutorHandler("11111");
        log.setExecutorParam("1111");
        log.setHandleTime(new Date());
        // 执行码：未执行
        log.setHandleCode(0);
        log.setHandleMsg("2");
        // 告警状态：默认
        log.setAlarmStatus(0);

        long ret1 = xxlJobLogDao.save(log);
        XxlJobLog dto = xxlJobLogDao.load(log.getId());

        System.out.println(dto);
    }

    @Test
    public void loadTest(){

        XxlJobLog dto = xxlJobLogDao.load(27);

        System.out.println(dto);
    }

    @Test
    public void addTest2(){

        // 制造一条可以用来告警的数据
        XxlJobLog log = new XxlJobLog();
        log.setJobGroup(1);
        log.setJobId(1);
        log.setTriggerTime(new Date());
        // 调度码：调度失败
        log.setTriggerCode(500);
//        log.setTriggerMsg("调度失败：执行器地址为空");
//        log.setExecutorAddress("");
//        log.setExecutorHandler("demoJobHandler");
//        log.setExecutorParam("");
        log.setHandleTime(new Date());
        // 执行码：未执行
        log.setHandleCode(0);
//        log.setHandleMsg("");
        // 告警状态：默认
        log.setAlarmStatus(0);

        long ret1 = xxlJobLogDao.save(log);
        XxlJobLog dto = xxlJobLogDao.load(log.getId());

        System.out.println(log);
        System.out.println(dto);
    }

}
