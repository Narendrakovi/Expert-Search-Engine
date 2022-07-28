import re
url = 'http://quotes.toscrape.com/'
url2 = "https://en.wikipedia.org/"
url3 = "www.google.com"
url4 = "http://www.google.com"
test = "https://en.wikipedia.org/"
#reg = r"[(http(s)?):\/\/(www\.)?a-zA-Z0-9]{2,256}\.(edu|com|org|net|gov)\/?$"
#reg = r"((https:\/\/)?|(http:\/\/)?)[(www\.)?a-zA-Z0-9]{2,256}\.(edu|com|org|net|gov)\/?$"
#print(re.fullmatch(reg, test))

'''
leng = 4
if test.endswith('/'):
    leng = 5
endidx = len(test) - leng
startidx = endidx - 1
while startidx >= 0 and (test[startidx] >= 'a' and test[startidx] <= 'z' or test[startidx] >= 'A' and test[startidx] >= 'Z'):
    startidx -= 1
startidx+=1
print(test[startidx: endidx])
'''

cp = test
cp = cp[1 : 3]
print(cp)

