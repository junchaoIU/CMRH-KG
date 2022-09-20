package com.canton.service.impl;

import org.junit.jupiter.api.Test;


class oldLuceneServiceImplTest {

    @Test
    void getKeyword() {

        try {
OldLuceneServiceImpl lucene = new OldLuceneServiceImpl();
           lucene.getKeyword("孙中山");

            //addAttribute("list", list);

        } catch (Exception e) {
            e.printStackTrace();

        }
    }
}
