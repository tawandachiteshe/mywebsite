package com.tawanda.dickensdev.DataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("postes")
public class DataBaseConnector {
    private final JdbcTemplate jdbcTemplate;


    @Autowired
    public DataBaseConnector(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
