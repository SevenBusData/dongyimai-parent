package com.xxx.proj.mapper;

import com.xxx.proj.pojo.TbTypeTemplate;
import com.xxx.proj.pojo.TbTypeTemplateExample;
import java.util.List;
import java.util.Map;


import org.apache.ibatis.annotations.Param;

public interface TbTypeTemplateMapper {

    List<Map> selectList();
    long countByExample(TbTypeTemplateExample example);

    int deleteByExample(TbTypeTemplateExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbTypeTemplate record);

    int insertSelective(TbTypeTemplate record);

    List<TbTypeTemplate> selectByExample(TbTypeTemplateExample example);

    TbTypeTemplate selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbTypeTemplate record, @Param("example") TbTypeTemplateExample example);

    int updateByExample(@Param("record") TbTypeTemplate record, @Param("example") TbTypeTemplateExample example);

    int updateByPrimaryKeySelective(TbTypeTemplate record);

    int updateByPrimaryKey(TbTypeTemplate record);
}