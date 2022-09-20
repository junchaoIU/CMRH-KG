package com.canton.dao.mapper;

import com.canton.dao.entity.Book;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BookMapper {
    List<Book> getAllBook();

    Book getBookContentById(int bookId);

    int getCountBook();
}
