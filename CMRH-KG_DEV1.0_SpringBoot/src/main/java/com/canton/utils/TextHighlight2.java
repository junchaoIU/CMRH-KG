package com.canton.utils;

import java.util.*;

/**
 * @Auther ChenX
 * @Date 2020.7.27
 **/
public class TextHighlight2 {
    public static String getHeightlightWord(String textWord, String key){
        StringBuffer sb = new StringBuffer("");
        String tempWord = textWord == null? "" : textWord.trim();
        String tempKey = key == null? "" : key.trim();
        if("".equals(tempWord) || "".equals(tempKey)){
            return tempWord;
        }else {
            sb.append(tempWord);
        }
        String upperWord = tempWord.toUpperCase();
        String upperKey = tempKey.toUpperCase();
        if(!upperWord.contains(upperKey)){
            return tempWord;
        }else {
            int keyLen = upperKey.length();
            int thisMathIndex = 0;
            List<Map<Integer, String>> matchList = new ArrayList<Map<Integer, String>>();
            while((thisMathIndex = upperWord.indexOf(upperKey, thisMathIndex)) != -1){
                Map<Integer, String> map = new HashMap<Integer, String>();
                map.put(thisMathIndex, tempWord.substring(thisMathIndex, thisMathIndex + keyLen));
                matchList.add(map);
                thisMathIndex += keyLen;
            }
            int thisKey = 0;
            int keys = 0;
            for(Map<Integer, String> map : matchList){
                thisKey = getKey(map);
                sb.replace(thisKey+keys, thisKey + +keyLen+keys, "<b><font color=red style=\"background:yellow\">"+map.get(thisKey)+"</font></b>");
               // System.out.println(thisKey+ "/"+keyLen+map.get(thisKey)+"/"+keys);
                keys += "<b><font color=red style=\"background:yellow\"></font></b>".length();
            }
        }
        return sb.toString();
    }
    private static int getKey(Map<Integer, String> obj){
        Set<Integer> keySet = obj.keySet();
        int firstKey = -1;
        for(int key : keySet){
            firstKey = key;
            if(firstKey != -1){
                break;
            }
        }
        return firstKey;


    }

}
