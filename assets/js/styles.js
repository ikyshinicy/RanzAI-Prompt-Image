// RanzAI Visual Style instructions

window.RanzAI_STYLES = {
  normal: 'Visual style: ultra accurate reconstruction mode. Analyze the uploaded image with extreme detail and generate a highly specific prompt intended to recreate the image as closely as possible. Preserve the exact art style, illustration type, color palette, composition, framing, character proportions, facial structure, pose, camera angle, object placement, background simplicity, line quality, texture style, lighting behavior, and overall visual identity. Describe every important visual detail precisely. Avoid generic descriptions. Do not reinterpret the image into a new style. Focus on faithful image replication with maximum similarity.',

  cinematic: 'Visual style: cinematic transformation mode. Reinterpret the uploaded image as a premium film still while preserving the main subject, pose, core composition, important colors, and recognizable visual identity. Add dramatic composition, atmospheric lighting, film color grading, depth, and emotional storytelling.',

  poster_ads: 'Visual style: premium advertising poster transformation mode. Reinterpret the uploaded image into a clean commercial poster while preserving the main subject and core layout. Use bold composition, strong focal hierarchy, graphic balance, professional campaign polish, commercial lighting, and high-impact ad design.',

  anime: 'Visual style: high-end anime transformation mode. Reinterpret the uploaded image as polished anime illustration while preserving the main subject, pose, mood, composition, and key colors. Use expressive anime rendering, clean lines, cinematic anime lighting, detailed but controlled background, and premium Japanese visual direction.',

  realistic: 'Visual style: realistic transformation mode. Reinterpret the uploaded image as a believable real-world photo while preserving the main subject, pose, layout, colors, and key objects. Use natural anatomy, real camera feel, realistic textures, believable lighting, lens detail, and professional photography quality.',

  luxury: 'Visual style: luxury editorial transformation mode. Reinterpret the uploaded image with premium magazine aesthetics while preserving the core subject and composition. Use elegant spacing, refined lighting, minimal expensive feel, editorial polish, high-fashion visual language, and restrained luxury tone.',

  streetwear: 'Visual style: urban streetwear transformation mode. Reinterpret the uploaded image with bold youth culture, modern editorial street photography, graphic attitude, outfit detail, urban texture, energetic composition, and polished creative direction while preserving the main subject and pose.',

  techwear: 'Visual style: futuristic techwear transformation mode. Reinterpret the uploaded image with sleek functional fashion, dark premium urban mood, tactical details, cyber-editorial lighting, modern Japanese street aesthetic, and clean futuristic styling while preserving the subject structure.',

  cyberpunk: 'Visual style: cyberpunk transformation mode. Reinterpret the uploaded image with neon city atmosphere, futuristic dystopian mood, strong contrast, glowing lights, tech elements, reflective surfaces, cinematic sci-fi energy, and cyber visual language while preserving the subject pose and composition.'
};

window.getVisualStyleInstruction = function (visualStyle) {
  return window.RanzAI_STYLES[visualStyle] || window.RanzAI_STYLES.normal;
};
