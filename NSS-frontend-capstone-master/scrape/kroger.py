import requests
from bs4 import BeautifulSoup

# required for the request.get()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

# target URL
url = "http://www.kroger.com/weeklyad?StoreCode=00542&DivisionId=029"

# get the request object containing all info to get ready for the soup
try:
    request = requests.get(url, headers=headers, timeout=5)
except requests.exceptions.Timeout:
    print("Timeout occurred")

# .text grabs the html from the object
data = request.text

# passing the request object into BS and parses it as html
soup = BeautifulSoup(data, "html.parser")
# print(soup)

# soup_list = soup.find(class='item')
# print(soup_list)


# brings back the BS types that all the elements of the page fall into
types = [type(item) for item in  list(soup.children)]
# print('soup types on this webpage: ', types)

# brings back the Tag element, I'm not sure what the attributes of this are though
tag_list = types[8]
# print(tag_list)



