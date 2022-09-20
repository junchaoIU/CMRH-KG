package com.canton.service.impl;

import com.canton.service.UploadFileService;
import com.canton.utils.ClassPathUtil;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Auther ChenX
 * @Date 2020.7.11
 **/
@Service
public class UploadFileServiceImpl implements UploadFileService {


    @Override
    public String handleFileUploadWord(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            //保存文件的路径
            String filePath =  ClassPathUtil.getClassPath()+"/static/";
            //如果文件非空
            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes();
                    stream = new BufferedOutputStream(new FileOutputStream(
                            new File(filePath + file.getOriginalFilename())));//设置文件路径及名字
                    stream.write(bytes);// 写入
                    stream.close();
                    //时间
                    SimpleDateFormat sdf = new SimpleDateFormat();// 格式化时间
                    sdf.applyPattern("yyyy-MM-dd HH:mm:ss a");// a为am/pm的标记
                    Date date = new Date();// 获取当前时间
                    //读取、保存文章内容
                    String content = null;
                    try{
                        System.out.println(filePath + file.getOriginalFilename());
                        if(file.getOriginalFilename().endsWith(".doc"))
                        {
                            InputStream is = new FileInputStream(filePath + file.getOriginalFilename());
                            HWPFDocument doc = new HWPFDocument(is);
                            content = doc.getDocumentText();
                        }
                        else if (file.getOriginalFilename().endsWith(".docx"))
                        {
                            File docFile = new File(filePath + file.getOriginalFilename());

                            FileInputStream fis = new FileInputStream(docFile);

                            XWPFDocument xdoc = new XWPFDocument(fis);

                            XWPFWordExtractor extractor = new XWPFWordExtractor(xdoc);

                            content = extractor.getText();
                        }

                        String fileName=file.getOriginalFilename();
                        String author = "admin";
                        String time = sdf.format(date);

                        try {
                            System.out.println("添加Word文章信息成功！");
                        } catch (Exception e1) {
                            e1.printStackTrace();
                            System.out.println("添加文章信息失败！");
                        } finally {

                        }

                    }catch(Exception e){
                        e.printStackTrace();
                    }

                } catch (Exception e) {
                    stream = null;
                    return "第 " + i + " 个文件上传失败 ==> "
                            + e.getMessage();
                }
            } else {
                return "第 " + i
                        + " 个文件上传失败因为文件为空";
            }
        }
        return "上传成功";
    }

    @Override
    public String handleFileUploadTxt(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            //保存文件的路径
            String filePath =  ClassPathUtil.getClassPath()+"/src/main/resources/book/";
            //如果文件非空
            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes();
                    stream = new BufferedOutputStream(new FileOutputStream(
                            new File(filePath + file.getOriginalFilename())));//设置文件路径及名字
                    stream.write(bytes);// 写入
                    stream.close();
                } catch (Exception e) {
                    return "第 " + i + " 个文件上传失败 ==> "
                            + e.getMessage();
                }
            } else {
                return "第 " + i
                        + " 个文件上传失败因为文件为空";
            }
        }
        return "上传成功";
    }



}
