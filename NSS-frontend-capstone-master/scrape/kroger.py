import requests
from bs4 import BeautifulSoup


headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

url = "http://www.kroger.com/weeklyad?StoreCode=00542&DivisionId=029"

try:
    request = requests.get(url, headers=headers, timeout=5)
except requests.exceptions.Timeout:
    print("Timeout occurred")

data = request.text

soup = BeautifulSoup(data, "html.parser")
# print(soup.prettify())
soup_list = list(soup.children)
# print(soup_list)

types = [type(item) for item in  list(soup.children)]
# print(types[8])

tag_list = list(types)[8]

print(tag_list.attrs)

# for link in soup.find_all('li'):
    # print(link.get(''))







