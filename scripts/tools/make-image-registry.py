# One-off helper used to seed data/image-registry.json (Oct 2026). Edit the JSON directly afterwards.
import json, os
from PIL import Image
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.chdir(root)
reg = {}
def add(path, **kw):
    reg[path] = {**reg.get(path, {}), **kw}
# Commons-licensed (existing manifests)
for f in ['data/image-licenses.json', 'data/uk-destination-image-licenses.json']:
    for x in json.load(open(f))['images']:
        p = x['localPath'].lstrip('/')
        add(p, status='cleared', sourceType='wikimedia-commons', place=x['location'], creator=x['creator'],
            licence=x['license'], licenceUrl=x['licenseUrl'], sourceUrl=x['source'],
            credit=f"{x['creator']} / Wikimedia Commons, {x['license']}", checkedOn=x.get('downloadedOn'))
blocked_dirs = ['guides/Bantham/', 'guides/Bigbury-on-sea/', 'guides/Challaborough/', 'guides/Lynmouth/',
                'guides/Putsborough/', 'guides/Saunton/', 'guides/Woolacombe/', 'guides/Croyde/']
blocked_files = ['images/Surfers on beach.avif', 'images/Surfer on wave 2.avif', 'images/Surfer on wave.webp',
  'images/generic wave.jpg', 'images/generic surfer.jpeg', 'images/Surfers in waves.jpg', 'images/Beach Guides.jpg',
  'images/lineup.avif', 'images/Sunset surfer sat in water.jpg', 'images/sunset surfers on beach.jpg',
  'images/help me decide.jpeg', 'images/seasonal restrictions.jpg', 'images/Surf lessons.jpg', 'images/Food and drink.jpg',
  'images/Surfer on water ariel.avif', 'images/Accommodation.jpg', 'images/Surf Hire.jpg', 'images/Things to do.jpg',
  'images/Parking and facilities.jpg', 'images/fistral.jpg',
  'guides/westwardho!/Food and drink.jpg', 'guides/westwardho!/Northam Burrows.jpg', 'guides/westwardho!/amusements.jpeg',
  'guides/westwardho!/beginner friendly.jpeg', 'guides/westwardho!/check before you travel.jpg',
  'guides/westwardho!/main parking.jpg', 'guides/westwardho!/toilets and showers.jpg',
  'guides/westwardho!/use lifegaurded areas.jpg', 'guides/_licensed-images/saunton.jpg', 'guides/_licensed-images/woolacombe.jpg',
  'images/guides/rhosneigr-user-large.jpg', 'images/guides/rhosneigr-user.jpg']
needs_confirm = {
 'images/Surf Bay Holiday Park.jpg': 'Surf Bay Holiday Park, Westward Ho! — property photo; confirm you took it or have the park\'s permission',
 'images/accommodation/properties/surf-bay-holiday-park/Surf Bay Holiday Park.jpg': 'Surf Bay Holiday Park — confirm own photo or permission',
 'images/The Royal.jpeg': 'The Royal Hotel, Bideford — confirm own photo or permission',
 'images/Durrant House.IMG_7478.JPEG': 'Durrant House Hotel, Northam — confirm own photo or permission',
 'images/Modern Apartment, Private Parking, Walk to Beach!.jpg': 'Westward Ho! apartment listing photo — confirm own photo or host permission',
 'images/Modern Apartment, Private Parking, Walk to Beach!inside view of sunset.jpg': 'as above',
 'images/accommodation/properties/modern-apartment-westward-ho/Modern Apartment Exterior.jpg': 'as above',
 'images/accommodation/properties/modern-apartment-westward-ho/Modern Apartment Interior Sunset.jpg': 'as above',
 'images/Memories Northam main outside shot.JPEG': 'Memories, Northam — confirm own photo',
 'images/crow main outside shot.jpeg': 'Crowbar — confirm own photo',
 'images/WhatsApp Image 2026-08-23 at 17.53.10 (1).jpeg': 'unknown subject/source',
 'images/WhatsApp Image 2026-08-23 at 17.53.10 (2).jpeg': 'unknown subject/source',
 'images/WhatsApp Image 2026-08-23 at 17.53.10 (3).jpeg': 'unknown subject/source',
 'guides/westwardho!/westward ho 1.jpeg': 'Westward Ho! beach (benchmark hero) — no EXIF; assumed your own photo, please confirm',
 'images/guides/clevedon/clevedon-pier.webp': 'Clevedon Pier — assumed your own photo, please confirm',
 'images/clevedon pier.jpeg': 'Clevedon Pier — assumed your own photo, please confirm',
}
for dp, dn, fn in os.walk('.'):
    if '.git' in dp or dp.startswith('./img'): continue
    for f in fn:
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.avif', '.heif')): continue
        p = os.path.join(dp, f)[2:]
        if p in reg: continue
        if p.startswith(('Logo', 'favicon', 'apple-touch', 'Email', 'Facebook', 'Instagram')) or p.startswith('images/1'):
            add(p, status='cleared', sourceType='surfbooker-brand', place='Surfbooker brand asset'); continue
        if any(p.startswith(d) for d in blocked_dirs) or p in blocked_files:
            add(p, status='blocked', sourceType='unknown', place=None,
                notes='No source or licence record; appears to be a web/stock download. Not used on published pages until the owner confirms rights.'); continue
        if p in needs_confirm:
            add(p, status='confirm', sourceType='assumed-own-photo', notes=needs_confirm[p], credit='Surfbooker'); continue
        exif = {}
        try: exif = Image.open(p).getexif()
        except Exception: pass
        model = exif.get(272, '') if exif else ''
        if 'iPhone' in str(model):
            add(p, status='cleared', sourceType='own-photo', credit='Surfbooker', notes=f'Original photo ({model}) taken by Surfbooker')
        else:
            add(p, status='confirm', sourceType='assumed-own-photo', credit='Surfbooker',
                notes='Exported photo matching Surfbooker review photo sets (1600px, no camera data); assumed own photo — please confirm')
reg = dict(sorted(reg.items()))
json.dump({'version': 1, 'updated': '2026-10-05',
  'rules': {'cleared': 'May be published.', 'confirm': 'Believed to be Surfbooker\'s own photo; publishable but listed for owner confirmation.',
            'blocked': 'Must not appear on published pages.'},
  'images': reg}, open('data/image-registry.json', 'w'), indent=1, ensure_ascii=False)
from collections import Counter
print(Counter(v['status'] for v in reg.values()))
