---
title: "Meteorological_Tools"
date: 2024-02-20T08:40:45+08:00
lastmod: 2024-02-20T08:40:45+08:00
draft: false
keywords: []
description: ""
tags: ["Algorithm"]
categories: ["Algorithm"]
author: "kaizheng"

# You can also close(false) or open(true) something for this content.
# P.S. comment can only be closed
comment: false
toc: false
autoCollapseToc: false
postMetaInFooter: false
hiddenFromHomePage: false
# You can also define another contentCopyright. e.g. contentCopyright: "This is another copyright."
contentCopyright: false
reward: false
mathjax: false
mathjaxEnableSingleDollar: false
mathjaxEnableAutoNumber: false

# You unlisted posts you might want not want the header or footer to show
hideHeaderAndFooter: false

# You can enable or disable out-of-date content warning for individual posts.
# Comment this out to use the global config.
#enableOutdatedInfoWarning: false

flowchartDiagrams:
  enable: false
  options: ""

sequenceDiagrams: 
  enable: false
  options: ""

---
<!-- -->
## 1 ChatGPT助力科研
<details> <summary> 1.1 绝对湿度相对湿度转换</summary>

### 1.1 绝对湿度相对湿度转换
#### 1.1.1概述
博主近期在运行[[盘古气象大模型](https://arxiv.org/pdf/2211.02556.pdf)]，使用[[ERA5数据](https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels?tab=overview)]作为输入。
但是发现下载错了变量，误将绝对下载成了相对湿度。因此，博主使用ChatGPT获得了转换公式。
#### 1.1.2使用过程
- **Prompt**：
  - 由绝对湿度，气压，温度计算相对湿度的python代码 
- **Reply**：
  - ![img.png](/post/img.png)
- **经过验证后的代码**：
```python
    def calculate_relative_humidity(temperature, specific_humidity, pressure):
      # temperature代表温度（单位：开尔文），specific_humidity代表绝对湿度（单位：千克/千克），pressure代表气压（单位：帕斯卡）。
      # 函数将返回相对湿度（以百分比表示）
      # 首先，将温度转换为摄氏度
      temperature_celsius = temperature - 273.15
    
      # 计算饱和水汽压力（根据温度）
      saturated_vapor_pressure = 6.112 * 10 ** ((17.67 * temperature_celsius) / (temperature_celsius + 243.5))
    
      # 计算实际水汽压力
      actual_vapor_pressure = specific_humidity * pressure / (0.622 + 0.378 * specific_humidity)
    
      # 计算相对湿度（以百分比表示）
      relative_humidity = (actual_vapor_pressure / saturated_vapor_pressure) * 100
      return relative_humidity
   ```
</details>

<details> <summary> 1.2 实现自动化定时运行</summary>

### 1.2 实现自动化定时运行
#### 1.2.1概述
如题
#### 1.2.2使用过程
- **Prompt**：
  - 我现在需要在bash terminal 中执行python代码，当检查到数据存在的时候，并且gpu memery空闲超过2000m时执行，每五分钟检查一次
- **Reply**：
  - ![img_1.png](/post/img_1.png)
- **经过验证后的代码**：
```shell
#!/bin/bash

# 定义数据文件路径
data_file="/path/to/your/data.txt"

# 设置GPU内存阈值
threshold=2000

while true; do
    # 检查数据文件是否存在
    if [ -e "$data_file" ]; then
        # 获取GPU空闲内存（以MB为单位）
        gpu_free_memory=$(nvidia-smi --query-gpu=memory.free --format=csv,noheader,nounits | awk '{print $1}')

        # 检查GPU空闲内存是否超过阈值
        if [ "$gpu_free_memory" -gt "$threshold" ]; then
            echo "Data file found and GPU free memory exceeds $threshold MB. Executing Python script..."
            # 执行Python脚本
            python3 /path/to/your/python/script.py
            break  # 执行后退出循环
        else
            echo "Data file found, but GPU free memory is below $threshold MB. Skipping execution."
        fi
    else
        echo "Data file not found. Skipping execution."
    fi

    # 等待五分钟
    sleep 300
done
```

</details>

## 2 气象相关工具总结
<details> <summary> 2.1 </summary>

</details>

## 3 气象数据网站总结
<details> <summary> 3.1 </summary>

</details>

[//]: # (经验帖 &#40;https://typonotes.com/posts/2022/12/26/hugo-render-markdown-image-url/&#41;)