package com.tawanda.dickensdev.service;


import com.tawanda.dickensdev.controllers.ServerInfoController;
import com.tawanda.dickensdev.model.ServerInfo;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
@Service
public class ServerInfoService {
    public ServerInfoService() {

    }

    public ServerInfo getTime(){
        Date date  = Date.from(Instant.now());
        return new ServerInfo(date.toLocaleString());
    }
}
