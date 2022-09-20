package com.canton.service;

import javax.servlet.http.HttpServletRequest;

/**
 * @Auther ChenX
 * @Date 2020.7.11
 **/
public interface UploadFileService {
    String handleFileUploadTxt(HttpServletRequest request);
    String handleFileUploadWord(HttpServletRequest request);
}
