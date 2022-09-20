package com.canton.controller;

import com.canton.dao.entity.Relation;
import com.canton.service.KnowledgeSearchService;
import com.canton.service.RelationSearchService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/relationSearch", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class RelationSearchController {
	@Autowired
	private RelationSearchService relationSearchService;

	/**
	 * 关系分页检索方法。
	 * 
	 * @return 检索结果对应的name值。
	 */

	@GetMapping("/getPeople")
	@ApiOperation(value="关系检索", notes="传入两个人物，predicate是关系")
	@ResponseBody
	public List<Relation> query(@RequestParam("subject") String subject, @RequestParam("object") String object) {
		return relationSearchService.query(subject, object);
	}

}
