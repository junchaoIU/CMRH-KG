package com.canton.dao.mapper;


import com.canton.dao.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommentMapper {
    /*
    获取所有评论
    */
    List<Comment> getAllComment();
    /*
    添加评论
    */
    void InsertComment(String author,String avatar,String content,String datetime);
}
