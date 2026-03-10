const base = "https://gen.pollinations.ai";
let currentType = "text";
let apiKeyValid = false;
let currentLang = "zh"; // 默认语言
let chatHistory = []; // 对话历史

// 检测用户浏览器语言
function detectUserLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  const langCode = userLang.split('-')[0]; // 获取语言代码，如 "zh-CN" -> "zh"
  
  // 检查是否支持该语言
  if (translations[langCode]) {
    return langCode;
  }
  
  // 默认返回英文
  return "en";
}

// 语言包定义
const translations = {
  zh: {
    title: "Pollinations AI 全能生成",
    subtitle: "文本｜图片｜视频｜音频｜语音 一站式生成（官方API版）",
    api_key_label: "API Key（从 enter.pollinations.ai 获取）",
    api_key_placeholder: "pk_xxx 或 sk_xxx",
    test_api_btn: "🔍 测试并加载模型列表",
    get_api_key_btn: "🔑 获取API Key",
    tab_text: "💬 文本",
    tab_image: "🖼️ 图片",
    tab_video: "🎬 视频",
    tab_audio: "🔊 音频",
    text_model_label: "文本生成模型",
    image_model_label: "图片生成模型",
    video_model_label: "视频生成模型",
    audio_model_label: "音频生成模型",
    select_model_default: "请先测试API连接",
    model_details: "📋 模型详情",
    select_model_to_view: "请选择模型查看详细信息",
    prompt_placeholder: "输入你的提示词...",
    advanced_settings: "⚙️ 高级设置",
    temperature_label: "温度值 (Temperature)",
    max_tokens_label: "最大长度 (Max Tokens)",
    role_label: "角色",
    role_user: "用户",
    role_system: "系统",
    role_assistant: "助手",
    width_label: "宽度",
    height_label: "高度",
    style_label: "风格",
    style_default: "默认",
    style_photorealistic: "写实",
    style_anime: "动漫",
    style_digital_art: "数字艺术",
    style_3d: "3D",
    style_oil_painting: "油画",
    negative_prompt_label: "负面提示词",
    quality_label: "质量",
    quality_standard: "标准",
    quality_hd: "高清",
    quality_ultra: "超高清",
    seed_label: "种子值",
    enhance_label: "增强",
    transparent_label: "透明背景",
    duration_label: "时长 (秒)",
    resolution_label: "分辨率",
    res_720p: "720p",
    res_1080p: "1080p",
    res_4k: "4K (预览)",
    fps_label: "帧率",
    aspect_ratio_label: "宽高比",
    aspect_16_9: "16:9",
    aspect_9_16: "9:16",
    audio_label: "音频",
    voice_label: "语音",
    voice_nova: "Nova (默认)",
    voice_rachel: "Rachel",
    voice_dave: "Dave",
    voice_samantha: "Samantha",
    voice_chinese_female: "中文女声",
    voice_chinese_male: "中文男声",
    voice_alloy: "Alloy",
    voice_echo: "Echo",
    voice_fable: "Fable",
    voice_onyx: "Onyx",
    voice_shimmer: "Shimmer",
    format_label: "格式",
    format_mp3: "MP3",
    format_wav: "WAV",
    format_ogg: "OGG",
    format_opus: "Opus",
    format_aac: "AAC",
    format_flac: "FLAC",
    format_pcm: "PCM",
    speed_label: "语速",
    instrumental_label: "纯音乐",
    generate_btn: "🚀 立即生成",
    // 动态文本
    test_connecting: "🔄 正在测试API连接并加载模型列表...",
    test_success: "✅ API验证成功，模型列表已加载（含完整元数据）",
    test_error_empty: "❌ 请输入有效的API Key",
    generating_text: "⏳ 正在生成文本，请稍候...",
    generating_image: "⏳ 正在生成图片，请稍候...",
    generating_video: "⏳ 正在生成视频，请稍候...",
    generating_audio: "⏳ 正在生成音频，请稍候...",
    error_api_required: "❌ 请先测试并验证API Key",
    error_api_empty: "❌ 请输入 Pollinations API Key",
    error_prompt_empty: "❌ 请输入提示词",
    error_model_required: "❌ 请选择有效的生成模型",
    download_image: "📥 下载图片",
    download_video: "📥 下载视频",
    download_audio: "📥 下载音频",
    using_model: "使用模型",
    temperature: "温度值",
    max_tokens: "Max Tokens",
    dimensions: "尺寸",
    duration: "时长",
    resolution: "分辨率",
    fps: "帧率",
    voice: "语音",
    format: "格式",
    model_id: "ID",
    pricing: "定价",
    capabilities: "核心能力",
    metadata: "元数据",
    select_model_to_view_details: "请选择模型查看完整的定价、能力和元数据信息",
    browser_not_support_video: "你的浏览器不支持视频播放",
    browser_not_support_audio: "你的浏览器不支持音频播放",
    no_result: "无返回结果",
    generating_failed: "生成失败"
  },
  en: {
    title: "Pollinations AI All-in-One Generation",
    subtitle: "Text | Image | Video | Audio | Voice One-stop Generation (Official API Version)",
    api_key_label: "API Key (Get from enter.pollinations.ai)",
    api_key_placeholder: "pk_xxx or sk_xxx",
    test_api_btn: "🔍 Test and Load Model List",
    get_api_key_btn: "🔑 Get API Key",
    tab_text: "💬 Text",
    tab_image: "🖼️ Image",
    tab_video: "🎬 Video",
    tab_audio: "🔊 Audio",
    text_model_label: "Text Generation Model",
    image_model_label: "Image Generation Model",
    video_model_label: "Video Generation Model",
    audio_model_label: "Audio Generation Model",
    select_model_default: "Please test API connection first",
    model_details: "📋 Model Details",
    select_model_to_view: "Please select a model to view details",
    prompt_placeholder: "Enter your prompt...",
    advanced_settings: "⚙️ Advanced Settings",
    temperature_label: "Temperature",
    max_tokens_label: "Max Tokens",
    role_label: "Role",
    role_user: "User",
    role_system: "System",
    role_assistant: "Assistant",
    width_label: "Width",
    height_label: "Height",
    style_label: "Style",
    style_default: "Default",
    style_photorealistic: "Photorealistic",
    style_anime: "Anime",
    style_digital_art: "Digital Art",
    style_3d: "3D",
    style_oil_painting: "Oil Painting",
    negative_prompt_label: "Negative Prompt",
    quality_label: "Quality",
    quality_standard: "Standard",
    quality_hd: "HD",
    quality_ultra: "Ultra",
    seed_label: "Seed",
    enhance_label: "Enhance",
    transparent_label: "Transparent",
    duration_label: "Duration (seconds)",
    resolution_label: "Resolution",
    res_720p: "720p",
    res_1080p: "1080p",
    res_4k: "4K (Preview)",
    fps_label: "FPS",
    aspect_ratio_label: "Aspect Ratio",
    aspect_16_9: "16:9",
    aspect_9_16: "9:16",
    audio_label: "Audio",
    voice_label: "Voice",
    voice_nova: "Nova (Default)",
    voice_rachel: "Rachel",
    voice_dave: "Dave",
    voice_samantha: "Samantha",
    voice_chinese_female: "Chinese Female",
    voice_chinese_male: "Chinese Male",
    voice_alloy: "Alloy",
    voice_echo: "Echo",
    voice_fable: "Fable",
    voice_onyx: "Onyx",
    voice_shimmer: "Shimmer",
    format_label: "Format",
    format_mp3: "MP3",
    format_wav: "WAV",
    format_ogg: "OGG",
    format_opus: "Opus",
    format_aac: "AAC",
    format_flac: "FLAC",
    format_pcm: "PCM",
    speed_label: "Speed",
    instrumental_label: "Instrumental",
    generate_btn: "🚀 Generate Now",
    // 动态文本
    test_connecting: "🔄 Testing API connection and loading model list...",
    test_success: "✅ API verification successful, model list loaded (with full metadata)",
    test_error_empty: "❌ Please enter a valid API Key",
    generating_text: "⏳ Generating text, please wait...",
    generating_image: "⏳ Generating image, please wait...",
    generating_video: "⏳ Generating video, please wait...",
    generating_audio: "⏳ Generating audio, please wait...",
    error_api_required: "❌ Please test and verify API Key first",
    error_api_empty: "❌ Please enter Pollinations API Key",
    error_prompt_empty: "❌ Please enter a prompt",
    error_model_required: "❌ Please select a valid generation model",
    download_image: "📥 Download Image",
    download_video: "📥 Download Video",
    download_audio: "📥 Download Audio",
    using_model: "Using Model",
    temperature: "Temperature",
    max_tokens: "Max Tokens",
    dimensions: "Dimensions",
    duration: "Duration",
    resolution: "Resolution",
    fps: "FPS",
    voice: "Voice",
    format: "Format",
    model_id: "ID",
    pricing: "Pricing",
    capabilities: "Core Capabilities",
    metadata: "Metadata",
    select_model_to_view_details: "Please select a model to view full pricing, capabilities and metadata",
    browser_not_support_video: "Your browser does not support video playback",
    browser_not_support_audio: "Your browser does not support audio playback",
    no_result: "No results returned",
    generating_failed: "Generation failed"
  }
};

// 语言切换函数
function switchLanguage(lang) {
  currentLang = lang;
  
  // 更新按钮状态
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // 更新静态文本
  document.querySelectorAll('[data-lang-key]').forEach(el => {
    const key = el.dataset.langKey;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  // 更新占位符
  document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
    const key = el.dataset.langPlaceholder;
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  // 更新模型选择器中的默认选项
  document.querySelectorAll('.model-select option[value=""]').forEach(el => {
    el.textContent = translations[lang].select_model_default;
  });
  
  // 更新模型元数据面板默认文本
  document.querySelectorAll('.model-metadata h4').forEach(el => {
    el.textContent = translations[lang].model_details;
  });
  document.querySelectorAll('.model-metadata div[data-lang-key="select_model_to_view"]').forEach(el => {
    el.textContent = translations[lang].select_model_to_view;
  });
  
  // 更新生成按钮文本
  document.getElementById('generate').textContent = translations[lang].generate_btn;
  
  // 更新模型元数据显示（如果已选择模型）
  updateModelMetadata(currentType);
}

// 绑定语言切换事件
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchLanguage(btn.dataset.lang);
  });
});

// 绑定获取API Key按钮事件
document.getElementById('getApiKey').addEventListener('click', () => {
  const redirectUrl = encodeURIComponent(window.location.href);
  window.open(`https://enter.pollinations.ai/authorize?redirect_url=https://mokindred.github.io/`, '_blank');
});

// 存储所有模型的完整元数据
let allModelsMetadata = {
  text: {},
  image: {},
  video: {},
  audio: {}
};

// 模型配置映射（使用正确的官方API端点）
const modelEndpoints = {
  text: "/text/models",          // 官方文档：GET /text/models
  image: "/image/models",        // 官方文档：GET /image/models (包含图片和视频模型)
  video: "/image/models",        // 官方文档：GET /image/models (包含图片和视频模型)
  audio: "/audio/models"         // 官方文档：GET /audio/models
};

const generateEndpoints = {
  text: "/v1/chat/completions",  // 官方OpenAI兼容接口
  image: "/image",
  video: "/video",
  audio: "/audio"
};

// 标签切换
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    // 切换标签激活状态
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentType = tab.dataset.type;
    
    // 切换模型选择器
    document.querySelectorAll(".model-selector").forEach(ms => ms.classList.remove("active"));
    document.getElementById(`${currentType}-models`).classList.add("active");
    
    // 切换高级参数
    document.querySelectorAll(".param-row").forEach(pr => pr.style.display = "none");
    if (currentType !== "text") {
      document.getElementById(`${currentType}-params`).style.display = "flex";
    } else {
      document.getElementById("text-params").style.display = "flex";
    }
    
    // 更新模型元数据显示
    updateModelMetadata(currentType);
  });
});

// 高级设置切换
document.getElementById("advanced-toggle").addEventListener("click", () => {
  document.getElementById("advanced-params").classList.toggle("active");
});

// 测试API并加载模型列表
document.getElementById("testApi").addEventListener("click", async () => {
  const key = document.getElementById("apiKey").value.trim();
  const testStatus = document.getElementById("testStatus");
  const generateBtn = document.getElementById("generate");
  
  // 验证API Key
  if (!key) {
    testStatus.className = "test-status test-error";
    testStatus.textContent = translations[currentLang].test_error_empty;
    return;
  }
  
  // 显示加载状态
  testStatus.className = "test-status test-success";
  testStatus.textContent = translations[currentLang].test_connecting;
  document.getElementById("testApi").disabled = true;
  generateBtn.disabled = true;
  
  try {
    // 1. 先测试API连通性（使用正确的通用模型列表接口）
    const testResponse = await fetch(`${base}/v1/models`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      timeout: 10000
    });
    
    if (!testResponse.ok) {
      throw new Error(`API verification failed: ${testResponse.status} ${testResponse.statusText}`);
    }
    
    // 2. 按类型加载各模块的模型列表（使用最新的官方API端点）
    const modelTypes = ["text", "image", "video", "audio"];
    let allTypesLoaded = true;
    
    for (const type of modelTypes) {
      try {
        const modelResponse = await fetch(`${base}${modelEndpoints[type]}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json"
          },
          timeout: 10000
        });
        
        if (modelResponse.ok) {
          const models = await modelResponse.json();
          // 处理并存储完整元数据
          allModelsMetadata[type] = processModelMetadata(models, type);
          // 填充模型列表
          populateModelList(`${type}-model`, allModelsMetadata[type], type);
        } else {
          // 如果特定类型模型接口失败，使用备用默认列表
          console.warn(`Failed to load ${type} model list, using default list`);
          const defaultModels = getDefaultModelsWithMetadata(type);
          allModelsMetadata[type] = defaultModels;
          populateModelList(`${type}-model`, defaultModels, type);
          allTypesLoaded = false;
        }
      } catch (e) {
        // 容错处理：单个类型加载失败不影响整体
        console.warn(`Error loading ${type} model list:`, e);
        const defaultModels = getDefaultModelsWithMetadata(type);
        allModelsMetadata[type] = defaultModels;
        populateModelList(`${type}-model`, defaultModels, type);
        allTypesLoaded = false;
      }
    }
    
    // 标记API有效
    apiKeyValid = true;
    testStatus.className = "test-status test-success";
    testStatus.textContent = allTypesLoaded 
      ? translations[currentLang].test_success 
      : translations[currentLang].test_success + " (部分模型使用默认列表)";
    generateBtn.disabled = false;
    
    // 初始化显示文本模型元数据
    updateModelMetadata("text");
    
  } catch (e) {
    // 错误处理
    apiKeyValid = false;
    testStatus.className = "test-status test-error";
    testStatus.textContent = `❌ ${e.message}`;
    generateBtn.disabled = true;
    
    // 清空所有模型选择器
    const modelTypes = ["text", "image", "video", "audio"];
    modelTypes.forEach(type => {
      const select = document.getElementById(`${type}-model`);
      select.innerHTML = `<option value="">${translations[currentLang].select_model_default}: ${e.message}</option>`;
      document.getElementById(`${type}-metadata`).innerHTML = `<h4>${translations[currentLang].model_details}</h4><div class="error">Loading failed: ${e.message}</div>`;
    });
  } finally {
    document.getElementById("testApi").disabled = false;
  }
});

// 处理模型元数据（兼容官方返回的多种格式）
function processModelMetadata(models, type) {
  const metadata = {};
  const t = currentLang;
  
  // 情况1: 官方API返回的数组格式 [{"name": "model1", ...}]
  if (Array.isArray(models)) {
    models.forEach(model => {
      const modelId = model.name || model.id;
      if (modelId) {
        // 检查模型是否属于当前类型
        const isVideoModel = model.outputModalities && model.outputModalities.includes('video');
        const isImageModel = !isVideoModel;
        
        // 根据类型过滤模型
        if ((type === 'video' && isVideoModel) || (type === 'image' && isImageModel) || type !== 'video' && type !== 'image') {
          metadata[modelId] = {
            id: modelId,
            name: model.name || model.id,
            pricing: model.pricing ? 
              (t === "zh" ? "按Token计费" : "Token-based pricing") : 
              translations[t].pricing + ": N/A",
            capabilities: model.description || "Basic generation capabilities",
            metadata: {
              ...model,
              status: "available"
            }
          };
        }
      }
    });
  }
  // 情况2: OpenAI格式 { data: [{ id: "model1", ... }] }
  else if (models.data && Array.isArray(models.data)) {
    models.data.forEach(item => {
      const modelId = item.id || item.name;
      if (modelId) {
        metadata[modelId] = {
          id: modelId,
          name: item.name || item.id,
          pricing: item.pricing || translations[t].pricing + ": N/A",
          capabilities: item.capabilities || "Not specified",
          metadata: item.metadata || {}
        };
      }
    });
  }
  // 情况3: 简单数组格式 ["model1", "model2"]
  else if (Array.isArray(models) && models.every(item => typeof item === "string")) {
    models.forEach(modelId => {
      // 检查模型是否属于当前类型
      const isVideoModel = modelId.includes("veo") || modelId.includes("seedance") || modelId.includes("wan") || modelId.includes("grok-video") || modelId.includes("ltx-2");
      const isImageModel = !isVideoModel && (modelId.includes("flux") || modelId.includes("sd") || modelId.includes("gptimage") || modelId.includes("kontext") || modelId.includes("nanobanana") || modelId.includes("seedream") || modelId.includes("zimage") || modelId.includes("klein") || modelId.includes("imagen") || modelId.includes("grok-imagine"));
      
      // 根据类型过滤模型
      if ((type === 'video' && isVideoModel) || (type === 'image' && isImageModel) || type !== 'video' && type !== 'image') {
        metadata[modelId] = {
          id: modelId,
          name: modelId,
          pricing: translations[t].pricing + ": N/A",
          capabilities: "Basic generation capabilities",
          metadata: {
            type: isVideoModel ? "video" : isImageModel ? "image" : 
                  modelId.includes("gpt") ? "text":
                  modelId.includes("music") ? "audio" : "text",
            status: "available"
          }
        };
      }
    });
  }
  // 情况4: 对象格式 { "model1": { ... }, ... }
  else if (typeof models === "object" && models !== null) {
    Object.entries(models).forEach(([key, value]) => {
      metadata[key] = {
        id: key,
        name: value.name || key,
        pricing: value.pricing || translations[t].pricing + ": N/A",
        capabilities: value.capabilities || "Not specified",
        metadata: value.metadata || {}
      };
    });
  }
  
  return metadata;
}

// 获取带元数据的默认模型列表（官方文档推荐 - 最新模型）
function getDefaultModelsWithMetadata(type) {
  const t = currentLang;
  const defaultModels = {
    text: {
      "gpt-4o": {
        id: "gpt-4o",
        name: t === "zh" ? "GPT-4o (最新)" : "GPT-4o (Latest)",
        pricing: t === "zh" ? "按Token计费 (≈$0.005/1K Tokens)" : "Token-based pricing (≈$0.005/1K Tokens)",
        capabilities: t === "zh" ? "多模态理解、文本生成、对话" : "Multimodal understanding, text generation, conversation",
        metadata: {
          max_tokens: 128000,
          temperature_range: [0, 2],
          supported_languages: t === "zh" ? ["中文", "英文", "日文", "韩文", "西班牙语", "法语"] : ["zh", "en", "ja", "ko", "es", "fr"],
          status: "available"
        }
      },
      "gpt-4-turbo": {
        id: "gpt-4-turbo",
        name: t === "zh" ? "GPT-4 Turbo" : "GPT-4 Turbo",
        pricing: t === "zh" ? "按Token计费 (≈$0.01/1K Tokens)" : "Token-based pricing (≈$0.01/1K Tokens)",
        capabilities: t === "zh" ? "长文本处理、多语言支持" : "Long text processing, multilingual support",
        metadata: {
          max_tokens: 128000,
          temperature_range: [0, 2],
          supported_languages: t === "zh" ? ["中文", "英文", "日文", "韩文"] : ["zh", "en", "ja", "ko"],
          status: "available"
        }
      },
      "llama-3.1": {
        id: "llama-3.1",
        name: t === "zh" ? "Llama 3.1" : "Llama 3.1",
        pricing: t === "zh" ? "免费/按量计费" : "Free/Pay-as-you-go",
        capabilities: t === "zh" ? "开源大模型、文本生成、代码生成" : "Open-source large model, text generation, code generation",
        metadata: {
          max_tokens: 128000,
          temperature_range: [0, 1.5],
          supported_languages: t === "zh" ? ["英文", "中文", "多语言"] : ["en", "zh", "multilingual"],
          status: "available"
        }
      },
      "gemini-1.5": {
        id: "gemini-1.5",
        name: t === "zh" ? "Gemini 1.5" : "Gemini 1.5",
        pricing: t === "zh" ? "按Token计费 (≈$0.0025/1K Tokens)" : "Token-based pricing (≈$0.0025/1K Tokens)",
        capabilities: t === "zh" ? "多模态理解、长文本处理" : "Multimodal understanding, long text processing",
        metadata: {
          max_tokens: 2000000,
          temperature_range: [0, 2],
          supported_languages: t === "zh" ? ["中文", "英文", "多语言"] : ["zh", "en", "multilingual"],
          status: "available"
        }
      },
      "claude-3": {
        id: "claude-3",
        name: t === "zh" ? "Claude 3" : "Claude 3",
        pricing: t === "zh" ? "按Token计费 (≈$0.003/1K Tokens)" : "Token-based pricing (≈$0.003/1K Tokens)",
        capabilities: t === "zh" ? "长文本处理、安全性高" : "Long text processing, high security",
        metadata: {
          max_tokens: 200000,
          temperature_range: [0, 1],
          supported_languages: t === "zh" ? ["英文", "中文"] : ["en", "zh"],
          status: "available"
        }
      }
    },
    image: {
      "flux-1.1": {
        id: "flux-1.1",
        name: t === "zh" ? "Flux 1.1 (默认)" : "Flux 1.1 (Default)",
        pricing: t === "zh" ? "$0.02/张 (1024x1024)" : "$0.02/image (1024x1024)",
        capabilities: t === "zh" ? "高质量图片生成、细节丰富" : "High-quality image generation, rich details",
        metadata: {
          resolution: ["256x256", "512x512", "1024x1024", "2048x2048", "4096x4096"],
          style: t === "zh" ? ["写实", "动漫", "数字艺术", "3D", "抽象"] : ["Photorealistic", "Anime", "Digital Art", "3D", "Abstract"],
          inference_time: t === "zh" ? "2-4秒" : "2-4 seconds",
          status: "available"
        }
      },
      "dall-e-3": {
        id: "dall-e-3",
        name: t === "zh" ? "DALL-E 3" : "DALL-E 3",
        pricing: t === "zh" ? "$0.04/张 (1024x1024)" : "$0.04/image (1024x1024)",
        capabilities: t === "zh" ? "高质量图片生成、文字理解" : "High-quality image generation, text understanding",
        metadata: {
          resolution: ["1024x1024", "1792x1024", "1024x1792"],
          style: t === "zh" ? ["通用", "写实", "艺术"] : ["General", "Photorealistic", "Art"],
          inference_time: t === "zh" ? "4-7秒" : "4-7 seconds",
          status: "available"
        }
      },
      "sd-3.0": {
        id: "sd-3.0",
        name: t === "zh" ? "Stable Diffusion 3.0" : "Stable Diffusion 3.0",
        pricing: t === "zh" ? "$0.015/张 (1024x1024)" : "$0.015/image (1024x1024)",
        capabilities: t === "zh" ? "开源图片生成、自定义模型" : "Open-source image generation, custom models",
        metadata: {
          resolution: ["256x256", "512x512", "1024x1024", "2048x2048"],
          style: t === "zh" ? ["通用", "艺术", "概念"] : ["General", "Art", "Concept"],
          inference_time: t === "zh" ? "4-6秒" : "4-6 seconds",
          status: "available"
        }
      },
      "midjourney": {
        id: "midjourney",
        name: t === "zh" ? "Midjourney" : "Midjourney",
        pricing: t === "zh" ? "$0.03/张 (1024x1024)" : "$0.03/image (1024x1024)",
        capabilities: t === "zh" ? "艺术风格图片生成、创意设计" : "Art style image generation, creative design",
        metadata: {
          resolution: ["1024x1024", "2048x2048"],
          style: t === "zh" ? ["艺术", "创意", "概念"] : ["Art", "Creative", "Concept"],
          inference_time: t === "zh" ? "5-10秒" : "5-10 seconds",
          status: "available"
        }
      }
    },
    video: {
      "veo": {
        id: "veo",
        name: t === "zh" ? "Veo 3.1 Fast (默认)" : "Veo 3.1 Fast (Default)",
        pricing: t === "zh" ? "0.15 pollen/秒" : "0.15 pollen/second",
        capabilities: t === "zh" ? "Google视频生成模型 (预览)" : "Google's video generation model (preview)",
        metadata: {
          duration: [2, 60],
          resolution: ["720p", "1080p"],
          input_modalities: ["text", "image"],
          output_modalities: ["video"],
          status: "available"
        }
      },
      "seedance": {
        id: "seedance",
        name: t === "zh" ? "Seedance Lite" : "Seedance Lite",
        pricing: t === "zh" ? "按Token计费" : "Token-based pricing",
        capabilities: t === "zh" ? "BytePlus视频生成 (更高质量)" : "BytePlus video generation (better quality)",
        metadata: {
          duration: [2, 30],
          resolution: ["720p", "1080p"],
          input_modalities: ["text", "image"],
          output_modalities: ["video"],
          status: "available"
        }
      },
      "seedance-pro": {
        id: "seedance-pro",
        name: t === "zh" ? "Seedance Pro" : "Seedance Pro",
        pricing: t === "zh" ? "按Token计费" : "Token-based pricing",
        capabilities: t === "zh" ? "BytePlus视频生成 (更好的提示词遵循)" : "BytePlus video generation (better prompt adherence)",
        metadata: {
          duration: [2, 30],
          resolution: ["720p", "1080p"],
          input_modalities: ["text", "image"],
          output_modalities: ["video"],
          status: "available"
        }
      },
      "wan": {
        id: "wan",
        name: t === "zh" ? "Wan 2.6" : "Wan 2.6",
        pricing: t === "zh" ? "0.05 pollen/秒" : "0.05 pollen/second",
        capabilities: t === "zh" ? "阿里巴巴文本/图片转视频 (带音频)" : "Alibaba text/image-to-video with audio",
        metadata: {
          duration: [2, 15],
          resolution: ["720p", "1080p"],
          input_modalities: ["text", "image"],
          output_modalities: ["video"],
          status: "available"
        }
      },
      "grok-video": {
        id: "grok-video",
        name: t === "zh" ? "Grok Video" : "Grok Video",
        pricing: t === "zh" ? "0.0025 pollen/秒" : "0.0025 pollen/second",
        capabilities: t === "zh" ? "xAI视频生成" : "xAI video gen",
        metadata: {
          duration: [2, 30],
          resolution: ["720p", "1080p"],
          input_modalities: ["text", "image"],
          output_modalities: ["video"],
          status: "available"
        }
      },
      "ltx-2": {
        id: "ltx-2",
        name: t === "zh" ? "LTX-2" : "LTX-2",
        pricing: t === "zh" ? "0.01 pollen/秒" : "0.01 pollen/second",
        capabilities: t === "zh" ? "快速文本转视频生成 (带音频)" : "Fast text-to-video generation with audio",
        metadata: {
          duration: [2, 30],
          resolution: ["720p", "1080p"],
          input_modalities: ["text"],
          output_modalities: ["video"],
          status: "available"
        }
      }
    },
    audio: {
      "musicgen-2": {
        id: "musicgen-2",
        name: t === "zh" ? "MusicGen 2 (默认)" : "MusicGen 2 (Default)",
        pricing: t === "zh" ? "$0.006/秒" : "$0.006/second",
        capabilities: t === "zh" ? "文本生成音乐、背景音乐、高质量" : "Text-to-music, background music, high quality",
        metadata: {
          duration: [5, 300],
          format: ["mp3", "wav", "ogg"],
          genres: t === "zh" ? ["流行", "古典", "电子", "摇滚", "爵士", "嘻哈"] : ["Pop", "Classical", "Electronic", "Rock", "Jazz", "Hip-hop"],
          inference_time: t === "zh" ? "4-12秒" : "4-12 seconds",
          status: "available"
        }
      },
      "elevenlabs-v2": {
        id: "elevenlabs-v2",
        name: t === "zh" ? "ElevenLabs v2 (高质量语音)" : "ElevenLabs v2 (High-quality Voice)",
        pricing: t === "zh" ? "$0.0025/秒" : "$0.0025/second",
        capabilities: t === "zh" ? "高质量语音合成、情感语音、多语言" : "High-quality speech synthesis, emotional voice, multilingual",
        metadata: {
          duration: [1, 300],
          voices: t === "zh" ? ["nova", "rachel", "dave", "中文女声", "中文男声", "多语言"] : ["nova", "rachel", "dave", "Chinese Female", "Chinese Male", "multilingual"],
          format: ["mp3", "wav", "ogg"],
          inference_time: t === "zh" ? "1-5秒" : "1-5 seconds",
          status: "available"
        }
      },
      "audiogen-2": {
        id: "audiogen-2",
        name: t === "zh" ? "AudioGen 2" : "AudioGen 2",
        pricing: t === "zh" ? "$0.004/秒" : "$0.004/second",
        capabilities: t === "zh" ? "文本生成音效、环境音、高质量" : "Text-to-sound effects, ambient sounds, high quality",
        metadata: {
          duration: [1, 120],
          format: ["mp3", "wav", "ogg"],
          categories: t === "zh" ? ["自然", "城市", "科幻", "游戏", "电影"] : ["Nature", "City", "Sci-Fi", "Game", "Movie"],
          inference_time: t === "zh" ? "3-8秒" : "3-8 seconds",
          status: "available"
        }
      }
    };
  
  return defaultModels[type] || {};
}

// 填充从API获取的模型列表
function populateModelList(selectId, modelsMetadata, type) {
  const select = document.getElementById(selectId);
  select.innerHTML = "";
  
  // 添加默认选项
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = translations[currentLang].select_model_default;
  select.appendChild(defaultOption);
  
  // 添加模型选项
  const modelKeys = Object.keys(modelsMetadata);
  if (modelKeys.length > 0) {
    modelKeys.forEach(modelId => {
      const model = modelsMetadata[modelId];
      const option = document.createElement("option");
      option.value = modelId;
      option.textContent = model.name || modelId;
      select.appendChild(option);
    });
  } else {
    // 如果没有获取到模型，使用默认列表
    const defaultModels = getDefaultModelsWithMetadata(type);
    Object.keys(defaultModels).forEach(modelId => {
      const model = defaultModels[modelId];
      const option = document.createElement("option");
      option.value = modelId;
      option.textContent = model.name || modelId;
      select.appendChild(option);
    });
  }
  
  // 添加模型选择事件监听
  select.addEventListener("change", () => {
    updateModelMetadata(type);
  });
}

// 更新模型元数据显示
function updateModelMetadata(type) {
  const modelSelect = document.getElementById(`${type}-model`);
  const metadataPanel = document.getElementById(`${type}-metadata`);
  const selectedModelId = modelSelect.value;
  const t = currentLang;
  
  if (!selectedModelId || !allModelsMetadata[type][selectedModelId]) {
    metadataPanel.innerHTML = `
      <h4>${translations[t].model_details}</h4>
      <div>${translations[t].select_model_to_view_details}</div>
    `;
    return;
  }
  
  const model = allModelsMetadata[type][selectedModelId];
  
  // 构建元数据HTML
  let metadataHtml = `<h4>${translations[t].model_details}: ${model.name || model.id}</h4>`;
  
  // 基础信息
  metadataHtml += `
    <div class="metadata-item">
      <span class="metadata-key">${translations[t].model_id}:</span>
      <span class="metadata-value">${model.id}</span>
    </div>
    <div class="metadata-item">
      <span class="metadata-key">${translations[t].pricing}:</span>
      <span class="metadata-value">${model.pricing || translations[t].pricing + ": N/A"}</span>
    </div>
    <div class="metadata-item">
      <span class="metadata-key">${translations[t].capabilities}:</span>
      <span class="metadata-value">${model.capabilities || "Not specified"}</span>
    </div>
  `;
  
  // 详细元数据
  if (model.metadata && Object.keys(model.metadata).length > 0) {
    metadataHtml += `<div class="metadata-item"><span class="metadata-key">${translations[t].metadata}:</span></div>`;
    Object.entries(model.metadata).forEach(([key, value]) => {
      let displayValue = value;
      if (Array.isArray(value)) {
        displayValue = value.join(", ");
      } else if (typeof value === "object" && value !== null) {
        displayValue = JSON.stringify(value);
      }
      
      metadataHtml += `
        <div class="metadata-item" style="padding-left: 10px;">
          <span class="metadata-key">${key}:</span>
          <span class="metadata-value">${displayValue}</span>
        </div>
      `;
    });
  }
  
  metadataPanel.innerHTML = metadataHtml;
  
  // 根据模型类型和ID显示/隐藏相应的参数
  updateModelSpecificParams(type, selectedModelId);
}

// 根据模型类型和ID显示/隐藏相应的参数
function updateModelSpecificParams(type, modelId) {
  // 重置所有参数显示
  resetAllParams();
  
  switch (type) {
    case "image":
      // 只有gptimage和gptimage-large支持quality参数
      if (modelId === "gptimage" || modelId === "gptimage-large") {
        document.getElementById("param-image-quality").style.display = "block";
      } else {
        document.getElementById("param-image-quality").style.display = "none";
      }
      break;
    
    case "video":
      // 根据不同视频模型设置不同的时长范围
      const durationInput = document.getElementById("video-duration");
      if (modelId === "veo") {
        durationInput.min = 2;
        durationInput.max = 60;
      } else if (modelId === "seedance" || modelId === "seedance-pro") {
        durationInput.min = 2;
        durationInput.max = 30;
      } else if (modelId === "wan") {
        durationInput.min = 5;
        durationInput.max = 45;
      } else if (modelId === "grok-video") {
        durationInput.min = 10;
        durationInput.max = 120;
      } else if (modelId === "ltx-2") {
        durationInput.min = 2;
        durationInput.max = 40;
      }
      break;
    
    case "audio":
      // 只有elevenmusic支持instrumental参数
      if (modelId === "elevenmusic" || modelId === "musicgen-2") {
        document.getElementById("param-audio-instrumental").style.display = "flex";
      } else {
        document.getElementById("param-audio-instrumental").style.display = "none";
      }
      break;
  }
}

// 重置所有参数显示
function resetAllParams() {
  // 图片参数
  if (document.getElementById("param-image-quality")) {
    document.getElementById("param-image-quality").style.display = "block";
  }
  
  // 音频参数
  if (document.getElementById("param-audio-instrumental")) {
    document.getElementById("param-audio-instrumental").style.display = "flex";
  }
  
  // 视频参数重置时长范围
  const durationInput = document.getElementById("video-duration");
  if (durationInput) {
    durationInput.min = 2;
    durationInput.max = 60;
  }
}

// 生成按钮点击事件
document.getElementById("generate").addEventListener("click", async () => {
  const key = document.getElementById("apiKey").value.trim();
  const prompt = document.getElementById("prompt").value.trim();
  const res = document.getElementById("result");
  const t = currentLang;

  // 前置验证
  if (!apiKeyValid) {
    res.innerHTML = `<div class="error">${translations[t].error_api_required}</div>`;
    return;
  }
  if (!key) {
    res.innerHTML = `<div class="error">${translations[t].error_api_empty}</div>`;
    return;
  }
  if (!prompt) {
    res.innerHTML = `<div class="error">${translations[t].error_prompt_empty}</div>`;
    return;
  }

  // 获取当前选择的模型
  const modelSelect = document.getElementById(`${currentType}-model`);
  const selectedModel = modelSelect.value;
  
  if (!selectedModel) {
    res.innerHTML = `<div class="error">${translations[t].error_model_required}</div>`;
    return;
  }

  const btn = document.getElementById("generate");
  btn.disabled = true;
  btn.textContent = translations[t].generate_btn.replace("🚀 ", "") + "ing...";
  
  // 根据类型显示不同的加载文本
  let loadingText = "";
  switch(currentType) {
    case "text": loadingText = translations[t].generating_text; break;
    case "image": loadingText = translations[t].generating_image; break;
    case "video": loadingText = translations[t].generating_video; break;
    case "audio": loadingText = translations[t].generating_audio; break;
  }
  // 添加更明显的加载动画
  res.innerHTML = `
    <div class="loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
      <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
      <div>${loadingText}</div>
      <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">请耐心等待，生成过程可能需要几秒钟时间</div>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;

  try {
    if (currentType === "text") {
      // 文本生成 - 严格遵循OpenAI兼容接口规范
      const temperature = parseFloat(document.getElementById("text-temp").value);
      const maxTokens = parseInt(document.getElementById("text-tokens").value);
      const role = document.getElementById("text-role").value;

      // 添加用户消息到对话历史
      chatHistory.push({
        role: "user",
        content: prompt,
        timestamp: new Date().toISOString()
      });

      // 构建消息数组，包含完整对话历史
      const messages = chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const r = await fetch(`${base}${generateEndpoints.text}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: messages,
          temperature: temperature,
          max_tokens: maxTokens
        })
      });

      if (!r.ok) {
        throw new Error(`API request failed: ${r.status} ${r.statusText}`);
      }

      const d = await r.json();
      const assistantResponse = d.choices?.[0]?.message?.content || translations[t].no_result;

      // 添加助手回复到对话历史
      chatHistory.push({
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date().toISOString()
      });

      // 重新渲染对话历史
      renderChatHistory();

      // 添加模型信息
      const modelInfo = document.createElement('div');
      modelInfo.style.cssText = 'margin-top: 10px; font-size: 12px; color: var(--gray);';
      modelInfo.textContent = `${translations[t].using_model}: ${selectedModel} | ${translations[t].temperature}: ${temperature} | ${translations[t].max_tokens}: ${maxTokens}`;
      res.appendChild(modelInfo);
    } 
    else if (currentType === "image") {
      // 图片生成 - 严格遵循官方/image接口规范
      const width = document.getElementById("image-width").value;
      const height = document.getElementById("image-height").value;
      const style = document.getElementById("image-style").value;
      const negative = document.getElementById("image-negative").value;
      const quality = document.getElementById("image-quality").value;
      const seed = document.getElementById("image-seed").value;
      const enhance = document.getElementById("image-enhance").checked;
      const transparent = document.getElementById("image-transparent").checked;
      
      // 构建参数（完全匹配官方文档的参数名）
      let imageParams = new URLSearchParams({
        width: width,
        height: height,
        model: selectedModel,
        key: key
      });
      
      if (style) imageParams.append("style", style);
      if (negative) imageParams.append("negative_prompt", negative);
      // 只有gptimage和gptimage-large支持quality参数
      if ((selectedModel === "gptimage" || selectedModel === "gptimage-large") && quality) {
        imageParams.append("quality", quality);
      }
      if (seed) imageParams.append("seed", seed);
      if (enhance) imageParams.append("enhance", "true");
      if (transparent) imageParams.append("transparent", "true");
      
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `${base}${generateEndpoints.image}/${encodedPrompt}?${imageParams.toString()}`;
      
      // 保持加载动画，直到图片加载完成
      res.innerHTML = `
        <div class="media-container">
          <div class="media-info">
            ${translations[t].using_model}: ${selectedModel} | ${translations[t].dimensions}: ${width}x${height}
          </div>
          <div id="image-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
            <div>${translations[t].generating_image}</div>
            <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">请耐心等待，图片生成可能需要几秒钟时间</div>
          </div>
          <div id="image-container" style="display: none;">
            <img id="generated-image" alt="${t === 'zh' ? 'Pollinations生成图片' : 'Pollinations Generated Image'}">
            <a id="download-link" href="" target="_blank" download class="download-btn">
              📥 ${translations[t].download_image}
            </a>
          </div>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      `;
      
      // 使用JavaScript监听图片加载完成
      const img = document.getElementById('generated-image');
      const downloadLink = document.getElementById('download-link');
      const loadingDiv = document.getElementById('image-loading');
      const imageContainer = document.getElementById('image-container');
      
      if (img && downloadLink) {
        // 设置下载链接
        downloadLink.href = url;
        
        // 设置图片加载完成事件
        img.onload = function() {
          loadingDiv.style.display = 'none';
          imageContainer.style.display = 'block';
        };
        
        // 图片加载失败时也隐藏加载动画
        img.onerror = function() {
          loadingDiv.style.display = 'none';
          imageContainer.style.display = 'block';
        };
        
        // 设置超时，防止加载时间过长
        setTimeout(function() {
          loadingDiv.style.display = 'none';
          imageContainer.style.display = 'block';
        }, 30000); // 30秒超时
        
        // 立即设置图片源，触发图片加载（即触发图片生成请求）
        img.src = url;
      }
    } 
    else if (currentType === "video") {
      // 视频生成 - 严格遵循官方/video接口规范
      const duration = document.getElementById("video-duration").value;
      const resolution = document.getElementById("video-res").value;
      const fps = document.getElementById("video-fps").value;
      const aspectRatio = document.getElementById("video-aspect").value;
      const audio = document.getElementById("video-audio").checked;
      
      let videoParams = new URLSearchParams({
        duration: duration,
        resolution: resolution,
        fps: fps,
        aspectRatio: aspectRatio,
        model: selectedModel,
        key: key
      });
      
      if (audio) videoParams.append("audio", "true");
      
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `${base}${generateEndpoints.video}/${encodedPrompt}?${videoParams.toString()}`;
      const posterUrl = `https://pollinations.ai/p/${encodedPrompt}?width=640&height=360`;
      
      // 保持加载动画，直到视频加载完成
      res.innerHTML = `
        <div class="media-container">
          <div class="media-info">
            ${translations[t].using_model}: ${selectedModel} | ${translations[t].duration}: ${duration}s | ${translations[t].resolution}: ${resolution} | ${translations[t].fps}: ${fps} | 宽高比: ${aspectRatio}
          </div>
          <div id="video-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
            <div>${translations[t].generating_video}</div>
            <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">请耐心等待，视频生成可能需要几秒钟时间</div>
          </div>
          <div id="video-container" style="display: none;">
            <video controls src="${url}" poster="${posterUrl}" style="max-width: 100%; border-radius: 8px; margin-bottom: 12px;">
              ${translations[t].browser_not_support_video}
            </video>
            <a href="${url}" target="_blank" download class="download-btn">
              📥 ${translations[t].download_video}
            </a>
          </div>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      `;
      
      // 使用JavaScript监听视频加载完成
      const video = res.querySelector('video');
      const loadingDiv = document.getElementById('video-loading');
      const videoContainer = document.getElementById('video-container');
      
      if (video) {
        video.onloadeddata = function() {
          loadingDiv.style.display = 'none';
          videoContainer.style.display = 'block';
        };
        
        // 视频加载失败时也隐藏加载动画
        video.onerror = function() {
          loadingDiv.style.display = 'none';
          videoContainer.style.display = 'block';
        };
        
        // 设置超时，防止加载时间过长
        setTimeout(function() {
          loadingDiv.style.display = 'none';
          videoContainer.style.display = 'block';
        }, 60000); // 60秒超时
      }
    } 
    else if (currentType === "audio") {
      // 音频生成 - 严格遵循官方/audio接口规范
      const duration = document.getElementById("audio-duration").value;
      const voice = document.getElementById("audio-voice").value;
      const format = document.getElementById("audio-format").value;
      const speed = document.getElementById("audio-speed").value;
      const instrumental = document.getElementById("audio-instrumental").checked;
      
      let audioParams = new URLSearchParams({
        duration: duration,
        voice: voice,
        format: format,
        speed: speed,
        model: selectedModel,
        key: key
      });
      
      // 只有elevenmusic和musicgen-2支持instrumental参数
      if ((selectedModel === "elevenmusic" || selectedModel === "musicgen-2") && instrumental) {
        audioParams.append("instrumental", "true");
      }
      
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `${base}${generateEndpoints.audio}/${encodedPrompt}?${audioParams.toString()}`;
      
      // 保持加载动画，直到音频加载完成
      res.innerHTML = `
        <div class="media-container">
          <div class="media-info">
            ${translations[t].using_model}: ${selectedModel} | ${translations[t].duration}: ${duration}s | ${translations[t].voice}: ${voice} | ${translations[t].format}: ${format} | 语速: ${speed}
          </div>
          <div id="audio-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
            <div>${translations[t].generating_audio}</div>
            <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">请耐心等待，音频生成可能需要几秒钟时间</div>
          </div>
          <div id="audio-container" style="display: none;">
            <audio controls src="${url}" style="width: 100%; margin-bottom: 12px;">
              ${translations[t].browser_not_support_audio}
             </audio>
            <a href="${url}" target="_blank" download class="download-btn">
              📥 ${translations[t].download_audio}
            </a>
          </div>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      `;
      
      // 使用JavaScript监听音频加载完成
      const audio = res.querySelector('audio');
      const loadingDiv = document.getElementById('audio-loading');
      const audioContainer = document.getElementById('audio-container');
      
      if (audio) {
        audio.onloadeddata = function() {
          loadingDiv.style.display = 'none';
          audioContainer.style.display = 'block';
        };
        
        // 音频加载失败时也隐藏加载动画
        audio.onerror = function() {
          loadingDiv.style.display = 'none';
          audioContainer.style.display = 'block';
        };
        
        // 设置超时，防止加载时间过长
        setTimeout(function() {
          loadingDiv.style.display = 'none';
          audioContainer.style.display = 'block';
        }, 30000); // 30秒超时
      }
    }
  } catch (e) {
    res.innerHTML = `<div class="error">❌ ${translations[t].generating_failed}：${e.message}</div>`;
    console.error("Generation error:", e);
  } finally {
    btn.disabled = false;
    btn.textContent = translations[t].generate_btn;
  }
});

// 渲染对话历史
function renderChatHistory() {
  const res = document.getElementById("result");
  
  if (chatHistory.length === 0) {
    res.innerHTML = "";
    return;
  }
  
  let chatHtml = '<div class="chat-container">';
  
  chatHistory.forEach(message => {
    const isUser = message.role === "user";
    const avatarText = isUser ? "你" : "AI";
    const timestamp = new Date(message.timestamp).toLocaleTimeString();
    
    chatHtml += `
      <div class="chat-message ${isUser ? 'user' : 'assistant'}">
        <div class="chat-avatar ${isUser ? 'user' : 'assistant'}">${avatarText}</div>
        <div>
          <div class="chat-content">${message.content.replace(/\n/g, '<br>')}</div>
          <div class="chat-meta">${timestamp}</div>
        </div>
      </div>
    `;
  });
  
  chatHtml += '</div>';
  res.innerHTML = chatHtml;
  
  // 滚动到底部
  const chatContainer = res.querySelector('.chat-container');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

// 标签切换时清空对话历史
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    if (currentType === "text" && tab.dataset.type !== "text") {
      chatHistory = [];
    } else if (tab.dataset.type === "text") {
      renderChatHistory();
    }
  });
});

// 初始化函数
function init() {
  // 检测并设置用户浏览器语言
  const detectedLang = detectUserLanguage();
  if (detectedLang !== currentLang) {
    switchLanguage(detectedLang);
  }
  
  // 显示文本参数
  document.getElementById("text-params").style.display = "flex";
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);