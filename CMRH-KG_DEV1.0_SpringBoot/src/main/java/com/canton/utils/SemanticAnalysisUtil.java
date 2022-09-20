package com.canton.utils;

import com.canton.CantonApplication;
import com.hankcs.hanlp.HanLP;
import com.hankcs.hanlp.seg.common.Term;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.10.09
 **/
public class SemanticAnalysisUtil {
    public static List SemanticAnalysis() throws IOException {
        List list = new ArrayList();
        Resource resource = new ClassPathResource("ext.dic");
        InputStream is = resource.getInputStream();
        InputStreamReader isr = new InputStreamReader(is,"UTF-8");
        BufferedReader bufferedReader = new BufferedReader(isr);

        String str = null;
        while ((str = bufferedReader.readLine()) != null) {
            list.add(str);
        }
        System.out.print(list);
        //close
        bufferedReader.close();
        return list;
    }

//    // 识别中文人名、中文地名、中文机构名
//    public static List<Term> recognizeNER(String text) {
//        List<Term> ner_li = new LinkedList<Term>();
//        List<Term> termList = HanLP.segment(text);
//        for(Term term: termList) {
//            String nature = term.nature != null ? term.nature.toString() : "空";
//            if(nature.equals("nr")) {
//                ner_li.add(term);
//            }
//            else if(nature.equals("ns")) {
//                ner_li.add(term);
//            }
//            else if(nature.equals("nt")) {
//                ner_li.add(term);
//            }
//        }
//        return ner_li;
//    }

}
