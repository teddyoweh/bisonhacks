import requests
from PIL import Image
import os
import pickle
import torch

class ObjectCacher:
    def __init__(self, cache_dir='cached_objects'):
        self.cache_dir = cache_dir
        if not os.path.exists(self.cache_dir):
            os.makedirs(self.cache_dir)

    def cache_object(self, obj, filename):
        if hasattr(obj, "save_pretrained"):
            obj.save_pretrained(os.path.join(self.cache_dir, filename))
        else:
            with open(os.path.join(self.cache_dir, filename), 'wb') as f:
                torch.save(obj.state_dict(), f)

    def load_cached_object(self, filename):
        filepath = os.path.join(self.cache_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'rb') as f:
                return pickle.load(f)
        else:
            raise FileNotFoundError(f"No cached object found with filename: {filename}")

  

