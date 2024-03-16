from cache import ObjectCacher
from transformers import BlipProcessor, BlipForConditionalGeneration


processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
object_cacher = ObjectCacher()
object_cacher.cache_object(processor, 'blip_processor.pkl')
object_cacher.cache_object(model, 'blip_model.pkl')


# cached_processor = object_cacher.load_cached_object('blip_processor.pkl')
# cached_model = object_cacher.load_cached_object('blip_model.pkl')
