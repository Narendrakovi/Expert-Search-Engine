import re
url = 'http://quotes.toscrape.com'
url2 = "https://en.wikipedia.org/wiki/Weblogs.com"
url3 = "www.google.com"
url4 = "http://www.google.com"
test = "google.com"
#reg = r"[(http(s)?):\/\/(www\.)?a-zA-Z0-9]{2,256}\.(edu|com|org|net|gov)\/?$"
reg = r"((https:\/\/)?|(http:\/\/)?)[(www\.)?a-zA-Z0-9]{2,256}\.(edu|com|org|net|gov)\/?$"
print(re.fullmatch(reg, test))