package com.tawanda.dickensdev.model;

import org.springframework.stereotype.Component;


public class ServerInfo {
    private String serverTime;

    public ServerInfo(String serverTime) {
        this.serverTime = serverTime;
    }

    public String getServerTime() {
        return serverTime;
    }

    public void setServerTime(String serverTime) {
        this.serverTime = serverTime;
    }
}
