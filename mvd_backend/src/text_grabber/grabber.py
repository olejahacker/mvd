import pytesseract
from transliterate import translit
import sys
import locale
from PIL import Image
locale.getpreferredencoding()
# заменить, чтобы любой путь к тесеракту
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\Tesseract-OCR\tesseract.exe'
out_str = pytesseract.image_to_string(Image.open(sys.argv[1]), lang='rus')
print (translit(u""+out_str, "ru", reversed=True))