package com.xxx.proj.mapper;

import com.xxx.proj.pojo.TbOrdersitem;
import com.xxx.proj.pojo.TbOrdersitemExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TbOrdersitemMapper {
    long countByExample(TbOrdersitemExample example);

    int deleteByExample(TbOrdersitemExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(TbOrdersitem record);

    int insertSelective(TbOrdersitem record);

    List<TbOrdersitem> selectByExample(TbOrdersitemExample example);

    TbOrdersitem selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") TbOrdersitem record, @Param("example") TbOrdersitemExample example);

    int updateByExample(@Param("record") TbOrdersitem record, @Param("example") TbOrdersitemExample example);

    int updateByPrimaryKeySelective(TbOrdersitem record);

    int updateByPrimaryKey(TbOrdersitem record);
}