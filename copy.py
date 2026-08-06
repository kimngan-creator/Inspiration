import shutil
import glob
import os

src_dir = r"C:\Users\MSI\.gemini\antigravity\brain\8bf79802-4c30-4a08-9b67-eeaf3f9fbd0b"
dst_dir = r"c:\Users\MSI\Desktop\Hình headling\Triển lãm\Landing Page\images"

files = glob.glob(os.path.join(src_dir, "*.jpg"))
for f in files:
    shutil.copy(f, dst_dir)
    print(f"Copied {f}")
print("Done")
