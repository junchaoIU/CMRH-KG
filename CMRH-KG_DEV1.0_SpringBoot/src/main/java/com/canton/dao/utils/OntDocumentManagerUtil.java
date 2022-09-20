package com.canton.dao.utils;

import com.canton.CantonApplication;
import com.canton.utils.InitializedUtil;
import org.apache.jena.ontology.OntDocumentManager;

/**
 * 本体文档管理器工具。
 * 
 * @author Rosahen
 * @version 1.0
 */
public class  OntDocumentManagerUtil {


	/**
	 * 批量添加本体文件URI和本地路径之间的映射。
	 *
	 * @param dm 本体文档管理器对象。
	 */

	public static void addAltEntries(OntDocumentManager dm) {
		String myUrl = null;
		System.out.println("配置文件加载中:"+InitializedUtil.getMyUri());
		//获取Ontology_File元素的URI值和File_Path值,并添加映射
		String classPath = CantonApplication.class.getResource("/").getPath();
		//一个部署jar包与调试的无聊判断....
		if (classPath.matches("file.*")==true) {myUrl =  "classpath:"+InitializedUtil.getMyUrl(); }
		else {myUrl = "file://"+classPath+InitializedUtil.getMyUrl();}

		for( int i = 0 ; i < InitializedUtil.getMyontology().size() ; i++) {
			String URL = myUrl+InitializedUtil.getMyontology().get(i);
			dm.addAltEntry(InitializedUtil.getMyUri()+InitializedUtil.getMyontology().get(i),URL);
			System.out.println(InitializedUtil.getMyUri()+InitializedUtil.getMyontology().get(i)+URL);
		}


			}

		}




