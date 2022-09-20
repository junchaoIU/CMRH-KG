package com.canton.controller;

import com.canton.dao.entity.Book;
import com.canton.dao.mapper.BookMapper;
import com.canton.service.BookService;
import com.canton.service.UploadFileService;
import com.canton.utils.TextHighlight2;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.8.9
 **/
@Controller
@CrossOrigin//允许跨域访问
@RequestMapping(value = "/book", produces="application/json;charset=utf-8")
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private UploadFileService uploadFileService;
    @Autowired
    private BookMapper bookMapper;

    @GetMapping("getAllBook")
    @ApiOperation(value="获取书籍", notes="获取书籍")
    @ResponseBody
    public List<Book> getAllBook() {
        return bookMapper.getAllBook();

    }

    @GetMapping("getBookContentByIdPage")
    @ApiOperation(value="通过Id Page获取Content", notes="获取书籍")
    @ResponseBody
    public String getBookContentByIdPage(@RequestParam("keywords") List keywords, @RequestParam("bookId") int bookId, @RequestParam("bookPage") int bookPage) {
        String content = null;
        for(int i = 0;i<keywords.size();i++)
        {
            content = TextHighlight2.getHeightlightWord(bookMapper.getBookContentById(bookId).getBookContent(), (String) keywords.get(i));
        }
        return content;

    }


//    //文件上传
//    @RequestMapping(value = "/uploadMore", method = RequestMethod.POST,produces="application/json;charset=utf-8")
//    @ResponseBody
//    public String handleFileUpload(HttpServletRequest request) {
//        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
//        MultipartFile file = null;
//        BufferedOutputStream stream = null;
//        for (int i = 0; i < files.size(); ++i) {
//            file = files.get(i);
//            //String filePath = ClassPathUtil.getClassPath() + "/src/main/resources/book/";
//            String filePath = "src/main/resources";
//            //如果文件非空
//            if (!file.isEmpty()) {
//                try {
//                    byte[] bytes = file.getBytes();
//                    stream = new BufferedOutputStream(new FileOutputStream(
//                            new File(filePath + file.getOriginalFilename())));//设置文件路径及名字
//                    stream.write(bytes);// 写入
//                    stream.close();
//                } catch (FileNotFoundException e) {
//                    e.printStackTrace();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//                System.out.println(file.getOriginalFilename());
//                if(file.getOriginalFilename().endsWith("txt"))
//                {
//                    return uploadFileService.handleFileUploadTxt(request);
//                }
//               // else if (file.getOriginalFilename().endsWith("doc")||file.getOriginalFilename().endsWith("docx"))
//              //  {
//              //      return uploadFileService.handleFileUploadWord(request);
//               // }
//                else
//                {
//
//                    File file2 = new File(filePath + file.getOriginalFilename());
//                    file2.delete();
//                    return "文件格式错误";
//                }
//            }
//
//        }
//        return null;
//    }
}
