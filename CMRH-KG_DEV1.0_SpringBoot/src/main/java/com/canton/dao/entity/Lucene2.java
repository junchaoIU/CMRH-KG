package com.canton.dao.entity;

import lombok.Data;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.4.7
 **/
@Data
public class Lucene2 {

    private String num;
    private List keywords;
    private String bookId;
    private String bookName ;
    private String bookAuthor;
    private String bookContent ;
    private String bookImage;

    public List getKeywords() {
        return keywords;
    }

    public void setKeywords(List keywords) {
        this.keywords = keywords;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }


    public String getBookContent() {
        return bookContent;
    }

    public void setBookContent(String bookContent) {
        this.bookContent = bookContent;
    }

    public String getBookImage() {
        return bookImage;
    }

    public void setBookImage(String bookImage) {
        this.bookImage = bookImage;
    }
}

