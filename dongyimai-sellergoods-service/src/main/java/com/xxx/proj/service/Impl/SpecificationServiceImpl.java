package com.xxx.proj.service.Impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.xxx.proj.dto.PageResult;
import com.xxx.proj.mapper.TbSpecificationMapper;
import com.xxx.proj.mapper.TbSpecificationOptionMapper;
import com.xxx.proj.pojo.TbSpecification;
import com.xxx.proj.pojo.TbSpecificationExample;
import com.xxx.proj.pojo.TbSpecificationExample.Criteria;
import com.xxx.proj.pojo.TbSpecificationOption;
import com.xxx.proj.pojo.TbSpecificationOptionExample;
import com.xxx.proj.service.SpecificationService;
import org.apache.zookeeper.Op;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
public class SpecificationServiceImpl implements SpecificationService {

	@Autowired
	private TbSpecificationMapper specificationMapper;
	@Autowired
	private TbSpecificationOptionMapper optionMapper;
	
	/**
	 * 查询全部
	 */
	@Override
	public List<TbSpecification> findAll() {
		return specificationMapper.selectByExample(null);
	}

	@Override
	public List<Map> selectOption() {
		return specificationMapper.selectOption();
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbSpecification> page=   (Page<TbSpecification>) specificationMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(TbSpecification specification) {
		//添加规格
		specificationMapper.insert(specification);
		//添加规格选项
		Long specId = specification.getId();

		for(TbSpecificationOption option: specification.getSpecOptionList()){
                 option.setSpecId(specId);
				 optionMapper.insert(option);
		}

	}

	
	/**
	 * 修改
	 */
	@Override
	public void update(TbSpecification specification){
		//删除所有规格选项.
		TbSpecificationOptionExample optionExample = new TbSpecificationOptionExample();
		TbSpecificationOptionExample.Criteria criteria = optionExample.createCriteria();
		criteria.andSpecIdEqualTo(specification.getId());
		optionMapper.deleteByExample(optionExample);
        //更新规格
		specificationMapper.updateByPrimaryKey(specification);
		//插入所有新的规格选项
		for(TbSpecificationOption option: specification.getSpecOptionList()){
			option.setSpecId(specification.getId());
			optionMapper.insert(option);
		}
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public TbSpecification findOne(Long id){
		//查询规格
		TbSpecification tbSpecification = specificationMapper.selectByPrimaryKey(id);
		//查询规格选项
		TbSpecificationOptionExample example = new TbSpecificationOptionExample();
		TbSpecificationOptionExample.Criteria criteria = example.createCriteria();
		criteria.andSpecIdEqualTo(id);
		List<TbSpecificationOption> optionList = optionMapper.selectByExample(example);
		tbSpecification.setSpecOptionList(optionList);
		return tbSpecification;

	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids){
			//删除规格选项
			TbSpecificationOptionExample optionExample = new TbSpecificationOptionExample();
			TbSpecificationOptionExample.Criteria criteria = optionExample.createCriteria();
			criteria.andSpecIdEqualTo(id);
			optionMapper.deleteByExample(optionExample);
			//删除规格
			specificationMapper.deleteByPrimaryKey(id);
		}		
	}
	
	
		@Override
	public PageResult findPage(TbSpecification specification, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbSpecificationExample example=new TbSpecificationExample();
		Criteria criteria = example.createCriteria();
		
		if(specification!=null){			
						if(specification.getSpecName()!=null && specification.getSpecName().length()>0){
				criteria.andSpecNameLike("%"+specification.getSpecName()+"%");
			}	
		}
		
		Page<TbSpecification> page= (Page<TbSpecification>)specificationMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}
	
}
