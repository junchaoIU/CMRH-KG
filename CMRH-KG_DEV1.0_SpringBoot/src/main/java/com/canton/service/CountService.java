package com.canton.service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface CountService {
    /**
     * 获取本体库中所有三元组 实体 关系 属性 数量。
     * @return
     */
    CompletableFuture<Integer> countBook();

    CompletableFuture<Integer> countIndividual();
    CompletableFuture<Integer> countdataProperty();
    CompletableFuture<Integer> countobjectProperty();
    CompletableFuture<Integer> countStatement();




}
