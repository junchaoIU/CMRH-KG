package com.canton.dao.utils;

import com.canton.utils.ClassPathUtil;
import com.canton.utils.InitializedUtil;
import org.apache.jena.ontology.OntDocumentManager;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.query.Dataset;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.tdb.TDBFactory;

/**
 * Jena的工具类。
 *
 * @author Rosahen
 * @version 1.0
 */
public class JenaUtil {
	/**
	 * 添加命名Model的方法。
	 *
	 * @param namedModelURI 模型的URI。
	 * @return URI对应的本体模型对象。
	 */
	public  static OntModel addNamedModel(String namedModelURI) {


		//获取Dataset的路径
		String datasetPath = ClassPathUtil.getClassPath()+"/canton_culture_tdb";

		//在datasetPath创建Dataset
		Dataset dataset = TDBFactory.createDataset(datasetPath);

		//创建本体模型
		OntModel ontModel=ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM);

		OntDocumentManager dm = ontModel.getDocumentManager();

		//批量添加本体文件URI和本地路径之间的映射
		OntDocumentManagerUtil.addAltEntries(dm);

		//获取本体根文件的URI
		String rootURI = InitializedUtil.getMyUri()+InitializedUtil.getMyRoot();



		System.out.println("rootURI:"+rootURI);
		//将本体文件的数据写进本体模型
		ontModel.read(rootURI);

		//如果dataset中已存在namedModelURI对应的模型，则移除旧的
		if(!dataset.getNamedModel(namedModelURI).isEmpty()) {

			dataset.removeNamedModel(namedModelURI);
		}

		//将namedModelURI对应的模型添加到dataset中
		dataset.addNamedModel(namedModelURI, ontModel);

		//关闭数据集合
		dataset.close();

		return ontModel;

	}
}
