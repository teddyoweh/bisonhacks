from dataclasses import dataclass
import cv2
import requests
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from cache import ObjectCacher
from transformers import pipeline,AutoImageProcessor, AutoTokenizer, VisionEncoderDecoderModel

from sentence_transformers import SentenceTransformer, util
import os
import av
import numpy as np
import torch
@dataclass
class MultiFrameInference:
 
    cached_dir ='cached_objects'
    device = "cuda" if torch.cuda.is_available() else "cpu"
    @property
    def object_cacher(self):
        return ObjectCacher()
    @property
    def cached_processor(self):
        return self.object_cacher.load_cached_object('blip_processor.pkl')
    @property
    def cached_model(self):
        return self.object_cacher.load_cached_object('blip_model.pkl')
    
    @property
    def cached_ag_nli_crossencoder_model(self):
        return self.object_cacher.load_cached_object('ag_nli_crossencoder_model.pkl')
    @property
    def cached_quora_similarity_t5_model(self):
        return self.object_cacher.load_cached_object('quora_similarity_t5_model.pkl')
    @property
    def cached_videomae_base_processor(self):
        return AutoImageProcessor.from_pretrained(os.path.join(self.cached_dir, "videomae_base_processor"))

    @property 
    def cached_gpt2_tokenizer(self):
        return  AutoTokenizer.from_pretrained(os.path.join(self.cached_dir, "gpt2_tokenizer"))
    @property
    def timesformer_gpt2_video_captioning(self):
        return VisionEncoderDecoderModel.from_pretrained(os.path.join(self.cached_dir, "timesformer_gpt2_video_captioning"))
    def calculate_cosine_similarity(self,sentence1, sentence2):
        embeddings1 = self.cached_quora_similarity_t5_model.encode(sentence1, convert_to_tensor=True)
        embeddings2 = self.cached_quora_similarity_t5_model.encode(sentence2, convert_to_tensor=True)
        cos_sim = util.cos_sim(embeddings1, embeddings2)
        return cos_sim.item()

    def calculate_similarity(self,sentence1, sentence2):
        pairs = [(sentence1, sentence2)]
        scores = self.cached_ag_nli_crossencoder_model.predict(pairs, show_progress_bar=False)
        return scores[0]

    def caption_video(self,url):
        container = av.open(url)


        seg_len = container.streams.video[0].frames
        clip_len = self.timesformer_gpt2_video_captioning.config.encoder.num_frames
        indices = set(np.linspace(0, seg_len, num=clip_len, endpoint=False).astype(np.int64))
        frames = []
        container.seek(0)
        for i, frame in enumerate(container.decode(video=0)):
            if i in indices:
                frames.append(frame.to_ndarray(format="rgb24"))


        gen_kwargs = {
            "min_length": 30, 
            "max_length": 30,
            "num_beams": 40,
        }
        pixel_values = self.cached_videomae_base_processor(frames, return_tensors="pt").pixel_values.to(self.device)
        tokens = self.timesformer_gpt2_video_captioning.generate(pixel_values, **gen_kwargs)
        
        captionsx = self.cached_gpt2_tokenizer.batch_decode(tokens, skip_special_tokens=True)
        return captionsx[0]
    
    def compare_caption(self,caption1, caption2):
        return (self.calculate_similarity(caption1, caption2)+self.calculate_cosine_similarity(caption1, caption2))/2
    def compare_videos(self,video1, video2):
        caption1 = self.caption_video(video1)
        caption2 = self.caption_video(video2)
        print(caption1)
        print(caption2)
        return self.compare_caption(caption1, caption2)