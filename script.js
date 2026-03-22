const base = "https://gen.pollinations.ai";
let currentType = "text";
let apiKeyValid = false;
let currentLang = "zh";
let chatHistory = [];

function detectUserLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  const langCode = userLang.split('-')[0];
  
  if (translations[langCode]) {
    return langCode;
  }
  
  return "en";
}

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
    reference_image_label: "参考图 URL",
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
    generating_failed: "生成失败",
    history_title: "历史生成",
    clear_history_btn: "清空历史",
    history_empty: "暂无历史记录",
    type_text: "文本",
    type_image: "图片",
    type_video: "视频",
    type_audio: "音频",
    confirm_clear_history: "确定要清空所有历史记录吗？",
    please_wait: "请耐心等待，生成过程可能需要几秒钟时间",
    please_wait_image: "请耐心等待，图片生成可能需要几秒钟时间",
    please_wait_video: "请耐心等待，视频生成可能需要几秒钟时间",
    please_wait_audio: "请耐心等待，音频生成可能需要几秒钟时间",
    built_with: "基于 Pollinations AI 构建",
    visit_official_website: "访问官方网站"
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
    reference_image_label: "Reference Image URL",
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
    generating_failed: "Generation failed",
    history_title: "History",
    clear_history_btn: "Clear History",
    history_empty: "No history records",
    type_text: "Text",
    type_image: "Image",
    type_video: "Video",
    type_audio: "Audio",
    confirm_clear_history: "Are you sure you want to clear all history records?",
    please_wait: "Please wait, the generation process may take a few seconds",
    please_wait_image: "Please wait, image generation may take a few seconds",
    please_wait_video: "Please wait, video generation may take a few seconds",
    please_wait_audio: "Please wait, audio generation may take a few seconds",
    built_with: "Built with Pollinations AI",
    visit_official_website: "Visit Official Website"
  }
};

function switchLanguage(lang) {
  currentLang = lang;
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  document.querySelectorAll('[data-lang-key]').forEach(el => {
    const key = el.dataset.langKey;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
    const key = el.dataset.langPlaceholder;
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  // 更新高级设置中的占位符
  const imageReference = document.getElementById('image-reference');
  if (imageReference) {
    imageReference.placeholder = lang === 'zh' ? '输入参考图片的 URL，多个用 | 分隔' : 'Enter reference image URL, multiple separated by |';
  }
  
  const imageNegative = document.getElementById('image-negative');
  if (imageNegative) {
    imageNegative.placeholder = lang === 'zh' ? '例如：模糊, 低质量' : 'e.g., blurry, low quality';
  }
  
  const imageSeed = document.getElementById('image-seed');
  if (imageSeed) {
    imageSeed.placeholder = lang === 'zh' ? '留空为随机' : 'Leave blank for random';
  }
  
  const videoReference = document.getElementById('video-reference');
  if (videoReference) {
    videoReference.placeholder = lang === 'zh' ? '起始帧 | 结束帧 (veo支持双参考图，多图用 | 分隔)' : 'Start frame | End frame (veo supports dual reference images, multiple separated by |)';
  }
  
  document.querySelectorAll('.model-select option[value=""]').forEach(el => {
    el.textContent = translations[lang].select_model_default;
  });
  
  document.querySelectorAll('.model-metadata h4').forEach(el => {
    el.textContent = translations[lang].model_details;
  });
  document.querySelectorAll('.model-metadata div[data-lang-key="select_model_to_view"]').forEach(el => {
    el.textContent = translations[lang].select_model_to_view;
  });
  
  document.getElementById('generate').textContent = translations[lang].generate_btn;
  
  updateModelMetadata(currentType);
  
  // 通知历史记录iframe更新语言
  const historyIframe = document.getElementById('history-iframe');
  if (historyIframe && historyIframe.contentWindow) {
    try {
      historyIframe.contentWindow.postMessage({
        type: 'setLanguage',
        lang: lang
      }, '*');
      console.log('Language change message sent to history iframe');
    } catch (e) {
      console.error('Error sending language change message:', e);
    }
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchLanguage(btn.dataset.lang);
  });
});

document.getElementById('getApiKey').addEventListener('click', () => {
  window.open('https://enter.pollinations.ai/authorize?redirect_url=https://mokindred.github.io&app_key=pk_rgbhWzNY9Zp3nBU9', '_blank');
});

// 检查URL哈希中是否包含API key
function checkForApiKey() {
  console.log('Checking for API key in URL hash...');
  console.log('Current location hash:', location.hash);
  
  // 从URL哈希中获取API key
  const apiKey = new URLSearchParams(location.hash.slice(1)).get('api_key');
  console.log('Found API key:', apiKey);
  
  if (apiKey) {
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput) {
      console.log('Found apiKey input element, setting value...');
      apiKeyInput.value = apiKey;
      
      // 复制API key到剪贴板
      navigator.clipboard.writeText(apiKey).then(() => {
        console.log('API key copied to clipboard');
        // 显示复制成功提示
        const testStatus = document.getElementById('testStatus');
        if (testStatus) {
          testStatus.className = 'test-status test-success';
          testStatus.textContent = '✅ API key 已复制到剪贴板';
          // 3秒后清除提示
          setTimeout(() => {
            testStatus.textContent = '';
          }, 3000);
        }
      }).catch(err => {
        console.error('Failed to copy API key: ', err);
      });
      
      // 自动测试API连接
      const testApiBtn = document.getElementById('testApi');
      if (testApiBtn) {
        console.log('Found testApi button, clicking...');
        testApiBtn.click();
      } else {
        console.error('testApi button not found');
      }
    } else {
      console.error('apiKey input element not found');
    }
  }
}

// 页面加载时检查API key
window.addEventListener('DOMContentLoaded', checkForApiKey);

// 页面哈希变化时也检查API key
window.addEventListener('hashchange', checkForApiKey);

let allModelsMetadata = {
  text: {},
  image: {},
  video: {},
  audio: {}
};

const modelEndpoints = {
  text: "/text/models",
  image: "/image/models",
  video: "/image/models",
  audio: "/audio/models"
};

const generateEndpoints = {
  text: "/v1/chat/completions",
  image: "/image",
  video: "/video",
  audio: "/audio"
};

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentType = tab.dataset.type;
    
    document.querySelectorAll(".model-selector").forEach(ms => ms.classList.remove("active"));
    document.getElementById(`${currentType}-models`).classList.add("active");
    
    document.querySelectorAll(".param-row").forEach(pr => pr.style.display = "none");
    if (currentType !== "text") {
      document.getElementById(`${currentType}-params`).style.display = "flex";
    } else {
      document.getElementById("text-params").style.display = "flex";
    }
    
    updateModelMetadata(currentType);
  });
});

document.getElementById("advanced-toggle").addEventListener("click", () => {
  document.getElementById("advanced-params").classList.toggle("active");
});

document.getElementById("testApi").addEventListener("click", async () => {
  const key = document.getElementById("apiKey").value.trim();
  const testStatus = document.getElementById("testStatus");
  const generateBtn = document.getElementById("generate");
  
  if (!key) {
    testStatus.className = "test-status test-error";
    testStatus.textContent = translations[currentLang].test_error_empty;
    return;
  }
  
  testStatus.className = "test-status test-success";
  testStatus.textContent = translations[currentLang].test_connecting;
  document.getElementById("testApi").disabled = true;
  generateBtn.disabled = true;
  
  console.log("=== Starting API Test ===");
  console.log("API Key:", key.substring(0, 10) + "...");
  
  try {
    const modelTypes = ["text", "image", "video", "audio"];
    let allTypesLoaded = true;
    let anyTypeSucceeded = false;
    
    for (const type of modelTypes) {
      console.log(`=== Loading ${type} models ===`);
      console.log(`Endpoint: ${base}${modelEndpoints[type]}`);
      
      try {
        const modelResponse = await fetch(`${base}${modelEndpoints[type]}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json"
          },
          timeout: 10000
        });
        
        console.log(`${type} response status:`, modelResponse.status, modelResponse.statusText);
        
        if (modelResponse.ok) {
          const models = await modelResponse.json();
          console.log(`${type} raw data:`, models);
          console.log(`${type} data type:`, Array.isArray(models) ? 'array' : typeof models);
          
          allModelsMetadata[type] = processModelMetadata(models, type);
          console.log(`${type} processed metadata:`, allModelsMetadata[type]);
          populateModelList(`${type}-model`, allModelsMetadata[type], type);
          anyTypeSucceeded = true;
        } else {
          console.warn(`Failed to load ${type} model list, using default list`);
          const defaultModels = getDefaultModelsWithMetadata(type);
          allModelsMetadata[type] = defaultModels;
          populateModelList(`${type}-model`, defaultModels, type);
          allTypesLoaded = false;
        }
      } catch (e) {
        console.warn(`Error loading ${type} model list:`, e);
        const defaultModels = getDefaultModelsWithMetadata(type);
        allModelsMetadata[type] = defaultModels;
        populateModelList(`${type}-model`, defaultModels, type);
        allTypesLoaded = false;
      }
    }
    
    if (!anyTypeSucceeded) {
      throw new Error("API Key is invalid or no models could be loaded");
    }
    
    apiKeyValid = true;
    testStatus.className = "test-status test-success";
    testStatus.textContent = allTypesLoaded 
      ? translations[currentLang].test_success 
      : translations[currentLang].test_success + " (部分模型使用默认列表)";
    generateBtn.disabled = false;
    
    updateModelMetadata("text");
    
  } catch (e) {
    apiKeyValid = false;
    testStatus.className = "test-status test-error";
    testStatus.textContent = `❌ ${e.message}`;
    generateBtn.disabled = true;
    
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

function processModelMetadata(models, type) {
  const metadata = {};
  const t = currentLang;
  
  console.log(`Processing ${type} models:`, models);
  
  if (Array.isArray(models)) {
    console.log(`Branch: Array.isArray(models) - processing ${models.length} models`);
    models.forEach(model => {
      const modelId = model.name || model.id;
      if (modelId) {
        const outputModalities = model.outputModalities || model.output_modalities || [];
        const isVideoModel = outputModalities.includes('video');
        const isImageModel = outputModalities.includes('image');
        
        console.log(`Model ${modelId}: outputModalities=${JSON.stringify(outputModalities)}, isVideoModel=${isVideoModel}, isImageModel=${isImageModel}`);
        
        if (type === 'video' && isVideoModel) {
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
        } else if (type === 'image' && isImageModel && !isVideoModel) {
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
        } else if (type === 'text' && !isVideoModel && !isImageModel) {
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
        } else if (type === 'audio' && !isVideoModel && !isImageModel) {
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
    console.log(`Result for ${type}:`, Object.keys(metadata));
  }
  else if (models.data && Array.isArray(models.data)) {
    console.log(`Branch: models.data`);
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
  else if (Array.isArray(models) && models.every(item => typeof item === "string")) {
    console.log(`Branch: string array`);
    models.forEach(modelId => {
      const isVideoModel = modelId.includes("veo") || modelId.includes("seedance") || modelId.includes("wan") || modelId.includes("grok-video") || modelId.includes("ltx-2");
      const isImageModel = !isVideoModel && (modelId.includes("flux") || modelId.includes("sd") || modelId.includes("gptimage") || modelId.includes("kontext") || modelId.includes("nanobanana") || modelId.includes("seedream") || modelId.includes("zimage") || modelId.includes("klein") || modelId.includes("imagen") || modelId.includes("grok-imagine"));
      
      if (type === 'video' && isVideoModel) {
        metadata[modelId] = {
          id: modelId,
          name: modelId,
          pricing: translations[t].pricing + ": N/A",
          capabilities: "Basic generation capabilities",
          metadata: {
            type: "video",
            status: "available"
          }
        };
      } else if (type === 'image' && isImageModel) {
        metadata[modelId] = {
          id: modelId,
          name: modelId,
          pricing: translations[t].pricing + ": N/A",
          capabilities: "Basic generation capabilities",
          metadata: {
            type: "image",
            status: "available"
          }
        };
      } else if (type === 'text' && !isVideoModel && !isImageModel) {
        metadata[modelId] = {
          id: modelId,
          name: modelId,
          pricing: translations[t].pricing + ": N/A",
          capabilities: "Basic generation capabilities",
          metadata: {
            type: "text",
            status: "available"
          }
        };
      } else if (type === 'audio' && !isVideoModel && !isImageModel) {
        metadata[modelId] = {
          id: modelId,
          name: modelId,
          pricing: translations[t].pricing + ": N/A",
          capabilities: "Basic generation capabilities",
          metadata: {
            type: "audio",
            status: "available"
          }
        };
      }
    });
  }
  else if (typeof models === "object" && models !== null) {
    console.log(`Branch: object`);
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
        capabilities: t === "zh" ? "xAI视频生成" : "xAI video generation",
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
    }
  };
  
  return defaultModels[type] || {};
}

function populateModelList(selectId, modelsMetadata, type) {
  const select = document.getElementById(selectId);
  select.innerHTML = "";
  
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = translations[currentLang].select_model_default;
  select.appendChild(defaultOption);
  
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
    const defaultModels = getDefaultModelsWithMetadata(type);
    Object.keys(defaultModels).forEach(modelId => {
      const model = defaultModels[modelId];
      const option = document.createElement("option");
      option.value = modelId;
      option.textContent = model.name || modelId;
      select.appendChild(option);
    });
  }
  
  select.addEventListener("change", () => {
    updateModelMetadata(type);
  });
}

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
  
  let metadataHtml = `<h4>${translations[t].model_details}: ${model.name || model.id}</h4>`;
  
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
  
  updateModelSpecificParams(type, selectedModelId);
}

function updateModelSpecificParams(type, modelId) {
  resetAllParams();
  
  switch (type) {
    case "image":
      if (modelId === "gptimage" || modelId === "gptimage-large") {
        document.getElementById("param-image-quality").style.display = "block";
      } else {
        document.getElementById("param-image-quality").style.display = "none";
      }
      break;
    
    case "video":
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
      if (modelId === "elevenmusic" || modelId === "musicgen-2") {
        document.getElementById("param-audio-instrumental").style.display = "flex";
      } else {
        document.getElementById("param-audio-instrumental").style.display = "none";
      }
      break;
  }
}

function resetAllParams() {
  if (document.getElementById("param-image-quality")) {
    document.getElementById("param-image-quality").style.display = "block";
  }
  
  if (document.getElementById("param-audio-instrumental")) {
    document.getElementById("param-audio-instrumental").style.display = "flex";
  }
  
  const durationInput = document.getElementById("video-duration");
  if (durationInput) {
    durationInput.min = 2;
    durationInput.max = 60;
  }
}

document.getElementById("generate").addEventListener("click", async () => {
  const key = document.getElementById("apiKey").value.trim();
  const prompt = document.getElementById("prompt").value.trim();
  const res = document.getElementById("result");
  const t = currentLang;

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

  const modelSelect = document.getElementById(`${currentType}-model`);
  const selectedModel = modelSelect.value;
  
  if (!selectedModel) {
    res.innerHTML = `<div class="error">${translations[t].error_model_required}</div>`;
    return;
  }

  // 收集生成参数
  let params = {};
  if (currentType === "text") {
    params = {
      temperature: parseFloat(document.getElementById("text-temp").value),
      max_tokens: parseInt(document.getElementById("text-tokens").value),
      role: document.getElementById("text-role").value
    };
  } else if (currentType === "image") {
    params = {
      width: document.getElementById("image-width").value,
      height: document.getElementById("image-height").value,
      style: document.getElementById("image-style").value,
      negative: document.getElementById("image-negative").value,
      quality: document.getElementById("image-quality").value,
      seed: document.getElementById("image-seed").value,
      enhance: document.getElementById("image-enhance").checked,
      transparent: document.getElementById("image-transparent").checked,
      referenceImage: document.getElementById("image-reference").value
    };
  } else if (currentType === "video") {
    params = {
      duration: document.getElementById("video-duration").value,
      resolution: document.getElementById("video-res").value,
      fps: document.getElementById("video-fps").value,
      aspectRatio: document.getElementById("video-aspect").value,
      audio: document.getElementById("video-audio").checked,
      referenceImage: document.getElementById("video-reference").value
    };
  } else if (currentType === "audio") {
    params = {
      duration: document.getElementById("audio-duration").value,
      voice: document.getElementById("audio-voice").value,
      format: document.getElementById("audio-format").value,
      speed: document.getElementById("audio-speed").value,
      instrumental: document.getElementById("audio-instrumental").checked
    };
  }

  // 设置当前生成参数
  currentGenerationParams = {
    type: currentType,
    prompt: prompt,
    model: selectedModel,
    params: params
  };

  const btn = document.getElementById("generate");
  btn.disabled = true;
  btn.textContent = translations[t].generate_btn.replace("🚀 ", "") + "ing...";
  
  let loadingText = "";
  switch(currentType) {
    case "text": loadingText = translations[t].generating_text; break;
    case "image": loadingText = translations[t].generating_image; break;
    case "video": loadingText = translations[t].generating_video; break;
    case "audio": loadingText = translations[t].generating_audio; break;
  }
  
  res.innerHTML = `
    <div class="loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
      <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
      <div>${loadingText}</div>
      <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">${translations[t].please_wait}</div>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;

  try {
    if (currentType === "text") {
      const temperature = parseFloat(document.getElementById("text-temp").value);
      const maxTokens = parseInt(document.getElementById("text-tokens").value);
      const role = document.getElementById("text-role").value;

      chatHistory.push({
        role: "user",
        content: prompt,
        timestamp: new Date().toISOString()
      });

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

      chatHistory.push({
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date().toISOString()
      });

      renderChatHistory();

      // 添加到历史记录
      if (currentGenerationParams && currentGenerationParams.type === 'text') {
        addToHistory('text', prompt, assistantResponse, selectedModel, currentGenerationParams.params);
        currentGenerationParams = null;
      }

      const modelInfo = document.createElement('div');
      modelInfo.style.cssText = 'margin-top: 10px; font-size: 12px; color: var(--gray);';
      modelInfo.textContent = `${translations[t].using_model}: ${selectedModel} | ${translations[t].temperature}: ${temperature} | ${translations[t].max_tokens}: ${maxTokens}`;
      res.appendChild(modelInfo);
    } 
    else if (currentType === "image") {
      const width = document.getElementById("image-width").value;
      const height = document.getElementById("image-height").value;
      const style = document.getElementById("image-style").value;
      const negative = document.getElementById("image-negative").value;
      const quality = document.getElementById("image-quality").value;
      const seed = document.getElementById("image-seed").value;
      const enhance = document.getElementById("image-enhance").checked;
      const transparent = document.getElementById("image-transparent").checked;
      const referenceImage = document.getElementById("image-reference").value;
      
      let imageParams = new URLSearchParams({
        width: width,
        height: height,
        model: selectedModel,
        key: key
      });
      
      if (style) imageParams.append("style", style);
      if (negative) imageParams.append("negative_prompt", negative);
      if ((selectedModel === "gptimage" || selectedModel === "gptimage-large") && quality) {
        imageParams.append("quality", quality);
      }
      if (seed) imageParams.append("seed", seed);
      if (enhance) imageParams.append("enhance", "true");
      if (transparent) imageParams.append("transparent", "true");
      if (referenceImage) imageParams.append("image", referenceImage);
      
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `${base}${generateEndpoints.image}/${encodedPrompt}?${imageParams.toString()}`;
      
      res.innerHTML = `
        <div class="media-container">
          <div class="media-info">
            ${translations[t].using_model}: ${selectedModel} | ${translations[t].dimensions}: ${width}x${height}
          </div>
          <div id="image-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
            <div>${translations[t].generating_image}</div>
            <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">${translations[t].please_wait_image}</div>
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
      
      const img = document.getElementById('generated-image');
      const downloadLink = document.getElementById('download-link');
      const loadingDiv = document.getElementById('image-loading');
      const imageContainer = document.getElementById('image-container');
      
      if (img && downloadLink) {
        downloadLink.href = url;
        
        // 直接添加到历史记录，不再依赖事件监听器
        addMediaToHistory(url, 'image');
        
        img.onload = function() {
          loadingDiv.style.display = 'none';
          imageContainer.style.display = 'block';
        };
        
        img.onerror = function() {
          loadingDiv.style.display = 'none';
          imageContainer.style.display = 'block';
        };
        
        setTimeout(function() {
          loadingDiv.style.display = 'none';
          imageContainer.style.display = 'block';
        }, 30000);
        
        img.src = url;
      }
    } 
    else if (currentType === "video") {
      const duration = document.getElementById("video-duration").value;
      const resolution = document.getElementById("video-res").value;
      const fps = document.getElementById("video-fps").value;
      const aspectRatio = document.getElementById("video-aspect").value;
      const audio = document.getElementById("video-audio").checked;
      const referenceImage = document.getElementById("video-reference").value;
      
      let videoParams = new URLSearchParams({
        duration: duration,
        resolution: resolution,
        fps: fps,
        aspectRatio: aspectRatio,
        model: selectedModel,
        key: key
      });
      
      if (audio) videoParams.append("audio", "true");
      if (referenceImage) videoParams.append("image", referenceImage);
      
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `${base}${generateEndpoints.video}/${encodedPrompt}?${videoParams.toString()}`;
      const posterUrl = `https://pollinations.ai/p/${encodedPrompt}?width=640&height=360`;
      
      res.innerHTML = `
        <div class="media-container">
          <div class="media-info">
            ${translations[t].using_model}: ${selectedModel} | ${translations[t].duration}: ${duration}s | ${translations[t].resolution}: ${resolution} | ${translations[t].fps}: ${fps} | ${translations[t].aspect_ratio_label}: ${aspectRatio}
          </div>
          <div id="video-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
            <div>${translations[t].generating_video}</div>
            <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">${translations[t].please_wait_video}</div>
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
      
      const video = res.querySelector('video');
      const loadingDiv = document.getElementById('video-loading');
      const videoContainer = document.getElementById('video-container');
      
      if (video) {
        // 直接添加到历史记录，不再依赖事件监听器
        addMediaToHistory(url, 'video');
        
        video.onloadeddata = function() {
          loadingDiv.style.display = 'none';
          videoContainer.style.display = 'block';
        };
        
        video.onerror = function() {
          loadingDiv.style.display = 'none';
          videoContainer.style.display = 'block';
        };
        
        setTimeout(function() {
          loadingDiv.style.display = 'none';
          videoContainer.style.display = 'block';
        }, 60000);
      }
    } 
    else if (currentType === "audio") {
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
      
      if ((selectedModel === "elevenmusic" || selectedModel === "musicgen-2") && instrumental) {
        audioParams.append("instrumental", "true");
      }
      
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `${base}${generateEndpoints.audio}/${encodedPrompt}?${audioParams.toString()}`;
      
      res.innerHTML = `
        <div class="media-container">
          <div class="media-info">
            ${translations[t].using_model}: ${selectedModel} | ${translations[t].duration}: ${duration}s | ${translations[t].voice}: ${voice} | ${translations[t].format}: ${format} | ${translations[t].speed_label}: ${speed}
          </div>
          <div id="audio-loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255, 0.3); border-radius: 50%; border-top-color: var(--p); animation: spin 1s ease-in-out infinite; margin-bottom: 16px;"></div>
            <div>${translations[t].generating_audio}</div>
            <div style="font-size: 12px; color: var(--gray); margin-top: 8px;">${translations[t].please_wait_audio}</div>
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
      
      const audio = res.querySelector('audio');
      const loadingDiv = document.getElementById('audio-loading');
      const audioContainer = document.getElementById('audio-container');
      
      if (audio) {
        // 直接添加到历史记录，不再依赖事件监听器
        addMediaToHistory(url, 'audio');
        
        audio.onloadeddata = function() {
          loadingDiv.style.display = 'none';
          audioContainer.style.display = 'block';
        };
        
        audio.onerror = function() {
          loadingDiv.style.display = 'none';
          audioContainer.style.display = 'block';
        };
        
        setTimeout(function() {
          loadingDiv.style.display = 'none';
          audioContainer.style.display = 'block';
        }, 30000);
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

function renderChatHistory() {
  const res = document.getElementById("result");
  
  if (chatHistory.length === 0) {
    res.innerHTML = "";
    return;
  }
  
  let chatHtml = '<div class="chat-container">';
  
  chatHistory.forEach(message => {
    const isUser = message.role === "user";
    const avatarText = isUser ? (currentLang === "zh" ? "你" : "You") : "AI";
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
  
  const chatContainer = res.querySelector('.chat-container');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    if (currentType === "text" && tab.dataset.type !== "text") {
      chatHistory = [];
    } else if (tab.dataset.type === "text") {
      renderChatHistory();
    }
  });
});

function handleFileUpload(inputElement, referenceInput, previewDiv) {
  // 存储图片的DataURL
  let currentDataUrl = '';
  
  inputElement.addEventListener('change', function(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // 清空之前的预览
    previewDiv.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const dataUrl = event.target.result;
        currentDataUrl = dataUrl;
        
        // 创建预览图片
        const previewImg = document.createElement('img');
        previewImg.src = dataUrl;
        previewImg.style.cssText = 'width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 2px solid var(--p); cursor: pointer;';
        previewImg.title = file.name;
        
        // 创建删除按钮
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.style.cssText = 'position: absolute; top: -5px; right: -5px; background: #dc2626; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;';
        removeBtn.onclick = function(e) {
          e.stopPropagation();
          previewContainer.remove();
          currentDataUrl = '';
          referenceInput.value = '';
        };
        
        // 创建预览容器
        const previewContainer = document.createElement('div');
        previewContainer.style.cssText = 'position: relative; display: inline-block; margin: 5px;';
        previewContainer.appendChild(previewImg);
        previewContainer.appendChild(removeBtn);
        previewDiv.appendChild(previewContainer);
      };
      
      reader.readAsDataURL(file);
    }
  });
  
  // 重写referenceInput的value getter，在需要时才返回DataURL
  Object.defineProperty(referenceInput, 'value', {
    get: function() {
      return currentDataUrl;
    },
    set: function(newValue) {
      currentDataUrl = newValue;
    }
  });
}

function init() {
  const detectedLang = detectUserLanguage();
  if (detectedLang !== currentLang) {
    switchLanguage(detectedLang);
  }
  
  document.getElementById("text-params").style.display = "flex";
  
  const imageUpload = document.getElementById('image-upload');
  const imageReference = document.getElementById('image-reference');
  const imagePreview = document.getElementById('image-preview');
  if (imageUpload && imageReference && imagePreview) {
    handleFileUpload(imageUpload, imageReference, imagePreview);
  }
  
  const videoUpload = document.getElementById('video-upload');
  const videoReference = document.getElementById('video-reference');
  const videoPreview = document.getElementById('video-preview');
  if (videoUpload && videoReference && videoPreview) {
    handleFileUpload(videoUpload, videoReference, videoPreview);
  }
}

// 历史记录功能
let historyRecords = JSON.parse(localStorage.getItem('pollinationsHistory')) || [];

// 刷新历史记录iframe
function refreshHistoryIframe() {
  console.log('Refreshing history iframe...');
  const iframe = document.getElementById('history-iframe');
  if (iframe) {
    // 避免直接访问contentWindow，使用src属性刷新
    try {
      // 给src添加一个时间戳参数，强制刷新
      const timestamp = new Date().getTime();
      const src = iframe.src.split('?')[0];
      iframe.src = src + '?t=' + timestamp;
      console.log('History iframe refreshed by changing src');
    } catch (e) {
      console.error('Error refreshing iframe:', e);
    }
  } else {
    console.error('History iframe not found');
  }
}

function addToHistory(type, prompt, result, model, params) {
  console.log('Adding to history:', type, prompt.substring(0, 20) + '...');
  
  const record = {
    id: Date.now() + Math.random().toString(36).substr(2, 9),
    type: type,
    prompt: prompt,
    result: result,
    model: model,
    params: params,
    timestamp: new Date().toISOString()
  };
  
  historyRecords.unshift(record);
  
  // 限制历史记录数量为20条
  if (historyRecords.length > 20) {
    historyRecords = historyRecords.slice(0, 20);
  }
  
  localStorage.setItem('pollinationsHistory', JSON.stringify(historyRecords));
  console.log('History saved to localStorage');
  
  // 刷新历史记录iframe
  refreshHistoryIframe();
}

function loadHistoryItem(record) {
  // 切换到对应的标签
  document.querySelectorAll('.tab').forEach(tab => {
    if (tab.dataset.type === record.type) {
      tab.click();
    }
  });
  
  // 填充提示词
  document.getElementById('prompt').value = record.prompt;
  
  // 选择模型
  const modelSelect = document.getElementById(`${record.type}-model`);
  if (modelSelect) {
    modelSelect.value = record.model;
  }
  
  // 填充参数
  if (record.params) {
    Object.entries(record.params).forEach(([key, value]) => {
      const element = document.getElementById(key);
      if (element) {
        if (element.type === 'checkbox') {
          element.checked = value;
        } else {
          element.value = value;
        }
      }
    });
  }
  
  // 显示结果
  const result = document.getElementById('result');
  if (result) {
    if (record.type === 'text') {
      // 对于文本，直接显示内容
      result.innerHTML = `<div class="chat-container"><div class="chat-message assistant"><div class="chat-avatar assistant">AI</div><div><div class="chat-content">${record.result.replace(/\n/g, '<br>')}</div></div></div></div>`;
    } else if (record.type === 'image') {
      result.innerHTML = `
        <div class="media-container">
          <div class="media-info">${translations[currentLang].using_model}: ${record.model}</div>
          <img src="${record.result}" alt="Generated image">
          <a href="${record.result}" target="_blank" download class="download-btn">📥 ${translations[currentLang].download_image}</a>
        </div>
      `;
    } else if (record.type === 'video') {
      result.innerHTML = `
        <div class="media-container">
          <div class="media-info">${translations[currentLang].using_model}: ${record.model}</div>
          <video controls src="${record.result}" style="max-width: 100%; border-radius: 8px; margin-bottom: 12px;"></video>
          <a href="${record.result}" target="_blank" download class="download-btn">📥 ${translations[currentLang].download_video}</a>
        </div>
      `;
    } else if (record.type === 'audio') {
      result.innerHTML = `
        <div class="media-container">
          <div class="media-info">${translations[currentLang].using_model}: ${record.model}</div>
          <audio controls src="${record.result}" style="width: 100%; margin-bottom: 12px;"></audio>
          <a href="${record.result}" target="_blank" download class="download-btn">📥 ${translations[currentLang].download_audio}</a>
        </div>
      `;
    }
  }
}

// 为历史记录iframe添加点击事件监听器
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded event fired');
  
  // 确保所有元素都已加载
  setTimeout(() => {
    console.log('Initializing history functionality');
    
    // 初始化历史记录
    historyRecords = JSON.parse(localStorage.getItem('pollinationsHistory')) || [];
    console.log('Initial history records:', historyRecords.length);
  }, 100);
  
  // 监听来自iframe的消息
  window.addEventListener('message', function(e) {
    console.log('Received message:', e.data);
    if (e.data.type === 'loadHistoryItem') {
      console.log('Received loadHistoryItem message:', e.data.record);
      loadHistoryItem(e.data.record);
    } else if (e.data.type === 'historyUpdated') {
      console.log('Received historyUpdated message, refreshing history');
      // 刷新历史记录
      historyRecords = JSON.parse(localStorage.getItem('pollinationsHistory')) || [];
      console.log('Updated history records:', historyRecords.length);
    }
  });
});

// 全局变量用于存储当前生成的参数
let currentGenerationParams = null;

// 直接添加媒体到历史记录，不再依赖事件监听器
function addMediaToHistory(url, type) {
  if (currentGenerationParams && currentGenerationParams.type === type) {
    const { prompt, model, params } = currentGenerationParams;
    addToHistory(type, prompt, url, model, params);
    currentGenerationParams = null;
  }
}

// 在页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
  init();
});
