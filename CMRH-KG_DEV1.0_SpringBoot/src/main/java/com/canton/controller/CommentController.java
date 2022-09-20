package com.canton.controller;

import com.canton.dao.entity.Comment;
import com.canton.dao.mapper.CommentMapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.8.12
 **/
@RestController
@RequestMapping(value = "/comment", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class CommentController {
    @Autowired
    private CommentMapper commentMapper;

    @GetMapping("/getAllComment")
    @ApiOperation(value="获取评论")
    @ResponseBody
    public List<Comment> getAllArticle() {
        return commentMapper.getAllComment();
    }

    @PostMapping("/insertComment")
    @ApiOperation(value="增加评论")
    @ResponseBody
    public String insertComment(@RequestParam("auther") String author,@RequestParam("content") String content)
    {    //时间
        SimpleDateFormat sdf = new SimpleDateFormat();// 格式化时间
        sdf.applyPattern("yyyy-MM-dd HH:mm:ss");//
        Date date = new Date();// 获取当前时间
        String datetime =sdf.format(date);
        String avatar = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1615873983,11197073&fm=26&gp=0.jpg";
        commentMapper.InsertComment(author,avatar,content,datetime);
        return "success";

    }

}
