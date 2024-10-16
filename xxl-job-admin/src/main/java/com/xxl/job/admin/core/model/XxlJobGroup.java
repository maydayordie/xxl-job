package com.xxl.job.admin.core.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * Created by xuxueli on 16/9/30.
 */
public class XxlJobGroup {

    private int id;
    private String appname;
    private String title;
    private int addressType;        // 执行器地址类型：0=自动注册、1=手动录入
    private String addressList;     // 执行器地址列表，多地址逗号分隔(手动录入)
    private Date updateTime;

    // alarmFlag and messageId
    private String groupAlarmFlag;
    private String groupMessageId;

    // registry list
    private List<String> registryList;  // 执行器地址列表(系统注册)
    public List<String> getRegistryList() {
        if (addressList!=null && addressList.trim().length()>0) {
            registryList = new ArrayList<String>(Arrays.asList(addressList.split(",")));
        }
        return registryList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAppname() {
        return appname;
    }

    public void setAppname(String appname) {
        this.appname = appname;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getAddressType() {
        return addressType;
    }

    public void setAddressType(int addressType) {
        this.addressType = addressType;
    }

    public String getAddressList() {
        return addressList;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public void setAddressList(String addressList) {
        this.addressList = addressList;
    }

    public void setRegistryList(List<String> registryList) {
        this.registryList = registryList;
    }

    public String getGroupAlarmFlag() {
        return groupAlarmFlag;
    }

    public void setGroupAlarmFlag(String groupAlarmFlag) {
        this.groupAlarmFlag = groupAlarmFlag;
    }

    public String getGroupMessageId() {
        return groupMessageId;
    }

    public void setGroupMessageId(String groupMessageId) {
        this.groupMessageId = groupMessageId;
    }

    @Override
    public String toString() {
        return "XxlJobGroup{" +
                "id=" + id +
                ", appname='" + appname + '\'' +
                ", title='" + title + '\'' +
                ", addressType=" + addressType +
                ", addressList='" + addressList + '\'' +
                ", updateTime=" + updateTime +
                ", groupAlarmFlag='" + groupAlarmFlag + '\'' +
                ", groupMessageId='" + groupMessageId + '\'' +
                ", registryList=" + registryList +
                '}';
    }
}
